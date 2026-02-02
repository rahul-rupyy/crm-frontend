import React, { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = Cookies.get('token');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default PrivateRoute;
