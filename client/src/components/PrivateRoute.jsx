// components/PrivateRoute.js
//(Need to revision the code ones) :- The whole component
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store/Auth';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Assuming your auth context provides this
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location, message: "You need to login first" }} replace />
  );
};

export default PrivateRoute;
