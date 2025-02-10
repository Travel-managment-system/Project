import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageCities.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';

const ManageCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

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
  }, []);

  const handleDeleteCity = (cityId) => {
    const token = sessionStorage.getItem('token');

    axios.delete(`http://localhost:4000/admin/cities/${cityId}`, { headers: { token } })
      .then(response => {
        if (response.data.status === 'success') {
          setCities(cities.filter(city => city.city_id !== cityId));
          toast.success('City deleted successfully!');
        } else {
          toast.error('Failed to delete city: ' + response.data.message);
        }
      })
      .catch(error => toast.error('Error deleting city: ' + error.message));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manage-cities-container">
      <h2>Manage Cities</h2>
      <table className="cities-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
         
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map(city => (
            <tr key={city.city_id}>
              <td>{city.city_id}</td>
              <td>{city.city_name}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteCity(city.city_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCities;
