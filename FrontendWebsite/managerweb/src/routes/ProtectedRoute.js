// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const role = sessionStorage.getItem('role');
//   const token = sessionStorage.getItem('token');
//   if (token==null) return <Navigate to="/" />;

//   return role === 'manager' ? children : <Navigate to="/error" />;
// };

// export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './../AppContext/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
