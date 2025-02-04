import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '../../Assests/logo.JPEG';

const NavBar2 = ({ setActivePage }) => {
  const navigate = useNavigate();

  const logoutsession = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="Logo" className="logo" />
        Travent<span>.</span>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => setActivePage('Explore')}>Explore</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => setActivePage('Flights')}>Flights</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => setActivePage('Stays')}>Stays</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => setActivePage('Vehicles')}>Vehicles</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleProfileClick}>Profile</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={logoutsession}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar2;
