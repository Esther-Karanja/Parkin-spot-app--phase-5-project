from models import  db,ParkingSpot, User, Review

from flask_sqlalchemy import SQLAlchemy
from app import app
import json

with app.app_context():
    """with open ('seed.json') as f:
        data = f.read()
        json_data = json.loads(data)
        for item in json_data:
            spot = ParkingSpot(**item)
            db.session.add(spot)
        db.session.commit()
    
    user1 = User(
        firstname = "Alex",
        surname = "Albon",
        email = "alexalbon@gmail.com",
        password = "alexalbon",
        _is_activated = False,
        phone = "011345676"
    )
    user2 = User(
        firstname = "Kevin",
        surname = "Magnussen",
        email = "kevinmagnussen@gmail.com",
        password = "kevinmagnussen",
        _is_activated = False,
        phone = "0789304689"
    )
    user3 = User(
        firstname = "Charles",
        surname = "Kiprop",
        email = "charleslkiprop@gmail.com",
        password = "charleskiprop",
        _is_activated = False,
        phone = "1917846506"
    )
    user4 = User(
        firstname = "Lewis",
        surname = "Oduor",
        email = "lewisoduor@gmail.com",
        password = "lewisoduor",
        _is_activated = False,
        phone = "09432740"
    )
    C"""

    """review1 = Review(
        review = "Kibera Parking",
        location = "Very spacious",
        user_firstname = "Kevin",
        user_surname = "Magnussen"
    )
    review2 = Review(
        review = "Ample parking space",
        location = "Adams Arcade",
        user_firstname = "Alex",
        user_surname = "Albon"
    )
    review3 = Review(
        review = "	Has sizeable, well-marked parking spots",
        location = "Adams Arcade",
        user_firstname = "Lewis",
        user_surname = "Hamilton"
    )
    review4 = Review(
        review = "Good parking, but too expensive",
        location = "Ridgeways Mall",
        user_firstname = "Charles",
        user_surname = "Leclerc"
    )
    review5= Review(
        review = "One of the most secure places to park your vehicle within the CBD",
        location = "Prestige Plaze",
        user_firstname = "Charles",
        user_surname = "Leclerc"
    )
    review6 = Review(
        review = "Spacious and secure parking",
        location = "Thika Road Mall",
        user_firstname = "Fernando",
        user_surname = "Alonso"
    )
    review7 = Review(
        review = "Good assistance from guards to find parking",
        location = "Nyayo Stadium",
        user_firstname = "Alex",
        user_surname = "Albon"
    )
    review8 = Review(
        review = "Very affordable parking",
        location = "Nyayo Stadium",
        user_firstname = "Fernando",
        user_surname = "Alonso"
    )
    review9 = Review(
        review = "Very difficult to get parking in the afternoon",
        location = "Eastlands Parking",
        user_firstname = "Fernando",
        user_surname = "Alonso"
    )
    review10 = Review(
        review = "Limited parking spot",
        location = "Eastlands Parking",
        user_firstname = "Lewis",
        user_surname = "Hamilton"
    )
    review11 = Review(
        review = "Well lit basement parking",
        location = "Sarit Centre",
        user_firstname = "FernandoAlonso",
        user_surname = "Alonso"
    )

    reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11]
    db.session.add_all(reviews)
    db.session.commit()"""

    admin_user = User(
        firstname = "Feni",
        surname = "Akoth",
        email = "admin@f1.com",
        password = "admin",
        _is_activated = False,
        phone = "243789456",
        role="admin"
    )

    db.session.add(admin_user)
    db.session.commit()