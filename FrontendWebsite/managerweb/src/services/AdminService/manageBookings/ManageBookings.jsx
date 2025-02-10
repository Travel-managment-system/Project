import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageBookings.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    axios.get('http://localhost:4000/admin/bookings/details', { headers: { token } })
      .then(response => {
        // Check if response data is an array
        if (Array.isArray(response.data.data)) {
          setBookings(response.data.data);
        } else {
          // Handle unexpected response structure
          console.error('Unexpected response structure:', response.data);
          toast.error('Failed to fetch bookings');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      });
  }, []);

  const handleDeleteBooking = (bookingId) => {
    const token = sessionStorage.getItem('token');

    axios.delete(`http://localhost:4000/admin/bookings/${bookingId}`, { headers: { token } })
      .then(response => {
        if (response.data.status === 'success') {
          setBookings(bookings.filter(booking => booking.booking_id !== bookingId));
          toast.success('Booking deleted successfully!');
        } else {
          toast.error('Failed to delete booking: ' + response.data.message);
        }
      })
      .catch(error => toast.error('Error deleting booking: ' + error.message));
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manage-bookings-container">
      <h2>Manage Bookings</h2>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Hotel</th>
            <th>Place</th>
            <th>City</th>
            <th>Departure Date</th>
            <th>Return Date</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.booking_id}>
              <td>{booking.booking_id}</td>
              <td>{booking.user_id}</td>
              <td>{booking.name}</td>
              <td>{booking.name}</td>
              <td>{booking.city_name}</td>
              <td>{booking.departure_date}</td>
              <td>{booking.return_date}</td>
              <td>{booking.total_amount}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteBooking(booking.booking_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
