import React, { lazy, useContext, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';

import { GlobalStyle, Page } from './styles';
import { AuthRoleRoute, AuthRoute, NoAuthRoute, routesScheme } from './routing';
import Sidebar from './shared/Sidebar';
import { UserContext } from './core';

const NoMatch = lazy(() => import('./shared/ErrorPages'));
const Authentication = lazy(() => import('./features/authentication'));
const Profile = lazy(() => import('./features/profile'));
const ManagersList = lazy(() => import('./features/managers').then(m => m.ManagersList));
const ManagersEditor = lazy(() => import('./features/managers').then(m => m.ManagersEditor));
const ClientEditor = lazy(() => import('./features/clients').then(m => m.ClientEditor));
const ClientList = lazy(() => import('./features/clients').then(m => m.ClientList));
const LoansList = lazy(() => import('./features/loans').then(m => m.LoansList));
const LoansEditor = lazy(() => import('./features/loans').then(m => m.LoansEditor));
const LoansAdd = lazy(() => import('./features/loans').then(m => m.LoansAdd));

const App = () => {
  const context = useContext(UserContext);
  const { role } = context;

  return (
    <>
      <ReactNotification />
      {role && <Sidebar />}
      <Suspense fallback={<div>Loading</div>}>
        <Page>
          <GlobalStyle />
          <Switch>
            <NoAuthRoute exact path={routesScheme.auth} component={Authentication} />
            <AuthRoute exact path="/" component={App} />
            <AuthRoute exact path={routesScheme.profile} component={Profile} />
            <AuthRoleRoute
              accessRole="admin"
              exact
              path={routesScheme.managers}
              component={ManagersList}
            />
            <AuthRoleRoute
              accessRole="admin"
              exact
              path={routesScheme.managersAdd}
              component={ManagersEditor}
            />
            <AuthRoleRoute
              accessRole="admin"
              exact
              path={routesScheme.managersIdRoute}
              component={ManagersEditor}
            />
            <AuthRoute exact path={routesScheme.clients} component={ClientList} />
            <AuthRoleRoute
              accessRole="manager"
              exact
              path={routesScheme.clientsAdd}
              component={ClientEditor}
            />
            <AuthRoute exact path={routesScheme.clientsIdRoute} component={ClientEditor} />
            <AuthRoleRoute
              accessRole="admin"
              exact
              path={routesScheme.loans}
              component={LoansList}
            />
            <AuthRoleRoute
              accessRole="manager"
              exact
              path={routesScheme.loansAdd}
              component={LoansAdd}
            />
            <AuthRoleRoute
              accessRole="admin"
              exact
              path={routesScheme.loansIdRoute}
              component={LoansEditor}
            />
            <Route component={NoMatch} />
          </Switch>
        </Page>
      </Suspense>
    </>
  );
};

export default App;
