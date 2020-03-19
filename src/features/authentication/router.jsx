import React from 'react';
import { Route } from 'react-router-dom';

import { routesScheme } from '../../routing';
import Authentication from './Authentication';

const authenticationRouter = () => (
    <Route path={routesScheme.auth} component={Authentication} />
);

export default authenticationRouter;
