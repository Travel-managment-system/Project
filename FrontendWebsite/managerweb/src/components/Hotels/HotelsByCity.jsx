import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HotelsByCity.css'; // Import the CSS file
import { toast } from 'react-toastify';

const HotelsByCity = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleHotelBooking =(hotelId)=>{
console.log(hotelId)
toast.success('hotel added to the cart')
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const cityId = sessionStorage.getItem('cityId');

    axios
      .get(`http://localhost:4000/hotels/city/${cityId}`, {
        headers: { token }
      })
      .then((response) => {
        if (response.data.status === 'success') {
          setHotels(response.data.data);
          console.log(response.data.data)
          setLoading(false);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching hotels:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hotels-container">
      <h2>Hotels in Your Selected City</h2>
      {hotels.length > 0 ? (
        <div className="hotels-grid">
          {hotels.map((hotel, index) => (
            <div key={index} className="hotel-card">
              <img src={`http://localhost:4000/${hotel.image}`} alt={hotel.name} className="hotel-image" />
              <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p>{hotel.description}</p>
                <p><strong>Price:</strong> {hotel.cost}</p>
                <p><strong>Reviews:</strong> {hotel.reviews}</p>
                <button className="book-hotel-btn" onClick={() => handleHotelBooking(hotel.hotel_id)}>Book Hotel</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hotels found for the selected city.</p>
      )}
    </div>
  );
};

export default HotelsByCity;
