import React, { createContext, useContext, useState } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(!!sessionStorage.getItem('token'));
  const [role, setRole] = useState(sessionStorage.getItem('role'));

  // Function to log in the user
  const login = (token, userRole) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', userRole);
    setAuth(true);
    setRole(userRole);
  };

  // Function to log out the user
  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    setAuth(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ auth, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
