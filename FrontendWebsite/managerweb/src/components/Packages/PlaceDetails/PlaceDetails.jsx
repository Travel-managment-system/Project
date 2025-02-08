import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { FaHeart } from 'react-icons/fa';
import './PlaceDetails.css'; // Import the CSS file for styling
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';
import Hotels from '../../Hotels/Hotels';
import HotelsByCity from '../../Hotels/HotelsByCity';
import WeatherComponent from './Weather/WeatherComponent';
// import './../../../App.css'
const PlaceDetails = () => {
  const { place_id } = useParams();
  const cityName=sessionStorage.getItem('cityName')
  const cityId=sessionStorage.getItem('cityId')
  
  const [placeDetails, setPlaceDetails] = useState(null);
  const [otherPlaces, setOtherPlaces] = useState([]);
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId'); // Retrieve user ID from session storage
  const navigate = useNavigate();
  console.log(userId);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/places/${place_id}`, { headers: { token } })
      .then((result) => {
        const place = result.data.data;
        const cityId= place.city_id;
        sessionStorage.setItem('cityId',cityId)
        // const cityId=result.data.data.city_id;
        setPlaceDetails(place);
// debugger
        // Fetch other places in the same city
        return axios.get(`http://localhost:4000/places/city/${cityId}`, { headers: { token }});
      })
      .then((result) => {
        const places = result.data.data;
        debugger
        sessionStorage.setItem('cityName',places[0].city_name)
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
    const token = sessionStorage.getItem('token'); // Retrieve the token from session storage
// sessionStorage.removeItem('placeId')
    if (userId && placeId && token) {
      axios
        .post(
          `http://localhost:4000/wishlist`,
          { user_id: userId, place_id: placeId },
          { headers: { token } } // Set the Authorization header
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
        <button className="btn btn-secondary go-back-btn" onClick={() => navigate('/home')}>
         Cart
        </button>
        <button className="btn btn-secondary go-back-btn" onClick={() => navigate('/wishlist')}>
         See wishlist
        </button>
      </div>
      <div className="place-details-container">
       
        <h1>{placeDetails.name}</h1>
        <img src={`http://localhost:4000/${placeDetails.image}`} alt={placeDetails.name} className="place-image" />


        <p>{placeDetails.place_desc}</p>
        <button className='book-place-btn' >add to package</button>
        <p>or</p>
        <div className='fav-div'>
        <FaHeart className="heart-icon" onClick={() => handleAddToWishlist(placeDetails.place_id)} />
        </div>
        
        {/* <WeatherComponent></WeatherComponent> */}
        <div>weather component</div>
        <HotelsByCity></HotelsByCity>
        <div className="other-places-section">
          <h2>Other Places to Visit in the {cityName}</h2>
          {otherPlaces.length > 0 ? (
            <Slider {...settings}>
              {otherPlaces.map((place) => (
                <div key={place.place_id} className="place-card">
                  <img src={`http://localhost:4000/${place.image}`} alt={place.name} className="place-image-small" />
                  <div className="overlay">
                    <button className="btn-see-more" onClick={() => handleSeeMore(place.place_id)}>
                      See More
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
        {/* <Hotels></Hotels> */}
      </div>
    </>
  );
};

export default PlaceDetails;
