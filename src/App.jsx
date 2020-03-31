import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';

import { GlobalStyle, Page } from './styles';
import { Clients, Loans } from './containers';
import { AuthRoleRoute, AuthRoute, NoAuthRoute, routesScheme } from './routing';
import Sidebar from './components/Sidebar';
import { NoMatch } from './components/ErrorPages';
import { UserContext } from './core';
import Authentication from './features/authentication';
import Profile from './features/profile';
import { ManagersList, ManagersEditor } from './features/managers';

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
            path={routesScheme.managersId}
            component={ManagersEditor}
          />
          <AuthRoute exact path="/clients" component={Clients.List} />
          <AuthRoleRoute
            accessRole="manager"
            exact
            path="/clients/add"
            component={Clients.Editor}
          />
          <AuthRoute exact path="/clients/:id" component={Clients.Editor} />
          <AuthRoleRoute
            accessRole="admin"
            exact
            path="/loans"
            component={Loans.List}
          />
          <AuthRoleRoute
            accessRole="manager"
            exact
            path="/loans/add"
            component={Loans.Add}
          />
          <AuthRoleRoute
            accessRole="admin"
            exact
            path="/loans/:id"
            component={Loans.Editor}
          />
          <Route component={NoMatch} />
        </Switch>
      </Page>
    </>
  );
};

export default App;
