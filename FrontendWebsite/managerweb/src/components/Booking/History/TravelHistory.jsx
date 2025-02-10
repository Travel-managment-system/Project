import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TravelHistory.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const TravelHistory = () => {
  const [travelHistory, setTravelHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:4000/bookings/user', {
        headers: { token },
        params: { user_id: userId }
      })
      .then((response) => {
        debugger
        setTravelHistory(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching travel history:', error);
        setLoading(false);
      });
  }, [userId, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button className='th-btn btn-secondary go-back-btn' onClick={() => navigate('/home')}>Home</button>

      <div className="travel-history-container">
        <h2>Travel History</h2>
        {travelHistory.length > 0 ? (
          <div className="travel-history-list">
            {travelHistory.map((trip) => (
              <div key={trip.booking_id} className="travel-history-card">
                <h3>{trip.hotel_name}</h3>
                <p><strong>Place:</strong> {trip.name}</p>
                <p><strong>City:</strong> {trip.city_name}</p>
                {/* <p><strong>Vehicle:</strong> {trip.name}</p> */}
                <p><strong>Departure Date:</strong> {trip.departure_date.split('T')[0]}</p>
                <p><strong>Return Date:</strong> {trip.return_Date.split('T')[0]}</p>
                <p><strong>Booking Date:</strong> {trip.booking_date.split('T')[0]}</p>
                <p><strong>People Count:</strong> {trip.count_people}</p>
                <p><strong>Total Amount:</strong> ${trip.total_amount}</p>

              </div>
            ))}
          </div>
        ) : (
          <p>No travel history found.</p>
        )}
        <button className="btn btn-secondary go-back-btn" onClick={() => navigate('/home')}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default TravelHistory;
