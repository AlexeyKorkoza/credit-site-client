import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';

import { GlobalStyle, Page } from './styles';
import { AuthRoleRoute, AuthRoute, NoAuthRoute, routesScheme } from './routing';
import Sidebar from './shared/Sidebar';
import { NoMatch } from './shared/ErrorPages';
import { UserContext } from './core';
import Authentication from './features/authentication';
import Profile from './features/profile';
import { ManagersList, ManagersEditor } from './features/managers';
import { ClientEditor, ClientList } from './features/clients';
import { LoansList, LoansEditor, LoansAdd } from './features/loans';

const App = () => {
  const context = useContext(UserContext);
  const { role } = context;

  return (
    <>
      <ReactNotification />
      {role && <Sidebar />}
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
          <AuthRoleRoute accessRole="admin" exact path={routesScheme.loans} component={LoansList} />
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
    </>
  );
};

export default App;
