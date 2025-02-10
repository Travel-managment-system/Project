import React, { useState } from 'react';
import axios from 'axios';
import Vehicles from '../Vehicles/Vehicles';
import Packages from '../Packages/Places';
import Hotels from '../Hotels/Hotels';
import NavBar2 from '../Navbar/NavBar2';
import Flights from '../Flights/Flights';
import './../../App.css';
import './Homepage.css';
import Footer from './../Footer/Footer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Memories from './Memories/Memories';
import Reviews from './Reviews/Reviews';
import FlightComponent from '../Flights/FlightsByDistance';

const HomePage = () => {
  const token = sessionStorage.getItem('token');
  console.log(token);
  const [activePage, setActivePage] = useState('Explore');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
sessionStorage.removeItem('placeId')
sessionStorage.removeItem('cityId')
sessionStorage.removeItem('cityName')
sessionStorage.removeItem('hotelId')
 

  const handleSearch = () => {
    if(!token){
      toast.warning('please log in to see search result')
    }
    else{
      if(!searchTerm){
        toast.warning('enter a city name ')
      }
      else{
        sessionStorage.setItem('cityName',searchTerm)
        navigate('/city', { state: { searchTerm } }); // Navigate to CityPage with searchTerm as state
        console.log('Searching for:', searchTerm);
    
      }
    }
   
      };

  const renderContent = () => {
    switch (activePage) {
      case 'Explore':
        return (
          <div>
            <h2>Best places to visit</h2>
            <Packages />
          </div>
        );
      case 'Flights':
        return (
          <div>
              <h2>We have the best flights for you at the unbeatable prices</h2>
              {/* <FlightComponent></FlightComponent> */}
            <Flights />
          </div>
        );
      case 'Stays':
        return (
          <div>
            <h2>Top most rated hotels for you</h2> 
            <Hotels />
          </div>
        );
      case 'Vehicles':
        return (
          <div>
            <h2>Available vehicles for you</h2>
            <Vehicles />
          </div>
        );
      default:
        return <div>Explore Content</div>;
    }
  };

  return (
    <div>
      <NavBar2 setActivePage={setActivePage} />
      <div className='main-content'>
      {/* <div className='main-content'> */}
        <div className="hero-section">
          <h2 className='home-hero-h2'>Plan Your Perfect Trip</h2>
          <p className='home-hero-text'>Explore the world's best destinations at unbeatable prices.</p>
          <div className="search-form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}>
              <input
                type="text"
                placeholder="Search for a city or place..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
        {/* <h3 className='Home-heading'>Best PLaces to Visit</h3> */}
        <div className="container">{renderContent()}</div>
        <hr className="enhanced-hr"/>
        {/* <h2>Top hotels</h2> */}
      </div>
      <Memories></Memories>
      <br></br>
      <br></br>
      <hr className="enhanced-hr"/>
      <Reviews></Reviews>
        <Footer />
       
      {/* </div> */}
    </div>
  );
};

export default HomePage;
