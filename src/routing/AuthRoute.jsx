import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { routesScheme } from './routesScheme';
import { localDb } from '../services';

const AuthRoute = ({ component: Component, ...rest }) => {
  const userData = localDb.getDataAuthUser();
  const { pathname } = useLocation();

  if (!userData) {
    const redirectTo = {
      pathname: routesScheme.auth,
      search: `return_url=${encodeURIComponent(pathname)}`,
    };

    return <Redirect to={redirectTo} />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
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
