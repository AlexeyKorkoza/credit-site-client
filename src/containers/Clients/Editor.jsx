import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import SimpleReactValidator from 'simple-react-validator';
import ReactNotification from 'react-notifications-component';
import ReactRouterPropTypes from 'react-router-prop-types';

import { Editor as EditorComponent } from '../../components/Clients';
import { clients } from '../../api';
import { localDb, notification } from '../../services';
import { Validator } from '../../shared';
import TERRITORIES from '../../constants';

class Editor extends Component {
    notificationDOMRef = React.createRef();
    timer = null;
    validator = new SimpleReactValidator({
        element: message => <Validator>{message}</Validator>
    });

    state = {
        action: '',
        clientId: null,
        email: '',
        name: '',
        passportData: '',
        phone: '',
        role: '',
        selectedTerritory: {},
        territories: TERRITORIES,
        failureNotificationType: 'FailureEditingClient',
        successfulNotificationType: 'SuccessfulEditingClient',
    };

    static propTypes = {
        history: ReactRouterPropTypes.history.isRequired,
        match: ReactRouterPropTypes.match.isRequired,
    };

    componentDidMount() {
        const {
            match: {
                params,
            },
        } = this.props;

        const { role } = localDb.getDataAuthUser();

        if (Object.keys(params).length > 0) {
            const { id: clientId } = params;

            clients.getClient(clientId)
                .then(result => {
                    const { client } = result;
                    const { territories } = this.state;
                    const selectedTerritory = territories.find(e => +e.value === +client.territory);

                    this.setState({
                        ...client,
                        action: 'edit',
                        clientId,
                        role,
                        selectedTerritory,
                    });
                })
        } else {
            this.setState({
                action: 'add',
                role,
            });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    onChangeInput = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    onChangeTerritory = selectedTerritory => {
        this.setState({
            selectedTerritory,
        });
    };

    onDeleteClient = event => {
      event.preventDefault();

      const {
          clientId,
          failureNotificationType,
          successfulNotificationType,
      } = this.state;

      return clients.deleteClient(clientId)
          .then(() => {
              const message = 'Client was deleted successfully';
              const builtNotification = notification.buildNotification(message, successfulNotificationType);
              if (builtNotification) {
                  this.notificationDOMRef.current.addNotification(builtNotification);
              }
              this.timer = setTimeout(() => {
                  const { history } = this.props;
                  history.push('/clients');
              }, 3000);
          })
          .catch(error => {
              const { message } = error;
              const builtNotification = notification.buildNotification(message, failureNotificationType);
              if (builtNotification) {
                  this.notificationDOMRef.current.addNotification(builtNotification);
              }
          });
    };

    onMarkClientForDeletion = event => {
        event.preventDefault();

        const {
            clientId,
            failureNotificationType,
            successfulNotificationType,
        } = this.state;

        return clients.markClientForDeletion(clientId)
            .then(() => {
                const message = 'Client was deleted successfully';
                const buildNotification = notification.buildNotification(message, successfulNotificationType);
                if (buildNotification) {
                    this.notificationDOMRef.current.addNotification(buildNotification);
                }
            })
            .catch(error => {
                const { message } = error;
                const buildNotification = notification.buildNotification(message, failureNotificationType);
                if (buildNotification) {
                    this.notificationDOMRef.current.addNotification(buildNotification);
                }
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
            failureNotificationType,
            name,
            clientId,
            passportData,
            phone,
            role,
            selectedTerritory,
            successfulNotificationType,
        } = this.state;

        let body = {
            name,
            passportData,
            phone,
            email,
        };

        if (role === 'admin' && action === 'edit') {
            const { value: territory } = selectedTerritory;

            body.territory = territory;
        }

        if (role === 'manager' && action === 'add') {
            const { value: territory } = selectedTerritory;

            body.territory = territory;
        }

        const func =  action === 'edit'
            ? clients.saveClient(body, +clientId)
            : clients.saveClient(body);

        return func
            .then(() => {
                const message = action === 'edit'
                    ? 'Client was updated successfully'
                    : 'Client was created successfully';
                const builtNotification = notification.buildNotification(message, successfulNotificationType);
                if (builtNotification) {
                    this.notificationDOMRef.current.addNotification(builtNotification);
                }
                this.timer = setTimeout(() => {
                    const { history } = this.props;
                    history.push('/clients');
                }, 3000);
            })
            .catch(error => {
                const { message } = error;
                const builtNotification = notification.buildNotification(message, failureNotificationType);
                if (builtNotification) {
                    this.notificationDOMRef.current.addNotification(builtNotification);
                }
            });
    };

    render() {
        return (
          <Fragment>
            <ReactNotification ref={this.notificationDOMRef} />
            <EditorComponent
              data={this.state}
              onChangeInput={this.onChangeInput}
              onChangeTerritory={this.onChangeTerritory}
              onDeleteClient={this.onDeleteClient}
              onMarkClientForDeletion={this.onMarkClientForDeletion}
              onSave={this.onSave}
              validator={this.validator}
            />
          </Fragment>
        );
    }
}

export default withRouter(Editor);
