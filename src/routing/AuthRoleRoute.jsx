import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { localDb } from '../services';
import { Forbidden } from '../shared/ErrorPages';

const accessRoles = ['admin', 'manager'];

const AuthRoleRoute = ({ component: Component, accessRole, ...rest }) => {
  const isAccess = accessRoles.includes(accessRole);

  if (!isAccess) {
    return <Redirect to="/profile" />;
  }

  const { role: userRole } = localDb.getDataAuthUser();
  const isCompare = accessRole === userRole;

  if (!isCompare) {
    return <Forbidden />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};
AuthRoleRoute.defaultProps = {
  accessRole: PropTypes.string,
  component: PropTypes.func,
  rest: null,
};

AuthRoleRoute.propTypes = {
  accessRole: PropTypes.string,
  component: PropTypes.func,
  rest: PropTypes.shape({
    exact: PropTypes.bool,
    path: PropTypes.string,
  }),
};

export default AuthRoleRoute;
