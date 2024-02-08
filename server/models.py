from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(100), nullable=False)
    surname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    _is_activated = db.Column(db.Boolean, default=False)
    phone = db.Column(db.String(100), nullable=True)
    role = db.Column(db.String(100), nullable=False, default='client')

    reviews = db.relationship('Review',backref='user')

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    def __repr__(self):
        return f'<Users {self.email}>'
    
class ParkingSpot(db.Model):
    __tablename__ = 'parking_spots'

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    type = db.Column(db.String, nullable=False)
    capacity = db.Column(db.String, nullable=False)
    pricing = db.Column(db.String, nullable=False)
    restrictions = db.Column(db.String)

    reviews = db.relationship('Review',backref='parking_spot')

    def __repr__(self):
        return f"<ParkingSpot(id={self.id}, location={self.location}, type={self.type}, capacity={self.capacity}, pricing={self.pricing}, restrictions={self.restrictions})>"
    

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String,nullable=False)
    time = db.Column(db.DateTime, default=datetime.utcnow) 
    location_id = db.Column(db.Integer,db.ForeignKey('parking_spots.id'))
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))

    def __repr__(self):
        return f"<Review(id={self.id},review={self.review},location_id={self.location_id},user_id={self.user_id})"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

