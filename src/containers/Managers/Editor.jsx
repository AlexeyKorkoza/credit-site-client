import React, { Component, Fragment } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import ReactNotification from 'react-notifications-component';
import ReactRouterPropTypes from 'react-router-prop-types';

import { Editor as EditorComponent } from '../../components/Managers';
import { managers, profile } from '../../api';
import { notification, passwords } from '../../services';
import { Validator } from '../../shared';
import TERRITORIES from '../../constants';

class Editor extends Component {
    notificationDOMRef = React.createRef();
    validator = new SimpleReactValidator({
        element: message => <Validator>{message}</Validator>
    });

    state = {
        action: '',
        email: '',
        fullName: '',
        login: '',
        phone: '',
        isBlocked: false,
        password: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        territories: TERRITORIES,
        managerId: null,
        selectedTerritory: {},
        failureNotificationType: 'FailureEditingManager',
        successfulNotificationType: 'SuccessfulEditingManager',
    };

    static propTypes = {
        match: ReactRouterPropTypes.match.isRequired,
    };

    componentDidMount() {
        const {
            match: {
                params,
            },
        } = this.props;

        if (Object.keys(params).length > 0) {
            const { id: managerId } = params;

            managers.getManager(managerId)
                .then(result => {
                    const { territory } = result.data;
                    const { territories } = this.state;
                    const selectedTerritory = territories.find(e => +e.value === territory);

                    this.setState({
                        ...result.data,
                        action: 'edit',
                        managerId,
                        selectedTerritory,
                    });
                })
        } else {
            this.setState({
                action: 'add',
            });
        }

    }

    onBlockManager = event => {
        event.preventDefault();

        const { isBlocked, managerId } = this.state;

        return managers.blockManager(managerId)
            .then(() => {
                this.setState({ isBlocked: !isBlocked });
            });
    };

    onChangeInput = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    onSave = event => {
        event.preventDefault();

        if (!this.validator.allValid()) {
            return;
        }

        const {
            action,
            email,
            fullName,
            login,
            managerId,
            password,
            phone,
            selectedTerritory,
            failureNotificationType,
            successfulNotificationType,
        } = this.state;
        const { value: territory } = selectedTerritory;

        let body = {
            login,
            fullName,
            territory,
            password,
            phone,
            email
        };

        const func = action === 'edit'
            ? managers.saveManager(body, managerId)
            : managers.saveManager(body);

        return func
            .then(() => {
                const message = action === 'edit'
                    ? 'Manager was updated successfully'
                    : 'Manager was created successfully';
                const builtNotification = notification.buildNotification(message, successfulNotificationType);
                if (builtNotification) {
                    this.notificationDOMRef.current.addNotification(builtNotification);
                }
            })
            .catch(error => {
                const { message } = error;
                const builtNotification = notification.buildNotification(message, failureNotificationType);
                if (builtNotification) {
                    this.notificationDOMRef.current.addNotification(builtNotification);
                }
            })
    };

    onChangePassword = event => {
        event.preventDefault();

        const {
            oldPassword,
            managerId,
            newPassword,
            confirmNewPassword,
            failureNotificationType,
            successfulNotificationType,
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

        return profile.updatePasswordsProfileUser('manager', managerId, body)
            .then(result => {
                const builtNotification = notification.buildNotification(result.message, successfulNotificationType);
                this.notificationDOMRef.current.addNotification(builtNotification);
            })
            .catch(err => {
                const { errors } = JSON.parse(err.message);
                errors.forEach(item => {
                    const { msg: message } = item;
                    const builtNotification = notification.buildNotification(message, failureNotificationType);
                    this.notificationDOMRef.current.addNotification(builtNotification);
                });
            });
    };

    onChangeTerritory = selectedTerritory => {
        this.setState({
            selectedTerritory,
        });
    };

    render() {
        return (
          <Fragment>
            <ReactNotification ref={this.notificationDOMRef} />
            <EditorComponent
              data={this.state}
              onBlockManager={this.onBlockManager}
              onChangeInput={this.onChangeInput}
              onChangePassword={this.onChangePassword}
              onChangeTerritory={this.onChangeTerritory}
              onSave={this.onSave}
              validator={this.validator}
            />
          </Fragment>
        );
    }
}

export default Editor;
