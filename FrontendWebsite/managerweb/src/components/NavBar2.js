import React from 'react';

const NavBar2 = ({ setActivePage }) => {
  return (
    <nav>
      <button onClick={() => setActivePage('Explore')}>Explore</button>
      <button onClick={() => setActivePage('Flights')}>Flights</button>
      <button onClick={() => setActivePage('Stays')}>Stays</button>
      <button onClick={() => setActivePage('Vehicles')}>Vehicles</button>
    </nav>
  );
};

export default NavBar2;
