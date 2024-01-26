#!/usr/bin/env python3

from flask import Flask, make_response,jsonify,request
from flask_migrate import Migrate
from models import db, User, ParkingSpot
import jwt
from utils.sms import SMS
from utils.mail import Mail
import random
import math
import requests

JWT_SECRET = 'secret'

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)

@app.route('/signup', methods=['POST'])
def signup():
    if not request.is_json:
        return make_response(jsonify({"msg": "Missing JSON in request"}), 400)
    
    required_fields = ['firstname', 'surname', 'email', 'password']
    if not all(field in request.json for field in required_fields):
        return make_response(jsonify({"msg": F"{required_fields}"}))

    firstname = request.json['firstname']
    surname = request.json['surname']
    email = request.json['email']
    password = request.json['password']
    phone = request.json.get('phone')

    if phone is None:
        return make_response(jsonify({"msg": "Phone number is required"}), 400)



    if User.query.filter_by(email=email).first():
        return make_response(jsonify({"msg": "User already exists"}), 400)
    
    otp = math.floor(100000 + random.random() * 900000)

    user = User(firstname=firstname, surname=surname, email=email, password=password)

    sms = SMS()
    sms.send_sms(phone, otp)
    db.session.add(user)
    db.session.commit()

    return make_response(jsonify({"msg": "User created successfully"}), 201)


@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return make_response(jsonify({"msg": "Missing JSON in request"}), 400)
    if 'email' not in request.json or 'password' not in request.json:
        return make_response(jsonify({"msg": "email and password are required"}), 400)

    email = request.json['email']
    password = request.json['password']

    if email is None or password is None:
        return make_response(jsonify({"msg": "email and password are required"}), 400)

    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return make_response(jsonify({"msg": "Invalid username or password"}), 401)

    token = jwt.encode({'user_id': user.id}, JWT_SECRET, algorithm='HS256')
    return make_response(jsonify({"msg": "Login successful", "token": token}), 200)

@app.route('/parking',methods=['GET'])
def get_parkings():
    location = request.args.get('location')
    parking_query = ParkingSpot.query.filter_by(location=location).first()
    if location:
        if parking_query:
    
            ps_dict = {
                    "id": parking_query.id,
                    "location": parking_query.location,
                    "latitude" : parking_query.latitude,
                    "longitude" : parking_query.longitude,
                    "type": parking_query.type,
                    "capacity": parking_query.capacity,
                    "pricing": parking_query.pricing,
            }

            if parking_query.restrictions:
                restriction = parking_query.restrictions
                ps_dict["restrictions"] = restriction.split("\n")
                
            return make_response(jsonify(ps_dict), 200)
        else:
            return make_response(jsonify({"message":"Parking does not exist"}),404)
    else:
        parking_spots = []
        for parking in ParkingSpot.query.all():
            pricing = parking.pricing
            ps_dict = {
                "id": parking.id,
                "location": parking.location,
                "type": parking.type,
                "capacity": parking.capacity,
                "pricing": pricing.split("\n"),
            }

            if parking.restrictions:
                restriction = parking.restrictions
                ps_dict["restrictions"] = restriction.split("\n")
            parking_spots.append(ps_dict)

        return make_response(jsonify(parking_spots), 200)
    
@app.route('/add-parking',methods=['POST'])
def add_parking():
    request_data = request.get_json()

    rev_geocode_url = "https://nominatim.openstreetmap.org/search"
    params = {
            'q': request_data['location'],
            'format': 'json',
            'limit': 1
        }

    response = requests.get(rev_geocode_url, params=params)
    response_data = response.json()

    if response_data and 'lat' in response_data[0] and 'lon' in response_data[0]:
            loc_lat = float(response_data[0]['lat'])
            loc_long = float(response_data[0]['lon'])
    
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

    db.session.commit()

    return make_response(jsonify({"message": "Parking spot successfully updated"}), 200)

@app.route('/delete-parking',methods=['DELETE'])
def delete_parking():
    location = request.args.get('location')
    parking_spot = ParkingSpot.query.filter_by(location=location).first()

    db.session.delete(parking_spot)
    db.session.commit()

    return make_response(jsonify({"message":"Parking spot successfully deleted"}),200)
