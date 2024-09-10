import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Example authentication check function
const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  return localStorage.getItem('authToken') !== null;
};

// ProtectedRoute component
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
