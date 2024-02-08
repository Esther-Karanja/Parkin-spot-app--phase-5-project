from models import  db,ParkingSpot, User

from flask_sqlalchemy import SQLAlchemy
from app import app
import json

with app.app_context():
    with open ('seed.json') as f:
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
    user5 = User(
        firstname = "Millicent",
        surname = "Wangechi",
        email = "millicentwangechi@gmail.com",
        password = "millicentwangechi",
        _is_activated = False,
        phone = "243789456"
    )

    users = [user1,user2,user3,user4,user5]
    db.session.add_all(users)
    db.session.commit()