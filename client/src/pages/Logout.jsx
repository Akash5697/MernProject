import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';

const Logout = () => {
  const { LogutUser } = useAuth();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (!hasLoggedOut.current) {
      LogutUser();
      hasLoggedOut.current = true;
    }
  }, [LogutUser]);

  return <Navigate to="/login" />;
};

export default Logout;
