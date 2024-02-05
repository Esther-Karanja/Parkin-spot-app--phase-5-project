from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(100), nullable=False)
    surname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    _is_activated = db.Column(db.Boolean, default=False)
    phone = db.Column(db.String(100), nullable=True)
    role = db.Column(db.String(100), nullable=False, default='client')

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    def __repr__(self):
        return f'<User {self.email}>'
    
class ParkingSpot(db.Model):
    __tablename__ = 'parking spots'

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    type = db.Column(db.String, nullable=False)
    capacity = db.Column(db.String, nullable=False)
    pricing = db.Column(db.String, nullable=False)
    restrictions = db.Column(db.String)

    def __repr__(self):
        return f"<ParkingSpot(id={self.id}, location={self.location}, type={self.type}, capacity={self.capacity}, pricing={self.pricing}, restrictions={self.restrictions})>"
    
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}