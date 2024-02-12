import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    entryTime: ''
  });
  const [submittedData, setSubmittedData] = useState(null); // State to store submitted form data
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control the display of the confirmation message

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
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedData(formData); // Store submitted form data
    setShowConfirmation(true); // Show confirmation message
    // Optionally, you can send the form data to the backend here
    try {
      // Add axios request to send form data to the backend
      console.log('Form data submitted:', formData);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }

    // Automatically hide the confirmation message after 5 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="form-horizontal col-sm-8">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <b><label htmlFor="from-input">Check in Time</label></b>
              <input type="search" className="form-control" id="from" placeholder="From" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <b><label htmlFor="to-input">Check out</label></b>
              <input type="search" className="form-control" id="to" placeholder="To" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <b><label htmlFor="entry-input">Location</label></b>
              <input type="text" className="form-control" id="entryTime" placeholder="Step At" onChange={handleInputChange} />
            </div>
            <button id="submit" type="submit" className="btn btn-primary" style={{ backgroundColor: '#fc6a6a', }}>Book</button>
          </form>
        </div>
        <div className="form-horizontal col-sm-4"></div>
      </div>
      {/* Display form data if submitted */}
      {submittedData && !showConfirmation && (
        <div className="row justify-content-center mt-5">
          <div className="col-sm-8">
            <div className="card">
              <h5 className="card-header" style={{ backgroundColor: '#fad4d4', }}>Form Data</h5>
              <div className="card-body">
                <p><strong>Check in:</strong> {submittedData.from}</p>
                <p><strong>Check out:</strong> {submittedData.to}</p>
                <p><strong>Location:</strong> {submittedData.entryTime}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Display confirmation message if form is submitted */}
      {showConfirmation && (
        <div className="row justify-content-center mt-5">
          <div className="col-sm-8">
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Success!</strong> Your booking request has been submitted successfully.
              <button type="button" className="close" onClick={() => setShowConfirmation(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="row justify-content-center mt-5">
        <div className="col-sm-8">
          <h2 className="text-center">Parking spots</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Location</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Pricing</th>
                <th>Restrictions</th>
              </tr>
            </thead>
            <tbody>
              {parkingSpots.map((spot, index) => (
                <tr key={index}>
                  <td>{spot.id}</td>
                  <td>{spot.location}</td>
                  <td>{spot.type}</td>
                  <td>{spot.capacity}</td>
                  <td>{spot.pricing}</td>
                  <td>{spot.restrictions || 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
