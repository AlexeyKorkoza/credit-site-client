import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { GlobalStyle, Page } from './styles';
import { Authentication, Clients, Loans, Managers, Profile } from '../containers';
import Private from '../routing';
import { authentication } from '../api';
import Sidebar from './Sidebar';
import { NoMatch } from './ErrorPages';

class App extends Component {
    state = {
        role: '',
    };

    static propTypes = {
        history: ReactRouterPropTypes.history.isRequired,
    };

    componentDidMount() {
        authentication.currentUserSubject.subscribe(result => {
            if (!result) {
                this.setState({ role: '' });

                return;
            }

            const { role } = result;
            this.setState({ role });
        });
    }

    onLogOut = () => {
        authentication.logOut().then(() => {
            const { history } = this.props;
            history.push('/auth')
        });
    };

    render() {
        const { role } = this.state;

        return (
          <Fragment>
            {role && (
              <Sidebar
                onLogOut={this.onLogOut}
                role={role}
              />
            )}
            <Page>
              <GlobalStyle />
              <Switch>
                <Route path="/auth" component={Authentication} />
                <Private.PrivateRouter exact path="/" component={App} />
                <Private.PrivateRouter exact path="/profile" component={Profile} />
                <Private.PrivateRouterRole
                  accessRole="admin"
                  exact
                  path="/managers"
                  component={Managers.List}
                />
                <Private.PrivateRouterRole
                  accessRole="admin"
                  exact
                  path="/managers/add"
                  component={Managers.Editor}
                />
                <Private.PrivateRouterRole
                  accessRole="admin"
                  exact
                  path="/managers/:id"
                  component={Managers.Editor}
                />
                <Private.PrivateRouter exact path="/clients" component={Clients.List} />
                <Private.PrivateRouterRole
                  accessRole='manager'
                  exact
                  path="/clients/add"
                  component={Clients.Editor}
                />
                <Private.PrivateRouter exact path="/clients/:id" component={Clients.Editor} />
                <Private.PrivateRouterRole
                  accessRole='admin'
                  exact
                  path="/loans"
                  component={Loans.List}
                />
                <Private.PrivateRouterRole
                  accessRole='manager'
                  exact
                  path="/loans/add"
                  component={Loans.Add}
                />
                <Private.PrivateRouterRole
                  accessRole='admin'
                  exact
                  path="/loans/:id"
                  component={Loans.Editor}
                />
                <Route component={NoMatch} />
              </Switch>
            </Page>
          </Fragment>
        );
    }
}

export default withRouter(App);
