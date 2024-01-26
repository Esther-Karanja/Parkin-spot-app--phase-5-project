from models import  db,ParkingSpot

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