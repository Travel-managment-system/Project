import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css'; // Import the CSS file for styling

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container">
      <h2>Admin Panel</h2>
      <div className="admin-dashboard">
        <div className="admin-card" onClick={() => navigate('/manage-users')}>
          <h3>Manage Users</h3>
          <p>View and manage all registered users</p>
        </div>
        <div className="admin-card" onClick={() => navigate('/manage-bookings')}>
          <h3>Manage Bookings</h3>
          <p>View and manage all bookings</p>
        </div>
        <div className="admin-card" onClick={() => navigate('/manage-hotels')}>
          <h3>Manage Hotels</h3>
          <p>View and manage all hotels</p>
        </div>
        <div className="admin-card" onClick={() => navigate('/manage-places')}>
          <h3>Manage Places</h3>
          <p>View and manage all places</p>
        </div>
        <div className="admin-card" onClick={() => navigate('/manage-vehicles')}>
          <h3>Manage Vehicles</h3>
          <p>View and manage all vehicles</p>
        </div>
        <div className="admin-card" onClick={() => navigate('/manage-cities')}>
          <h3>Manage Cities</h3>
          <p>Generate and view reports</p>
        </div>
        {/* <div className="admin-card" onClick={() => navigate('/view-reports')}>
          <h3>View Reports</h3>
          <p>Generate and view reports</p>
        </div> */}

      </div>
    </div>
  );
};

export default AdminHome;
