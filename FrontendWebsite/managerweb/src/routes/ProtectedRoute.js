import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './../AppContext/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const role = location.state?.role;

  if (!auth) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/error" />;
  }

  return children;
};

export default ProtectedRoute;
