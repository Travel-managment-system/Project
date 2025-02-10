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
import BookingComponent from "./components/Booking/Booking";
import Booking from "./components/Booking/Booking";
import AddPersonalDetails from "./components/Profile/AddPersonalDetails/AddPersonalDetails";
import TravelHistory from "./components/Booking/History/TravelHistory";
import AdminHome from "./services/AdminService/AdminHome";
import ManageUsers from "./services/AdminService/manageUser/ManageUsers";
import ManageBookings from "./services/AdminService/manageBookings/ManageBookings";
import ManageHotels from "./services/AdminService/manage-hotels/ManageHotels";
import ManageVehicles from "./services/AdminService/manage-vehicles/ManageVehicles";
import ManagePlaces from "./services/AdminService/manage-places/ManagePlaces";
import ManageCities from "./services/AdminService/manage-cities/ManageCities";
import ManagerHome from "./services/ManagerService/ManagerHome";
import ManagerCities from "./services/ManagerService/ManagerCity/ManagerCities";
import ManagerPlaces from "./services/ManagerService/ManagerPlaces/ManagerPlaces";
import ManagerHotels from "./services/ManagerService/ManagerHotels/ManagerHotels";
import ManagerVehicles from "./services/ManagerService/ManagerVehicle/ManagerVehicles";
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
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking></Booking>
              </ProtectedRoute>
            }
          />

          <Route
            path="/addPersonalDetails"
            element={
              <ProtectedRoute>
                <AddPersonalDetails></AddPersonalDetails>
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
            path="/travel-history"
            element={
              <ProtectedRoute>
                <TravelHistory />
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


          <Route
          path="admin/home"
          element={
            <ProtectedRoute>
              <AdminHome />
              </ProtectedRoute>
          }>
          </Route>

          <Route
          path="manage-users"
          element={
            <ProtectedRoute>
              <ManageUsers />
              </ProtectedRoute>
          }>
          </Route>
          <Route
          path="manage-bookings"
          element={
            <ProtectedRoute>
              <ManageBookings />
              </ProtectedRoute>
          }>
          </Route>
          <Route
          path="manage-hotels"
          element={
            <ProtectedRoute>
              <ManageHotels />
              </ProtectedRoute>
          }>
          </Route>

          <Route
          path="manage-vehicles"
          element={
            <ProtectedRoute>
              <ManageVehicles />
              </ProtectedRoute>
          }>
          </Route>

          <Route
          path="manage-places"
          element={
            <ProtectedRoute>
              <ManagePlaces />
              </ProtectedRoute>
          }>
          </Route>

          <Route
          path="manage-cities"
          element={
            <ProtectedRoute>
              <ManageCities />
              </ProtectedRoute>
          }>
          </Route>

          <Route
          path="manager/home"
          element={
            <ProtectedRoute>
              <ManagerHome />
              </ProtectedRoute>
          }>
          </Route>

          <Route
          path="manager-cities"
          element={
            <ProtectedRoute>
              <ManagerCities/>
              </ProtectedRoute>
          }>
          </Route>

          <Route
          path="manager-places"
          element={
            <ProtectedRoute>
              <ManagerPlaces/>
              </ProtectedRoute>
          }>
          </Route>

          <Route
          path="manager-hotels"
          element={
            <ProtectedRoute>
              <ManagerHotels/>
              </ProtectedRoute>
          }>
          </Route>

          <Route
          path="manager-vehicles"
          element={
            <ProtectedRoute>
              <ManagerVehicles/>
              </ProtectedRoute>
          }>
          </Route>

          
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
