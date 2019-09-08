import React, { Component, Fragment } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import ReactNotification from 'react-notifications-component';

import { Admin, Manager } from '../../components/Profile';
import { profile } from '../../api';
import { localDb, notification, passwords } from '../../services';
import { Validator } from '../../shared';
import TERRITORIES from '../../constants';

const rolesComponents = {
    'admin': Admin,
    'manager': Manager,
};

export default class Profile extends Component {
    validatorProfile = new SimpleReactValidator({
        element: message => <Validator>{message}</Validator>
    });
    notificationDOMRef = React.createRef();

    state = {
        role: '',
        fullName: '',
        phone: '',
        login: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        successfulNotification: 'SuccessfulChangingPassword',
        failureNotification: 'FailureChangingPassword',
        confirmNewPassword: '',
        territories: TERRITORIES,
        selectedTerritory: {},
    };

    componentDidMount() {
        const { role, id } = localDb.getDataAuthUser();

        this.setState({ role, id });

        profile.getProfileUser(role, id)
            .then(result => {
                const { data } = result;
                if (data.territory) {
                    const { territories } = this.state;
                    const selectedTerritory = territories.find(e => +e.value === data.territory);
                    this.setState({ ...data, selectedTerritory });
                } else {
                    this.setState({ ...data });
                }
            });
    }

    onChangeInput = e => {
        const target = e.target;
        const { value, name } = target;

        this.setState({
            [name]: value,
        });
    };

    onSave = event => {
        event.preventDefault();

        if (!this.validatorProfile.allValid()) {
            return;
        }

        const { role, id, login } = this.state;

        let body = {
            login,
        };
        if (role === 'manager') {
            const {
                fullName,
                phone,
                email,
                selectedTerritory,
            } = this.state;
            const { value: territory } = selectedTerritory;
            body = Object.assign({}, body, {
                fullName,
                territory,
                phone,
                email
            });
        }

        return profile.updateProfileUser(role, id, body);
    };

    onChangePassword = event => {
        event.preventDefault();

        const {
            role,
            id,
            oldPassword,
            newPassword,
            successfulNotification,
            failureNotification,
            confirmNewPassword,
        } = this.state;

        const builtNotification = passwords.validatePasswords(oldPassword, newPassword, confirmNewPassword);
        if (builtNotification) {
            this.notificationDOMRef.current.addNotification(builtNotification);

            return;
        }

        const body = {
            oldPassword,
            newPassword,
            confirmNewPassword,
        };

        return profile.updatePasswordsProfileUser(role, id, body)
            .then(result => {
                const builtNotification = notification.buildNotification(result.message, successfulNotification);
                this.notificationDOMRef.current.addNotification(builtNotification);
            })
            .catch(err => {
                const { errors } = JSON.parse(err.message);
                errors.forEach(item => {
                    const { msg: message } = item;
                    const builtNotification = notification.buildNotification(message, failureNotification);
                    this.notificationDOMRef.current.addNotification(builtNotification);
                })
            });
    };

    onChangeTerritory = selectedTerritory => {
        this.setState({
            selectedTerritory,
        });
    };

    render() {
        const { role } = this.state;

        if (!role) {
            return null;
        }

        const Component = rolesComponents[role];

        return (
          <Fragment>
            <ReactNotification ref={this.notificationDOMRef} />
            <Component
              onSave={this.onSave}
              onChangePassword={this.onChangePassword}
              onChangeTerritory={this.onChangeTerritory}
              onChangeInput={this.onChangeInput}
              data={this.state}
              validatorProfile={this.validatorProfile}
            />
          </Fragment>
        );
    }
}
