import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { GlobalStyle, Page } from './styles';
import {
  Authentication, Clients, Loans, Managers, Profile,
} from '../containers';
import { AuthRoleRoute, AuthRoute } from '../routing';
import { authentication } from '../api';
import Sidebar from './Sidebar';
import { NoMatch } from './ErrorPages';

const App = () => {
  const [role, setRole] = useState('');
  const history = useHistory();

  useEffect(() => {
    authentication.currentUserSubject.subscribe((result) => {
      if (result) {
        setRole({ role: result.role });
      }
    });

    return function cleanup() {
      authentication.currentUserSubject.unsubscribe();
    };
  });

  const onLogOut = useCallback(() => {
    authentication.logOut().then(() => {
      history.push('/auth');
    });
  }, []);

  return (
    <>
      {role && <Sidebar onLogOut={onLogOut} role={role} />}
      <Page>
        <GlobalStyle />
        <Switch>
          <Route path="/auth" component={Authentication} />
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
