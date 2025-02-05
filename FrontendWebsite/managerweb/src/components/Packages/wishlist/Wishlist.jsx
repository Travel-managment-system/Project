import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4000/wishlist', { headers: {token} , params: { user_id: userId }})
      .then((response) => {
        setWishlist(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching wishlist:', error);
      });
  }, [token, userId]);

  const handleRemove = (placeId) => {
    axios
      .delete(`http://localhost:4000/wishlist/${placeId}`, { headers: {token}, params: { user_id: userId }})
      .then(() => {
        setWishlist((prevWishlist) => prevWishlist.filter((place) => place.place_id !== placeId));
      })
      .catch((error) => {
        console.error('Error removing from wishlist:', error);
      });
  };

  return (<>

    <div className="wishlist-container">
     
      <div className="wishlist-header">
        <button className="btn btn-secondary go-back-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <button className="btn btn-secondary go-back-btn" onClick={() => navigate('/home')}>
          Home
        </button>
       
      </div>
      <h1>My Wishlist</h1>
      <hr className='enhanced-hr'></hr>
      {wishlist.length > 0 ? (
        wishlist.map((place) => (
          <div key={place.place_id} className="wishlist-item">
            <img src={`http://localhost:4000/${place.image}`} alt={place.name} className="wishlist-image" />
            <div className="wishlist-details">
              <h3>{place.name}</h3>
              <p>{place.description}</p>
              <button className="btn btn-danger" onClick={() => handleRemove(place.place_id)}>
                Remove
              </button>
              <Link to={`/place-details/${place.place_id}`} className="btn btn-primary">
                See More
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No places in your wishlist.</p>
      )}
    </div>
  </>);
};

export default Wishlist;
