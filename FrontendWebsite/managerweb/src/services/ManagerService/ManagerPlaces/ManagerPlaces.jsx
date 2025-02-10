import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerPlaces.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';

const ManagerPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPlaceForm, setShowAddPlaceForm] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceDesc, setNewPlaceDesc] = useState('');
  const [newPlaceCityId, setNewPlaceCityId] = useState('');
  const [newPlaceImage, setNewPlaceImage] = useState(null);

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

    // Fetch places
    axios.get('http://localhost:4000/places', { headers: { token } })
      .then(response => {
        if (Array.isArray(response.data.data)) {
          debugger
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

  const handleAddPlace = () => {
    const token = sessionStorage.getItem('token');
    const formData = new FormData();
    formData.append('place_name', newPlaceName);
    formData.append('place_desc', newPlaceDesc);
    formData.append('city_id', newPlaceCityId);
    formData.append('image', newPlaceImage);

    axios.post('http://localhost:4000/manager/places', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        token
      }
    })
      .then(response => {
        if (response.data.status === 'success') {
          setPlaces([...places, response.data.data]);
          toast.success('Place added successfully!');
          setShowAddPlaceForm(false);
          setNewPlaceName('');
          setNewPlaceDesc('');
          setNewPlaceCityId('');
          setNewPlaceImage(null);
        } else {
          toast.error('Failed to add place: ' + response.data.message);
        }
      })
      .catch(error => toast.error('Error adding place: ' + error.message));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manage-places-container">
      <h2>Manage Places</h2>
      <button className="add-place-btn" onClick={() => setShowAddPlaceForm(!showAddPlaceForm)}>
        {showAddPlaceForm ? 'Cancel' : 'Add Place'}
      </button>
      {showAddPlaceForm && (
        <div className="add-place-form">
          <input
            type="text"
            placeholder="Place Name"
            value={newPlaceName}
            onChange={(e) => setNewPlaceName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Place Description"
            value={newPlaceDesc}
            onChange={(e) => setNewPlaceDesc(e.target.value)}
          />
          <select value={newPlaceCityId} onChange={(e) => setNewPlaceCityId(e.target.value)}>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewPlaceImage(e.target.files[0])}
          />
          <button className="submit-btn" onClick={handleAddPlace}>Add Place</button>
        </div>
      )}
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

export default ManagerPlaces;
