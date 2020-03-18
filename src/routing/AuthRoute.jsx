import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { localDb } from '../services';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localDb.getDataAuthUser() ? <Component {...props} /> : <Redirect to="/auth" />
    }
  />
);

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
