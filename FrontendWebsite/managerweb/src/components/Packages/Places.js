import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Places.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';
import Skeleton from '../../pages/skeleton.js';

const Places = () => {
  const location = useLocation();
  var { state } = location;

  if(!state) {
    state = {
      role: 'user'
    }}
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 6;
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4000/places', { headers: {token}})
      .then((result) => {
        setPackages(result.data.data || []);
        debugger
      })
      .catch((error) => {
        console.error('Error fetching packages:', error);
      });

  }, [token]);

  const AddPackage = () => {
    navigate('/create-packages', { state });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const truncateName = (name) => {
    return name.length > 20 ? name.substring(0, 20) + '...' : name;
  };

  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = packages.slice(indexOfFirstPackage, indexOfLastPackage);

  const handleSeeMore = (placeId) => {
    console.log(token)
    if(token===null){
      toast.warning('PLease log in to see more details');
    console.log('token in null')
    }
else{
  console.log("should nav")
  // navigate(`/place-details/${placeId}`, { state });
  navigate(`/place-details/${placeId}`);
}
  
  };

  return (
    <div className="container">
    
      {state.role === 'manager' && (
        <button className="btn btn-primary" onClick={AddPackage}>
          Add Package
        </button>
      )}
      <div className="package-container">
        {currentPackages.length > 0 ? (
          currentPackages.map((pkg) => (
            <div key={pkg.place_id} className="box">
              
              <div className="image-container">
                <img src={"http://localhost:4000/" + pkg.image} alt={pkg.name} className="image" />
                <div className="overlay">
                  <div className="popup-content">
                    <p>{pkg.description}</p>
                    <button className="btn btn-secondary" onClick={() => handleSeeMore(pkg.place_id)}>
                      See More
                    </button>
                  </div>
                </div>
              </div>
              <h3>{truncateName(pkg.name)}</h3>
            </div>
          ))
        ) : (<>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          </>
        )}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button className="btn btn-secondary" onClick={handlePrevPage}>
            Previous
          </button>
        )}
        {indexOfLastPackage < packages.length && (
          <button className="btn btn-secondary" onClick={handleNextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Places;
