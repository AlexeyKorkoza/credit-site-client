import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import ReactNotification from 'react-notifications-component';
import ReactRouterPropTypes from 'react-router-prop-types';

import { authentication } from '../../api';
import AuthenticationForm from '../../components/Authentication';
import { localDb, notification } from '../../services';
import { Validator } from '../../shared';

class Authentication extends Component {
    notificationDOMRef = React.createRef();
    validator = new SimpleReactValidator({
        element: message => <Validator>{message}</Validator>
    });

    state = {
        login: '',
        password: '',
        selectedRole: null,
        roles: [
            {
                label: 'admin',
                value: 'admin',
            },
            {
                label: 'manager',
                value: 'manager',
            },
        ],
        isActiveModal: false,
        notificationType: "Sign In"
    };

    static propTypes = {
        history: ReactRouterPropTypes.history.isRequired,
    };

    componentDidMount() {
        this.isAuthUser();
    }

    onInputChange = e => {
        const target = e.target;
        const { value, name } = target;

        this.setState({
            [name]: value,
        });
    };

    onSelectChange = selectedRole => {
        this.setState({
            selectedRole,
        });
    };

    onSubmit = event => {
        event.preventDefault();

        if (!this.validator.allValid()) {
            this.validator.showMessages();

            return;
        }

        const {
            login,
            notificationType,
            password,
            selectedRole,
        } = this.state;
        const { value: role } = selectedRole;

        const data = {
            login,
            password,
            role,
        };

        authentication.logIn(data)
            .then(result => {
                localDb.authUser(result);

                const { history } = this.props;
                history.push('/profile');
            })
            .catch(error => {
                const { message } = error;
                const builtNotification = notification.buildNotification(message, notificationType);
                if (builtNotification) {
                    this.notificationDOMRef.current.addNotification(builtNotification);
                }
            });
    };

    isAuthUser = () => {
        const data = localDb.getDataAuthUser();

        if (!data) {
            this.setState({
                isActiveModal: true,
            });
        }
    };

    render() {
        const {
            login,
            password,
            selectedRole,
            roles,
            isActiveModal,
        } = this.state;

        return (
          <Fragment>
            <ReactNotification ref={this.notificationDOMRef} />
            <AuthenticationForm
              login={login}
              password={password}
              selectedRole={selectedRole}
              roles={roles}
              onInputChange={this.onInputChange}
              onSelectChange={this.onSelectChange}
              onSubmit={this.onSubmit}
              isActiveModal={isActiveModal}
              validator={this.validator}
            />
          </Fragment>
        );
    }
}

export default withRouter(Authentication);
