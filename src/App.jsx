import React, { useCallback, useContext } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';

import { GlobalStyle, Page } from './styles';
import { Clients, Loans, Managers, Profile } from './containers';
import { AuthRoleRoute, AuthRoute, NoAuthRoute, routesScheme } from './routing';
import Sidebar from './components/Sidebar';
import { NoMatch } from './components/ErrorPages';
import { logOut } from './features/authentication/api';
import { UserContext } from './core';
import Authentication from './features/authentication';

const App = () => {
  const history = useHistory();
  const context = useContext(UserContext);
  const { role, updateUserRole } = context;

  const onLogOut = useCallback(() => {
    logOut().then(() => {
      history.push(routesScheme.auth);
      updateUserRole('');
    });
  }, []);

  return (
    <>
      <ReactNotification />
      {role && <Sidebar onLogOut={onLogOut} role={role} />}
      <Page>
        <GlobalStyle />
        <Switch>
          <NoAuthRoute exact path={routesScheme.auth} component={Authentication} />
          <AuthRoute exact path="/" component={App} />
          <AuthRoute exact path="/profile" component={Profile} />
          <AuthRoleRoute
            accessRole="admin"
            exact
            path="/managers"
            component={Managers.List}
          />
          <AuthRoleRoute
            accessRole="admin"
            exact
            path="/managers/add"
            component={Managers.Editor}
          />
          <AuthRoleRoute
            accessRole="admin"
            exact
            path="/managers/:id"
            component={Managers.Editor}
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