import React from 'react';
import { useNavigate } from 'react-router-dom';


const NavBar2 = ({ setActivePage }) => {
  const navigate = useNavigate();
    const logoutsession = () =>{
        sessionStorage.removeItem('token');
     navigate('/');
    }
  return (

<div>
  <nav>
      <button onClick={() => setActivePage('Explore')}>Explore</button>
      <button onClick={() => setActivePage('Flights')}>Flights</button>
      <button onClick={() => setActivePage('Stays')}>Stays</button>
      <button onClick={() => setActivePage('Vehicles')}>Vehicles</button>
      <button onClick={logoutsession}>Logout</button>
    </nav>


</div>
);
};

export default NavBar2;
