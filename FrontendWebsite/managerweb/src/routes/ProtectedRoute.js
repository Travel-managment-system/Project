import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const role = sessionStorage.getItem('role');

  return role === 'manager' ? children : <Navigate to="/error" />;
};

export default ProtectedRoute;
