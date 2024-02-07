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
        email = "alexalbon@f1.com",
        password = "alexalbon",
        _is_activated = False,
        phone = "011345676"
    )
    user2 = User(
        firstname = "Kevin",
        surname = "Magnussen",
        email = "kevinmagnussen@f1.com",
        password = "kevinmagnussen",
        _is_activated = False,
        phone = "0789304689"
    )
    user3 = User(
        firstname = "Charles",
        surname = "Leclerc",
        email = "charlesleclerc@f1.com",
        password = "charlesleclerc",
        _is_activated = False,
        phone = "1917846506"
    )
    user4 = User(
        firstname = "Lewis",
        surname = "Hamilton",
        email = "lewishamilton@f1.com",
        password = "lewishamilton",
        _is_activated = False,
        phone = "09432740"
    )
    user5 = User(
        firstname = "Fernando",
        surname = "Alonso",
        email = "fernandoalonso@f1.com",
        password = "fernandoalonso",
        _is_activated = False,
        phone = "243789456"
    )

    users = [user1,user2,user3,user4,user5]
    db.session.add_all(users)
    db.session.commit()