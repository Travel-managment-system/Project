import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageHotels.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    axios.get('http://localhost:4000/hotels', { headers: { token } })
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setHotels(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
          toast.error('Failed to fetch hotels');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching hotels:', error);
        setLoading(false);
      });
  }, []);

  const handleDeleteHotel = (hotelId) => {
    const token = sessionStorage.getItem('token');

    axios.delete(`http://localhost:4000/admin/hotels/${hotelId}`, { headers: { token } })
      .then(response => {
        if (response.data.status === 'success') {
          setHotels(hotels.filter(hotel => hotel.hotel_id !== hotelId));
          toast.success('Hotel deleted successfully!');
        } else {
          toast.error('Failed to delete hotel: ' + response.data.message);
        }
      })
      .catch(error => toast.error('Error deleting hotel: ' + error.message));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manage-hotels-container">
      <h2>Manage Hotels</h2>
      <table className="hotels-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map(hotel => (
            <tr key={hotel.hotel_id}>
              <td>{hotel.hotel_id}</td>
              <td>{hotel.name}</td>
              <td>{hotel.city_name}</td>
              <td>{hotel.cost}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteHotel(hotel.hotel_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageHotels;
