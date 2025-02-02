import Vehicles from './vehicles';
import Packages from './packages';
import Hotels from './hotels';
// import WeatherComponent from './WeatherComponent';
// import NavBar2 from './NavBar2';
import NavBar2 from "./NavBar2";
import Flights from "./Flights";
import React, { useState } from 'react';

const HomePage = () => {
const token=sessionStorage.getItem('token');
    console.log(token);
      const [activePage, setActivePage] = useState('Explore');

  const renderContent = () => {
    switch (activePage) {
      case 'Explore':
        return <div><Packages></Packages></div>;
      case 'Flights':
        return <div><Flights></Flights></div>;
      case 'Stays':
        return <div><Hotels></Hotels></div>;
      case 'Vehicles':
        return <div><Vehicles></Vehicles></div>;
      default:
        return <div>Explore Content</div>;
    }
  };

    return (
        <div>
            {/* <WeatherComponent></WeatherComponent> */}
         
{/* <p>home page </p> */}
{/* <Packages></Packages>
<Vehicles></Vehicles>
<Hotels></Hotels>
 */}
      <NavBar2 setActivePage={setActivePage} />
 {renderContent()}
        </div>
    );
    
    
};

export default HomePage;