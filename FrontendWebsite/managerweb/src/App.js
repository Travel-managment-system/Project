// import Login from "../login";
import HomePage from "./components/homePage";
import { Route, Routes } from 'react-router-dom';
import Login from "../src/pages/login";
import Register from "./pages/register";

import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import NavBar2 from "./components/NavBar2";
import Packages from "./components/packages";
import Hotels from "./components/hotels";
import Vehicles from "./components/vehicles";
import Flights from "./components/Flights";
import AddPackages from "./components/addPackages";
// import Navbar from "./components/navbar";
function App() {

  // const [activePage, setActivePage] = useState('Explore');

  // const renderContent = () => {
  //   switch (activePage) {
  //     case 'Explore':
  //       return <div><Packages></Packages></div>;
  //     case 'Flights':
  //       return <div><Flights></Flights></div>;
  //     case 'Stays':
  //       return <div><Hotels></Hotels></div>;
  //     case 'Vehicles':
  //       return <div><Vehicles></Vehicles></div>;
  //     default:
  //       return <div>Explore Content</div>;
  //   }
  // };
  return (<><Routes>
              <Route index element={<Login/>} />
            <Route  path="/" element={<Login></Login>} />  
            <Route path="/register" element={<Register/>}/>    
            <Route  path="/home" element={<HomePage></HomePage>} />
            <Route path="/addPackage" element={<AddPackages></AddPackages>} />

            </Routes>
            <ToastContainer/>
            <div>
      {/* <NavBar2 setActivePage={setActivePage} /> */}
 {/* {renderContent()} */}
    </div>
            </>
            
  );
}

export default App;




