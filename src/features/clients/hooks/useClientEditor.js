import { useCallback, useContext, useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import { useParams, useHistory } from 'react-router';

import TERRITORIES from '../../../constants';
import { notification } from '../../../services';
import { deleteClient, getClient, markClientForDeletion, saveClient } from '../api';
import { transformToValidFormat, useInitForm, UserContext } from '../../../core';
import { routesScheme } from '../../../routing';
import { clientSchema } from '../validation';

const failureNotificationType = 'FailureEditingClient';
const successfulNotificationType = 'SuccessfulEditingClient';

const useClientEditor = () => {
  const [formProps] = useInitForm({
    validationSchema: clientSchema,
    defaultValues: {
      name: '',
      selectedTerritory: {},
      email: '',
      phone: '',
      action: '',
      passportData: '',
      isRemoved: false,
    },
    registerValues: ['selectedTerritory'],
  });
  const { setValue } = formProps;
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const [action, setAction] = useState(null);

  const context = useContext(UserContext);
  const { role } = context;
  const history = useHistory();
  const { id: clientId } = useParams();

  useEffect(() => {
    if (clientId) {
      getClient(clientId).then(result => {
        const { territory, isRemoved, ...restData } = result.client;
        const values = transformToValidFormat(restData);

        setAction('edit');
        setValue([...values]);
        setSelectedTerritory(TERRITORIES.find(e => +e.value === territory));
      });
    } else {
      setAction('add');
    }
  }, [clientId]);

  const changeSelectedTerritory = useCallback(territory => {
    setSelectedTerritory(territory);
  }, []);

  const handleDeleteClient = useCallback(() => {
    deleteClient(clientId)
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
      .catch(error => {
        const { message } = error;
        const builtNotification = notification.buildNotification(message, failureNotificationType);
        if (builtNotification) {
          store.addNotification(builtNotification);
        }
      });
  }, [clientId]);

  const handleMarkClientForDeletion = useCallback(
    data => {
      const { isRemoved } = data;

      markClientForDeletion(clientId, isRemoved)
        .then(() => {
          const message = `Client was ${
            isRemoved ? 'marked' : 'unmarked'
          } for deletion successfully`;
          const buildNotification = notification.buildNotification(
            message,
            successfulNotificationType,
          );
          if (buildNotification) {
            store.addNotification(buildNotification);
          }
        })
        .catch(error => {
          const { message } = error;
          const buildNotification = notification.buildNotification(
            message,
            failureNotificationType,
          );
          if (buildNotification) {
            store.addNotification(buildNotification);
          }
        });
    },
    [clientId],
  );

  const handleSaveClient = useCallback(
    data => {
      const { email, name, passportData, phone } = data;

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
          const message =
            action === 'edit'
              ? 'Client was updated successfully'
              : 'Client was created successfully';
          const builtNotification = notification.buildNotification(
            message,
            successfulNotificationType,
          );
          if (builtNotification) {
            store.addNotification(builtNotification);
          }
          history.push(routesScheme.clients);
        })
        .catch(error => {
          const { message } = error;
          const builtNotification = notification.buildNotification(
            message,
            failureNotificationType,
          );
          if (builtNotification) {
            store.addNotification(builtNotification);
          }
        });
    },
    [action, clientId, selectedTerritory],
  );

  return [
    action,
    role,
    selectedTerritory,
    changeSelectedTerritory,
    handleDeleteClient,
    handleMarkClientForDeletion,
    handleSaveClient,
    formProps,
  ];
};

export default useClientEditor;
