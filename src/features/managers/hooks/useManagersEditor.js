import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { store } from 'react-notifications-component';

import { transformResponse, useInitForm } from '../../../core';
import { getManager, saveManager } from '../api';
import { notification } from '../../../services';
import TERRITORIES from '../../../constants';
import { managerSchema } from '../validation';

const failureNotificationType = 'FailureEditingManager';
const successfulNotificationType = 'SuccessfulEditingManager';

/**
 * @return {Array}
 */
const useManagersEditor = () => {
  const [useFormProps] = useInitForm({
    validationSchema: managerSchema,
    defaultValues: {
      email: '',
      phone: '',
      fullName: '',
      isBlocked: false,
      login: '',
      selectedTerritory: {},
    },
    registerValues: ['selectedTerritory'],
  });
  const { setValue } = useFormProps;
  const [action, setAction] = useState(null);
  const [selectedTerritory, setSelectedTerritory] = useState({});
  const { id: managerId } = useParams();

  useEffect(() => {
    if (managerId) {
      getManager(managerId).then(result => {
        const { territory, ...restData } = result.data;
        const values = transformResponse(restData);

        setAction('edit');
        setValue([...values]);
        setSelectedTerritory(TERRITORIES.find(e => +e.value === territory));
      });
    }
  }, [managerId]);

  const updateSelectedTerritory = useCallback(territory => {
    setSelectedTerritory(territory);
  }, []);

  const saveManagerData = useCallback(
    data => {
      const {
        email,
        fullName,
        login,
        password,
        phone,
        selectedTerritory: { value: territory },
      } = data;

      const body = {
        login,
        fullName,
        territory,
        password,
        phone,
        email,
      };

      const func = action === 'edit' ? saveManager(body, managerId) : saveManager(body);

      return func
        .then(() => {
          const message =
            action === 'edit'
              ? 'Manager was updated successfully'
              : 'Manager was created successfully';
          const builtNotification = notification.buildNotification(
            message,
            successfulNotificationType,
          );
          if (builtNotification) {
            store.addNotification(builtNotification);
          }
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
    [action],
  );

  const handleSelectedTerritory = useCallback(territory => {
    setValue('selectedTerritory', territory);
    updateSelectedTerritory(territory);
  }, []);

  return [action, selectedTerritory, saveManagerData, useFormProps, handleSelectedTerritory];
};

export default useManagersEditor;
