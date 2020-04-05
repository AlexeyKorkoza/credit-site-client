import { useCallback, useContext, useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import { useParams, useHistory } from 'react-router';

import TERRITORIES from '../../../constants';
import { notification } from '../../../services';
import {
  deleteClient,
  getClient,
  markClientForDeletion,
  saveClient,
} from '../api';
import { UserContext } from '../../../core';
import { routesScheme } from '../../../routing';

const failureNotificationType = 'FailureEditingClient';
const successfulNotificationType = 'SuccessfulEditingClient';

const useClientEditor = () => {
  const [clientData, setClientData] = useState({});
  const [selectedTerritory, setSelectedTerritory] = useState({});
  const context = useContext(UserContext);
  const history = useHistory();
  const params = useParams();
  const { role } = context;

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      const { id: clientId } = params;

      getClient(clientId).then((result) => {
        const { client } = result;

        setClientData({
          ...client,
          action: 'edit',
          clientId,
          selectedTerritory: TERRITORIES.find((e) => +e.value === +client.territory),
        });
      });
    } else {
      setClientData({
        action: 'add',
      });
    }
  });

  const changeSelectedTerritory = useCallback((territory) => {
    setSelectedTerritory(territory);
  }, []);

  const handleDeleteClient = useCallback(() => {
    const { clientId } = clientData;

    return deleteClient(clientId)
      .then(() => {
        const message = 'Client was deleted successfully';
        const builtNotification = notification.buildNotification(
          message,
          successfulNotificationType,
        );
        if (builtNotification) {
          store.addNotification(builtNotification);
        }

        history.push(routesScheme.clients);
      })
      .catch((error) => {
        const { message } = error;
        const builtNotification = notification.buildNotification(message, failureNotificationType);
        if (builtNotification) {
          store.addNotification(builtNotification);
        }
      });
  });

  const handleMarkClientForDeletion = useCallback(() => {
    const { clientId } = clientData;

    return markClientForDeletion(clientId)
      .then(() => {
        const message = 'Client was deleted successfully';
        const buildNotification = notification.buildNotification(
          message,
          successfulNotificationType,
        );
        if (buildNotification) {
          store.addNotification(buildNotification);
        }
      })
      .catch((error) => {
        const { message } = error;
        const buildNotification = notification.buildNotification(message, failureNotificationType);
        if (buildNotification) {
          store.addNotification(buildNotification);
        }
      });
  });

  const handleSaveClient = useCallback((data) => {
    // if (!this.validator.allValid()) {
    //   return;
    // }

    const {
      action,
      email,
      name,
      clientId,
      passportData,
      phone,
    } = data;

    const body = {
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

    const func = action === 'edit' ? saveClient(body, +clientId) : saveClient(body);

    return func
      .then(() => {
        const message = action === 'edit' ? 'Client was updated successfully' : 'Client was created successfully';
        const builtNotification = notification.buildNotification(
          message,
          successfulNotificationType,
        );
        if (builtNotification) {
          store.addNotification(builtNotification);
        }
        history.push(routesScheme.clients);
      })
      .catch((error) => {
        const { message } = error;
        const builtNotification = notification.buildNotification(message, failureNotificationType);
        if (builtNotification) {
          store.addNotification(builtNotification);
        }
      });
  });

  return [
    clientData,
    selectedTerritory,
    changeSelectedTerritory,
    handleDeleteClient,
    handleMarkClientForDeletion,
    handleSaveClient,
  ];
};

export default useClientEditor;
