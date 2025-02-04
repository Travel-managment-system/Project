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
import { AuthProvider } from "./AppContext/AuthContext";
import Profile from "./components/Profile/Profile";
// import Navbar from "./components/navbar";
function App() {


  return (<>
  <AuthProvider>
  <Routes>
              <Route index element={<Login/>} />
            <Route  path="/" element={<Login></Login>} />  
            <Route path="/register" element={<Register/>}/> 


            {/* <ProtectedRoute></ProtectedRoute>    */}
            <Route  path="/home" element={
              <ProtectedRoute>
              <HomePage></HomePage>
              </ProtectedRoute>
            } />
            <Route 
          path="/create-packages" 
          element={
            <ProtectedRoute>
              <AddPackages />
            </ProtectedRoute>
          } 
        />

<Route 
          path="/profile" 
          element={
              <Profile />
          } 
        />


<Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
   
            </Routes>
            <ToastContainer/>
            </AuthProvider>
            </>
            
  );
}

export default App;




