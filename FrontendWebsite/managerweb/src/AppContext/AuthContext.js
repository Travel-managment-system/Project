import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(!!sessionStorage.getItem('token'));

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setAuth(true);
    }
  }, []);

  const login = (token) => {
    sessionStorage.setItem('token', token);
    setAuth(true);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
