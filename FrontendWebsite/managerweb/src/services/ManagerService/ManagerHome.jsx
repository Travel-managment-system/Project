import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagerHome.css'; // Import the CSS file for styling

const ManagerHome = () => {
  const navigate = useNavigate();

  return (
    <div className="manager-home-container">
      <h2>Manager Panel</h2>
      <div className="manager-dashboard">
        <div className="manager-card" onClick={() => navigate('/manager-cities')}>
          <h3>Manage Cities</h3>
          <p>Add, Edit, and Update Cities</p>
        </div>
        <div className="manager-card" onClick={() => navigate('/manager-places')}>
          <h3>Manage Places</h3>
          <p>Add, Edit, and Update Places</p>
        </div>
        <div className="manager-card" onClick={() => navigate('/manager-hotels')}>
          <h3>Manage Hotels</h3>
          <p>Add, Edit, and Update Hotels</p>
        </div>
        <div className="manager-card" onClick={() => navigate('/manager-vehicles')}>
          <h3>Manage Vehicles</h3>
          <p>Add, Edit, and Update Vehicles</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerHome;
