import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerCities.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';

const ManagerCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddCityForm, setShowAddCityForm] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [newCityDesc, setNewCityDesc] = useState('');

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

    axios.delete(`http://localhost:4000/manager/cities/${cityId}`, { headers: { token } })
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

  const handleAddCity = () => {
    const token = sessionStorage.getItem('token');

    axios.post('http://localhost:4000/manager/cities', {
      city_name: newCityName,
      city_desc: newCityDesc
    }, { headers: { token } })
      .then(response => {
        if (response.data.status === 'success') {
          setCities([...cities, response.data.data]);
          toast.success('City added successfully!');
          setShowAddCityForm(false);
          setNewCityName('');
          setNewCityDesc('');
        } else {
          toast.error('Failed to add city: ' + response.data.message);
        }
      })
      .catch(error => toast.error('Error adding city: ' + error.message));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manage-cities-container">
      <h2>Manage Cities</h2>
      <button className="add-city-btn" onClick={() => setShowAddCityForm(!showAddCityForm)}>
        {showAddCityForm ? 'Cancel' : 'Add City'}
      </button>
      {showAddCityForm && (
        <div className="add-city-form">
          <input
            type="text"
            placeholder="City Name"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
          />
          <input
            type="text"
            placeholder="City Description"
            value={newCityDesc}
            onChange={(e) => setNewCityDesc(e.target.value)}
          />
          <button className="submit-btn" onClick={handleAddCity}>Add City</button>
        </div>
      )}
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

export default ManagerCities;
