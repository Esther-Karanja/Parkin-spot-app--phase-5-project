from models import  db,ParkingSpot

from flask_sqlalchemy import SQLAlchemy
from app import app

with app.app_context():
    #db.session.query(ParkingSpot).delete()
    #db.session.commit()

    parking1 = ParkingSpot(
        type= "Parking Lot",
        location = "Holy Family Basilica Parking",
        capacity= "536 cars",
        pricing = """0-2hrs : Ksh 100
                     2-3hrs : Ksh 200
                     4-5hrs : Ksh 300
                     5-6hrs : Ksh 400
                     More than 6hrs : Ksh 500
                    """,
        restrictions = """The ticket is collected at the entry device
Payment for the appropriate parking fees is made at the pay point on the first basement/ Mpesa
Make sure you retain the ticket to exit
Replacement for a lost ticket is Ksh 500
Exit the car park within 15 minutes after the payment.""")
    
   
        
    #if parking1.geocode_location():
        #db.session.add(parking1)
        #db.session.commit()
    
    db.session.add(parking1)
    db.session.commit()