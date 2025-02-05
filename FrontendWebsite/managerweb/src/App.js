// import Login from "../login";
import HomePage from "./components/Home/homePage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";

import AddPackages from "./components/addPackages";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import { AuthProvider } from "./AppContext/AuthContext";
import Profile from "./components/Profile/Profile";
import PlaceDetails from "./components/Packages/PlaceDetails/PlaceDetails";
import Wishlist from "./components/Packages/wishlist/Wishlist";
import SearchCity from "./components/Home/SearchCity/SearchCity";
import Register from "./pages/Register/register";
// import Footer from "./components/Footer/Footer";
// import Navbar from "./components/navbar";
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register />} />

          {/* <ProtectedRoute></ProtectedRoute>    */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage></HomePage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-packages"
            element={
              <ProtectedRoute>
                <AddPackages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/city"
            element={
              <ProtectedRoute>
                <SearchCity />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />

          <Route
            path="/place-details/:place_id"
            element={
              <ProtectedRoute>
                <PlaceDetails />
              </ProtectedRoute>
            }
          />

         

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
