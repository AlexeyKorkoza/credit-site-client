import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { localDb } from '../services';
import { Forbidden } from '../components/ErrorPages';

const accessRoles = ['admin', 'manager'];

const PrivateRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
            localDb.getDataAuthUser()
                ? <Component {...props} />
                : <Redirect to="/auth" />
        }
  />
);

const PrivateRouterRole = ({ component: Component, accessRole, ...rest }) => {
    const isAccess = accessRoles.includes(accessRole);

    if (!isAccess) {
        return (
          <Redirect to='/profile' />
        );
    }

    const { role: userRole } = localDb.getDataAuthUser();
    const isCompare = accessRole === userRole;

    if (!isCompare) {
        return (
          <Forbidden />
        );
    }

    return (
      <Route
        {...rest}
        render={props => <Component {...props} />}
      />
    );
};

PrivateRouter.defaultProps = {
    component: PropTypes.func,
    rest: null,
};

PrivateRouter.propTypes = {
    component: PropTypes.func,
    rest: PropTypes.shape({
        exact: PropTypes.bool,
        path: PropTypes.string,
    }),
};

PrivateRouterRole.defaultProps = {
    accessRole: PropTypes.string,
    component: PropTypes.func,
    rest: null,
};

PrivateRouterRole.propTypes = {
    accessRole: PropTypes.string,
    component: PropTypes.func,
    rest: PropTypes.shape({
        exact: PropTypes.bool,
        path: PropTypes.string,
    }),
};

export default {
    PrivateRouter,
    PrivateRouterRole,
}
