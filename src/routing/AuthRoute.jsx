import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { routesScheme } from './routesScheme';
import { localDb } from '../services';

const AuthRoute = ({ component: Component, ...rest }) => {
  const userData = localDb.getDataAuthUser();

  if (!userData) {
    return <Redirect to={routesScheme.auth} />;
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
