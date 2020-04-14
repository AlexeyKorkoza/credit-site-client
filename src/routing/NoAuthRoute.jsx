import React  from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { routesScheme } from './routesScheme';
import { localDb } from '../services';

const NoAuthRoute = ({ component: Component, ...rest }) => {
  const userData = localDb.getDataAuthUser();

  if (userData) {
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
