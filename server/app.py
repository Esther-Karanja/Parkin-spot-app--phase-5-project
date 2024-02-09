#!/usr/bin/env python3

from flask import Flask, make_response,jsonify,request
from flask_migrate import Migrate
from models import db, User, ParkingSpot,Review
from flask_cors import CORS
import jwt
from utils.sms import SMS
from utils.mail import Mail
import random
import math
import requests
import haversine as hs
from decorators import admin_endpoint, client_endpoint

JWT_SECRET = 'secret'

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)



@app.route('/signup', methods=['POST'])
def signup():
    if not request.is_json:
        return make_response(jsonify({"msg": "Missing JSON in request", "status": "error"}), 400)
    
    required_fields = ['firstname', 'surname', 'email', 'password']
    if not all(field in request.json for field in required_fields):
        return make_response(jsonify({"msg": F"{required_fields}"}))

    firstname = request.json['firstname']
    surname = request.json['surname']
    email = request.json['email']
    password = request.json['password']
    # phone = request.json.get('phone')

    # if phone is None:
    #     return make_response(jsonify({"msg": "Phone number is required"}), 400)



    if User.query.filter_by(email=email).first():
        return make_response(jsonify({"msg": "User already exists", "status": "error"}), 400)
    
    otp = math.floor(100000 + random.random() * 900000)

    user = User(firstname=firstname, surname=surname, email=email, password=password)

    # sms = SMS()
    # sms.send_sms(phone, otp)
    db.session.add(user)
    db.session.commit()

    return make_response(jsonify({"msg": "User created successfully","status": "success"}), 201)


@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return make_response(jsonify({"msg": "Missing JSON in request", "status": "error"}), 400)
    if 'email' not in request.json or 'password' not in request.json:
        return make_response(jsonify({"msg": "email and password are required", "status": "error"}), 400)

    email = request.json['email']
    password = request.json['password']

    if email is None or password is None:
        return make_response(jsonify({"msg": "email and password are required", "status": "error"}), 400)

    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return make_response(jsonify({"msg": "Invalid username or password", "status": "error"}), 401)

    token = jwt.encode({'user_id': user.id}, JWT_SECRET, algorithm='HS256')
    return make_response(jsonify({"msg": "Login successful", "token": token, "status": "success", "role": user.role}), 200)

@app.route('/users')
def get_users():

    users = []
    for user in User.query.all():
        user_dict = {
            "id": user.id,
            "firstname": user.firstname,
            "surname" : user.surname,
            "email" : user.email,
            "password": user.password,
            "_is_activated": user._is_activated,
            "phone": user.phone,
            "role": user.role,
            }
        users.append(user_dict)

    response = make_response(
        jsonify(users),
        200
    )
    response.headers["Content-Type"] = "application/json"

    return response

def form_parking_dict(parking_resp):
    pricing = parking_resp.pricing
    ps_dict = {
            "id": parking_resp.id,
            "location": parking_resp.location,
            "latitude" : parking_resp.latitude,
            "longitude" : parking_resp.longitude,
            "type": parking_resp.type,
            "capacity": parking_resp.capacity,
            "pricing": pricing.split("\n"),
            }

    if parking_resp.restrictions:
        restriction = parking_resp.restrictions
        ps_dict["restrictions"] = restriction.split("\n")

    return ps_dict

def reverse_geocoding(input_location):
    rev_geocode_url = "https://nominatim.openstreetmap.org/search"
    params = {
            'q': input_location,
            'format': 'json',
            'limit': 1
        }

    response = requests.get(rev_geocode_url, params=params)
    response_data = response.json()
    
    loc_lat = None
    loc_long = None

    if response_data and 'lat' in response_data[0] and 'lon' in response_data[0]:
        loc_lat = float(response_data[0]['lat'])
        loc_long = float(response_data[0]['lon'])
        if loc_lat and loc_long is not None:
            input_coordinates = (loc_lat,loc_long)
            return input_coordinates
        else:
            return make_response(jsonify({"message":"Enter valid location"}))

@client_endpoint
@app.route('/parking',methods=['GET'])

def get_parkings():
    location = request.args.get('location')
    
    if location: 
        location_coordinates = reverse_geocoding(location)
        parking_query = ParkingSpot.query.filter_by(location=location).first()
        if parking_query:
            specific_parking_dict = form_parking_dict(parking_query)
            specific_parking_coordinates = (parking_query.latitude,parking_query.longitude)
            nearby_parking = []
            for parking in ParkingSpot.query.all():
                other_parking_coordinates = (parking.latitude,parking.longitude)
                distance = hs.haversine(specific_parking_coordinates,other_parking_coordinates)
                if distance < 4:
                    nearby_parking_dict = form_parking_dict(parking)
                    nearby_parking.append(nearby_parking_dict)
                
            return make_response(jsonify({"specific spot":specific_parking_dict,"nearby parking":nearby_parking}), 200)
        elif location_coordinates:
            parking_in_location = []
            for parking in ParkingSpot.query.all():
                parking_coordinates = (parking.latitude,parking.longitude)
                distance = hs.haversine(parking_coordinates,location_coordinates)
                if distance < 4:
                    distance_from_location = round(distance,2)
                    parking_dict = form_parking_dict(parking)
                    parking_dict['distance'] =  f'{distance_from_location} km'
                    parking_in_location.append(parking_dict)
            if len(parking_in_location) > 0:
                return parking_in_location
            else:
                return make_response(jsonify({"message":"No parking found"}),404)
        else:
            return make_response(jsonify({"message":"Parking/ Location does not exist"}),404)
    else:
        parking_spots = []
        for parking in ParkingSpot.query.all():
            ps_dict = form_parking_dict(parking)
            parking_spots.append(ps_dict)

        return make_response(jsonify(parking_spots), 200)


#@admin_endpoint
@app.route('/add-parking',methods=['POST'])
def add_parking():
    try:
        request_data = request.get_json()

        if 'location' not in request_data or 'type' not in request_data or 'capacity' not in request_data or 'pricing' not in request_data:
            return make_response(jsonify({"message":"All fields are required"}),400)


        rev_geocode_url = "https://nominatim.openstreetmap.org/search"
        params = {
                'q': request_data['location'],
                'format': 'json',
                'limit': 1
            }

        response = requests.get(rev_geocode_url, params=params)
        response_data = response.json()
        
        loc_lat = None
        loc_long = None

        if response_data and 'lat' in response_data[0] and 'lon' in response_data[0]:
                loc_lat = float(response_data[0]['lat'])
                loc_long = float(response_data[0]['lon'])
                if loc_lat and loc_long is not None:
                    restriction = request_data.get('restrictions') 

                    new_ps = ParkingSpot(
                            location = request_data['location'],
                            latitude = loc_lat,
                            longitude = loc_long,
                            type = request_data['type'],
                            capacity = request_data['capacity'],
                            pricing = request_data['pricing'],
                            restrictions = restriction
                    )

                    db.session.add(new_ps)
                    db.session.commit()

                    return make_response(jsonify({"message":"Parking successfully created"}),201)
        else:
            return make_response(jsonify({"message":"Enter valid location"}))

    except Exception as e:
        return make_response(jsonify({"message": f"{e}"}),400)

#@admin_endpoint
@app.route('/update-parking',methods=['PATCH'])
def update_parking():
    location = request.args.get('location')
    parking_spot = ParkingSpot.query.filter_by(location=location).first()

    if not parking_spot:
        return make_response(jsonify({"message":"Car park does not exist"}),404)
    
    data = request.get_json()

    if 'location' in data:
        parking_spot.location = data['location']

    if 'type' in data:
        parking_spot.type = data['type']

    if 'capacity' in data:
        parking_spot.capacity = data['capacity']

    if 'pricing' in data:
        parking_spot.pricing = data['pricing']

    if 'restrictions' in data:
        parking_spot.restrictions = data['restrictions']

    if 'latitude' in data:
        parking_spot.latitude = data['latitude']

    if 'longitude' in data:
        parking_spot.longitude = data['longitude']

    db.session.commit()

    return make_response(jsonify({"message": "Parking spot successfully updated"}), 200)

#@admin_endpoint
@app.route('/delete-parking',methods=['DELETE'])
def delete_parking():
    location = request.args.get('location')
    parking_spot = ParkingSpot.query.filter_by(location=location).first()

    db.session.delete(parking_spot)
    db.session.commit()

    return make_response(jsonify({"message":"Parking spot successfully deleted"}),200)

#@client_endpoint
@app.route('/reviews',methods=['GET'])
def read_reviews():
        reviews = []
        for parking_review in Review.query.all():
            review_dict = {
                "review": parking_review.review,
                "location" : parking_review.location,
                "user_firstname": parking_review.user_firstname,
                "user_surname": parking_review.user_surname,
                "time": parking_review.time,
            }
                
            reviews.append(review_dict)

        return make_response(jsonify(reviews),200)

#@client_endpoint
@app.route('/reviews/<string:location>')
def filtered_reviews(location):
    parking_spot_location = ParkingSpot.query.filter_by(location=location).first()
    parking_spot_reviews = Review.query.filter_by(location_id=parking_spot_location.id).all()
    if parking_spot_reviews is not None:
        parkingspot_reviews = []
        for parking_review in parking_spot_reviews:
            review_dict = {
                "review": parking_review.review,
                "location" : parking_review.location,
                "user_firstname": parking_review.user_firstname,
                "user_surname": parking_review.user_surname,
                "time": parking_review.time,
            }
            parkingspot_reviews.append(review_dict)
        return make_response(jsonify(parkingspot_reviews),200)
    else:
        return make_response(jsonify({"message":"Parking spot has not been reviewed"}))

#@client_endpoint
@app.route('/add-reviews',methods=['POST'])
def add_reviews():
    data = request.get_json()
    required_fields = ['firstname', 'surname', 'location', 'review']
    if not all(field in data for field in required_fields):
        return make_response(jsonify({"msg": F"{required_fields}", "status": "error"}))
    
    new_review = Review(
        user_firstname = data['firstname'],
        user_surname = data['surname'],
        location=data['location'],
        review = data['review']
    )

    db.session.add(new_review)
    db.session.commit()

    return make_response(jsonify({"message":"Review successfully created","status": "success"}),201)

#@admin_endpoint
@app.route('/delete-review',methods=['DELETE'])
def delete_review():
    review = request.args.get('review_id')
    parking_spot_review = Review.query.filter_by(id=review).first()
    db.session.delete(parking_spot_review)
    db.session.commit()

    return make_response(jsonify({"message":"Review successfully deleted"}),200)
