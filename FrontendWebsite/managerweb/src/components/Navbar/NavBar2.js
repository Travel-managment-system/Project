import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '../../Assests/logo.JPEG';
import { toast } from 'react-toastify';

const NavBar2 = ({ setActivePage }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const logoutsession = () => {
    toast.success('Logged out');
    // sessionStorage.removeItem('token');
    sessionStorage.clear()
    navigate('/home');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
          {token === null && (
            <Link to="/login" className="nav-link">Login</Link>
          )}
          {token !== null && (
            <>
              <button className="nav-link btn btn-link" onClick={logoutsession}>Logout</button>
              <Link to="/wishlist" className="nav-link">Wishlist</Link>
              <Link to="/profile" className='nav-link'>Profile</Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar2;
