import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchCity.css'; // Import the CSS file
import HotelsByCity from './../../Hotels/HotelsByCity';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SearchCity = () => {
  const navigate = useNavigate();
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
        sessionStorage.setItem('cityId', response.data[0].city_id);
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

  const handleSeeMore = (placeId) => {
    navigate(`/place-details/${placeId}`);
  };

 

  return (
    <>
      <button className="btn btn-secondary go-back-btn" onClick={() => navigate('/home')}>
        Go Back
      </button>
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
                  <div className="place-card-buttons">
                    <button className="see-more-btn" onClick={() => handleSeeMore(place.place_id)}>See More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No places found in {cityName}.</p>
        )}
      </div>
      <HotelsByCity />
    </>
  );
};

export default SearchCity;
