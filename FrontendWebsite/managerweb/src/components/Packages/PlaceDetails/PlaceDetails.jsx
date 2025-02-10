import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { FaHeart } from 'react-icons/fa';
import './PlaceDetails.css'; // Import the CSS file for styling
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';
import HotelsByCity from '../../Hotels/HotelsByCity'; // Import the HotelsByCity component
import WeatherComponent from './Weather/WeatherComponent';

const PlaceDetails = () => {
  const { place_id } = useParams();
  const [placeDetails, setPlaceDetails] = useState(null);
  const [otherPlaces, setOtherPlaces] = useState([]);
  const [cart, setCart] = useState([]);
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/places/${place_id}`, { headers: { token } })
      .then((result) => {
        const place = result.data.data;

        const cityId = place.city_id;
        debugger
        sessionStorage.setItem('cityId', cityId);
        setPlaceDetails(place);
        return axios.get(`http://localhost:4000/places/city/${cityId}`, { headers: { token } });
      })
      .then((result) => {
        const places = result.data.data;
        setOtherPlaces(places);
      })
      .catch((error) => {
        console.error('Error fetching place details or other places:', error);
      });
  }, [place_id, token]);

  const handleSeeMore = (placeId) => {
    navigate(`/place-details/${placeId}`);
  };

  const handleAddToWishlist = (placeId) => {
    if (userId && placeId && token) {
      axios
        .post(
          `http://localhost:4000/wishlist`,
          { user_id: userId, place_id: placeId },
          { headers: { token } }
        )
        .then((response) => {
          toast.success('Added to wishlist');
          sessionStorage.setItem('placeId', placeId);
        })
        .catch((error) => {
          console.error('Error adding to wishlist:', error);
        });
    } else {
      console.error('User ID, Place ID, or Token is undefined');
    }
  };

  const handleAddToCart = (type, id) => {
    setCart([...cart, { type, id }]);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added to cart`);
  };

  if (!placeDetails) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="place-details-header">
        <button className="btn btn-secondary go-back-btn" onClick={() => navigate('/home')}>
          Go Back
        </button>
        <button className="btn btn-secondary go-back-btn" onClick={() => navigate('/booking')}>
         Cart
        </button>
        <button className="btn btn-secondary go-back-btn" onClick={() => navigate('/wishlist')}>
         See wishlist
        </button>
      </div>
      < div className="place-details-container">
        <h1>{placeDetails.name}</h1>
        <img src={`http://localhost:4000/${placeDetails.image}`} alt={placeDetails.name} className="place-image" />

        <p>{placeDetails.place_desc}</p>
       
          <button className="btn btn-secondary go-back-btn" onClick={() => handleAddToWishlist(placeDetails.place_id)} >Add to wishlist</button>
        <button className="btn btn-secondary go-back-btn" onClick={() => {
          handleAddToCart('place', { place_id: placeDetails.place_id, city_id: placeDetails.city_id });
          sessionStorage.setItem('placeId', placeDetails.place_id);
          sessionStorage.setItem('cityId', placeDetails.city_id);
        }}>
          Add to Package
        </button>
</div>
<div>
        {/* <WeatherComponent /> */}
        <HotelsByCity onAddToCart={handleAddToCart} /> {/* Pass the handleAddToCart function to HotelsByCity */}
        {/* <Vehicles></Vehicles> */}
        <div className="other-places-section">
          <h2>Other Places to Visit in the City</h2>
          {otherPlaces.length > 0 ? (
            <Slider {...settings}>
              {otherPlaces.map((place) => (
                <div key={place.place_id} className="place-card">
                  <img src={`http://localhost:4000/${place.image}`} alt={place.name} className="place-image-small" />
                  <div className="overlay">
                    <button className="btn-see-more" onClick={() => handleSeeMore(place.place_id)}>
                      See More
                    </button>
                    <button className="btn" onClick={() => {
                      handleAddToCart('place', { place_id: place.place_id, city_id: place.city_id });
                      sessionStorage.setItem('placeId', place.place_id);
                      sessionStorage.setItem('cityId', place.city_id);
                    }}>
                      Add to Package
                    </button>
                    <FaHeart className="heart-icon" onClick={() => handleAddToWishlist(place.place_id)} />
                  </div>
                  <h3>{place.name}</h3>
                  <p>{place.place_desc}</p>
                </div>
              ))}
            </Slider>
          ) : (
            <p>No other places found in the city.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PlaceDetails;
