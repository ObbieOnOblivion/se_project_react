import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  return localStorage.getItem('jwt') !== null;
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
