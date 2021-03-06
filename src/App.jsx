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
const ManagersList = lazy(() => import('./features/managers/components/List'));
const ManagersEditor = lazy(() => import('./features/managers/components/Editor'));
const ClientEditor = lazy(() => import('./features/clients/components/Editor'));
const ClientList = lazy(() => import('./features/clients/components/List'));
const LoansList = lazy(() => import('./features/loans/components/List'));
const LoansEditor = lazy(() => import('./features/loans/components/Editor'));
const LoansAdd = lazy(() => import('./features/loans/components/Add'));

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
