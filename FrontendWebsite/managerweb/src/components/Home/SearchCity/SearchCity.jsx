import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchCity.css'; // Import the CSS file

const SearchCity = () => {
  const cityName = sessionStorage.getItem('cityName');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:4000/places-by-city', {
        headers: { token },
        params: { city_name: cityName }
      })
      .then((response) => {
        setPlaces(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
        setLoading(false);
      });
  }, [cityName, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="search-by-city-container">
      <h2>Places in {cityName}</h2>
      {places.length > 0 ? (
        <div className="places-grid">
          {places.map((place) => (
            <div key={place.place_id} className="place-card">
              <img src={`http://localhost:4000/${place.place_image}`} alt={place.place_name} className="place-image" />
              <div className="place-info">
                <h3>{place.place_name}</h3>
                <p>{place.place_desc}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No places found in {cityName}.</p>
      )}
    </div>
  );
};

export default SearchCity;
