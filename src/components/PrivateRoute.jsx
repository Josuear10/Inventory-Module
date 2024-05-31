import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no hay token, redirigir a la página de login
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
