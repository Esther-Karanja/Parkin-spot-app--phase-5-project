#!/usr/bin/env python3

from flask import Flask, make_response,jsonify,request
from flask_migrate import Migrate
from models import db, User, ParkingSpot
import jwt

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
        return make_response(jsonify({"msg": "Missing required JSON data in request"}), 400)

    firstname = request.json['firstname']
    surname = request.json['surname']
    email = request.json['email']
    password = request.json['password']

    if not all([firstname, surname, email, password]):
        return make_response(jsonify({"msg": "Missing required data in request"}), 400)

    if User.query.filter_by(email=email).first():
        return make_response(jsonify({"msg": "User already exists"}), 400)

    user = User(firstname=firstname, surname=surname, email=email, password=password)
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

@app.route('/search',methods=['GET'])
def get_parkings():
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

@app.route('/search/<string:location>',methods=['GET'])
def get_parking(location):
    query = ParkingSpot.query.filter_by(location=location)
    parking_spot = []
    for parking in query.all():
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
        parking_spot.append(ps_dict)
        
    return make_response(jsonify(parking_spot), 200)

