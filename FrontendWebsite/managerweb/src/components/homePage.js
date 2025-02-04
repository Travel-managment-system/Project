import React, { useState } from 'react';
import Vehicles from './Vehicles/Vehicles';
import Packages from './Packages/Packages';
import Hotels from './Hotels/Hotels';
import NavBar2 from './Navbar/NavBar2';
import Flights from './Flights/Flights';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const token = sessionStorage.getItem('token');
  console.log(token);
  const [activePage, setActivePage] = useState('Explore');

  const renderContent = () => {
    switch (activePage) {
      case 'Explore':
        return <div><Packages /></div>;
      case 'Flights':
        return <div><Flights /></div>;
      case 'Stays':
        return <div><Hotels /></div>;
      case 'Vehicles':
        return <div><Vehicles /></div>;
      default:
        return <div>Explore Content</div>;
    }
  };

  return (
    <div>
      <NavBar2 setActivePage={setActivePage} />
      <div className="jumbotron text-center bg-primary text-white">
        <h2>Plan Your Perfect Trip</h2>
        <p>Explore the world's best destinations at unbeatable prices.</p>
      </div>
      <div className="container my-4">
        <form className="form-inline">
          <div className="form-group mb-2">
            <label className="sr-only">Destination</label>
            <input type="text" className="form-control" placeholder="Destination" />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <label className="sr-only">Check-in</label>
            <input type="date" className="form-control" placeholder="Check-in" />
          </div>
          <div className="form-group mb-2">
            <label className="sr-only">Check-out</label>
            <input type="date" className="form-control" placeholder="Check-out" />
          </div>
          <button type="submit" className="btn btn-primary mb-2">Search</button>
        </form>
      </div>
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
};

export default HomePage;
