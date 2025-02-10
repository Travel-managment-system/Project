import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagePlaces.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';

const ManagePlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    axios.get('http://localhost:4000/places', { headers: { token } })
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setPlaces(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
          toast.error('Failed to fetch places');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        setLoading(false);
      });
  }, []);

  const handleDeletePlace = (placeId) => {
    const token = sessionStorage.getItem('token');

    axios.delete(`http://localhost:4000/admin/places/${placeId}`, { headers: { token } })
      .then(response => {
        if (response.data.status === 'success') {
          setPlaces(places.filter(place => place.place_id !== placeId));
          toast.success('Place deleted successfully!');
        } else {
          toast.error('Failed to delete place: ' + response.data.message);
        }
      })
      .catch(error => toast.error('Error deleting place: ' + error.message));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manage-places-container">
      <h2>Manage Places</h2>
      <table className="places-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {places.map(place => (
            <tr key={place.place_id}>
              <td>{place.place_id}</td>
              <td>{place.name}</td>
              <td>{place.city_name}</td>
              <td>{place.place_desc}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeletePlace(place.place_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePlaces;
