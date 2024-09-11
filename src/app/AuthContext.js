"use client";
import { createContext, useContext, useState } from 'react';

// Create a Context for Auth Token
const AuthContext = createContext();

// Provide the context to children components
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Function to save token in localStorage (or any other storage)
  const saveToken = (token) => {
    setToken(token);
    localStorage.setItem('authToken', token);
  };

  // Function to remove token from localStorage
  const removeToken = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
