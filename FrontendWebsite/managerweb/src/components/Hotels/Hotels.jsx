import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Hotels.css'; // Import the CSS file for styling

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 6;
  const token = sessionStorage.getItem('token');
  console.log(token);

  useEffect(() => {
    console.log("object");
    axios
      .get('http://localhost:4000/hotels', { headers: {token} })
      .then(result => {
        debugger;
        setHotels(result.data.data);
        console.log("result is ", result.data.data);
      })
      .catch(error => {
        console.error('Error fetching hotels:', error);
      });
  }, [token]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  return (
    <div className="container">
    
      <div className="package-container">
        {currentHotels.length > 0 ? (
          currentHotels.map(pkg => (
            <div key={pkg.hotel_id} className="box">
              <div>
                <img
                  src={"http://localhost:4000/" + pkg.image}
                  alt={pkg.city}
                  className="image"
                />
              </div>
              <h2>{pkg.cost}</h2>
              <p>{pkg.reviews}</p>
              {/* <p>{pkg.ratings}</p> */}
            </div>
          ))
        ) : (
          <p>No hotels available</p>
        )}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button className="btn btn-secondary" onClick={handlePrevPage}>
            Previous
          </button>
        )}
        {indexOfLastHotel < hotels.length && (
          <button className="btn btn-secondary" onClick={handleNextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Hotels;
