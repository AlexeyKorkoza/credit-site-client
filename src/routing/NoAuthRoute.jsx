import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserContext } from '../core';
import { routesScheme } from './routesScheme';

const NoAuthRoute = ({ component: Component, ...rest }) => {
  const context = useContext(UserContext);
  const { role } = context;

  if (role) {
    return <Redirect to={routesScheme.profile} />;
  }

  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} />}
    />
  );
};

NoAuthRoute.defaultProps = {
  component: PropTypes.func,
  rest: null,
};

NoAuthRoute.propTypes = {
  component: PropTypes.func,
  rest: PropTypes.shape({
    exact: PropTypes.bool,
    path: PropTypes.string,
  }),
};

export default NoAuthRoute;
