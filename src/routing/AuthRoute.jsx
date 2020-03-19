import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserContext } from '../core';
import { routesScheme } from './routesScheme';

const AuthRoute = ({ component: Component, ...rest }) => {
  const context = useContext(UserContext);
  const { role } = context;
  debugger;

  if (!role) {
    return <Redirect to={routesScheme.auth} />;
  }

  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} />}
    />
  );
};

AuthRoute.defaultProps = {
  component: PropTypes.func,
  rest: null,
};

AuthRoute.propTypes = {
  component: PropTypes.func,
  rest: PropTypes.shape({
    exact: PropTypes.bool,
    path: PropTypes.string,
  }),
};

export default AuthRoute;
