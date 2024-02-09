import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [parkingSpots, setParkingSpots] = useState([]);

  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/parking'); // Adjust the URL accordingly
        setParkingSpots(response.data);
      } catch (error) {
        console.error('Error fetching parking spots:', error);
      }
    };

    fetchParkingSpots();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  return (
    <html>
      <head>
        <title>Booking Parking space</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
      </head>
      <body>
        <style>
          {`
            #form {
              margin-top: 50px;
            }

            #map {
              width: 100%;
              height: 300px;
              margin-top: 20px;
            }

            html,
            body {
              height: 100%;
              margin: 0;
              padding: 0;
            }
          `}
        </style>
        <div className="container">
          <div className="row">
            <div className="form-horizontal col-sm-8">
              <div className="form-group">
                <b><label htmlFor="from-input">Check in </label></b>
                <input type="search" className="form-control" id="from-input" placeholder="From" />
              </div>
              <div className="form-group">
                <b><label htmlFor="to-input">Check out</label></b>
                <input type="search" className="form-control" id="to-input" placeholder="To" />
              </div>
              <div className="form-group">
                <b><label htmlFor="to-input">Entry time</label></b>
                <input type="text" className="form-control" placeholder="Step At" />
              </div>
              <button id="submit" type="submit" className="btn btn-primary">Submit</button>
            </div>
            <div className="form-horizontal col-sm-4"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-8">
              <h2 className="text-center">Available Parking Spots</h2>
              <ul>
                {parkingSpots.map((spot, index) => (
                  <li key={index}>{spot.name} - {spot.location}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div id="map"></div>
      </body>
    </html>
  );
};

export default BookingForm;
