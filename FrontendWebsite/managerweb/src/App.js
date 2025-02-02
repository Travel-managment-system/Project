// import Login from "../login";
import HomePage from "./components/homePage";
import { Route, Routes } from 'react-router-dom';
import Login from "../src/pages/login";
import Register from "./pages/register";

import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';

import AddPackages from "./components/addPackages";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
// import Navbar from "./components/navbar";
function App() {


  return (<><Routes>
              <Route index element={<Login/>} />
            <Route  path="/" element={<Login></Login>} />  
            <Route path="/register" element={<Register/>}/>    
            <Route  path="/home" element={<HomePage></HomePage>} />
            <Route 
          path="/addPackage" 
          element={
            <ProtectedRoute>
              <AddPackages />
            </ProtectedRoute>
          } 
        />
        <Route path="/error" element={<ErrorPage />} />
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




