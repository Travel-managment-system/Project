import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerHotels.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';

const ManagerHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddHotelForm, setShowAddHotelForm] = useState(false);
  const [newHotelName, setNewHotelName] = useState('');
  const [newHotelDesc, setNewHotelDesc] = useState('');
  const [newHotelCityId, setNewHotelCityId] = useState('');
  const [newHotelCost, setNewHotelCost] = useState('');
  const [newHotelImage, setNewHotelImage] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    // Fetch cities for the city dropdown
    axios.get('http://localhost:4000/cities', { headers: { token } })
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setCities(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
          toast.error('Failed to fetch cities');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
        setLoading(false);
      });

    // Fetch hotels
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

    axios.delete(`http://localhost:4000/manager/hotels/${hotelId}`, { headers: { token } })
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

  const handleAddHotel = () => {
    const token = sessionStorage.getItem('token');
    const formData = new FormData();
    formData.append('hotel_name', newHotelName);
    formData.append('hotel_desc', newHotelDesc);
    formData.append('city_id', newHotelCityId);
    formData.append('cost', newHotelCost);
    formData.append('image', newHotelImage);

    axios.post('http://localhost:4000/manager/hotels', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        token
      }
    })
      .then(response => {
        if (response.data.status === 'success') {
          setHotels([...hotels, response.data.data]);
          toast.success('Hotel added successfully!');
          setShowAddHotelForm(false);
          setNewHotelName('');
          setNewHotelDesc('');
          setNewHotelCityId('');
          setNewHotelCost('');
          setNewHotelImage(null);
        } else {
          toast.error('Failed to add hotel: ' + response.data.message);
        }
      })
      .catch(error => toast.error('Error adding hotel: ' + error.message));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manage-hotels-container">
      <h2>Manage Hotels</h2>
      <button className="add-hotel-btn" onClick={() => setShowAddHotelForm(!showAddHotelForm)}>
        {showAddHotelForm ? 'Cancel' : 'Add Hotel'}
      </button>
      {showAddHotelForm && (
        <div className="add-hotel-form">
          <input
            type="text"
            placeholder="Hotel Name"
            value={newHotelName}
            onChange={(e) => setNewHotelName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Hotel Description"
            value={newHotelDesc}
            onChange={(e) => setNewHotelDesc(e.target.value)}
          />
          <select value={newHotelCityId} onChange={(e) => setNewHotelCityId(e.target.value)}>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Cost"
            value={newHotelCost}
            onChange={(e) => setNewHotelCost(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewHotelImage(e.target.files[0])}
          />
          <button className="submit-btn" onClick={handleAddHotel}>Add Hotel</button>
        </div>
      )}
      <table className="hotels-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Description</th>
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
              <td>{hotel.reviews}</td>
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

export default ManagerHotels;
