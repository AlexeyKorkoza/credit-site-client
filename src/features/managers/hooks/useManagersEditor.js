import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { store } from 'react-notifications-component';

import { getManager, saveManager } from '../api';
import { notification, passwords } from '../../../services';
import TERRITORIES from '../../../constants';

const failureNotificationType = 'FailureEditingManager';
const successfulNotificationType = 'SuccessfulEditingManager';

const useManagersEditor = () => {
  const [selectedTerritory, setSelectedTerritory] = useState({});
  const [managerData, setManagerData] = useState({
    action: 'add',
    email: '',
    fullName: '',
    login: '',
    phone: '',
    isBlocked: false,
    password: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    managerId: null,
  });
  const { id: managerId } = useParams();

  useEffect(() => {
    if (managerId) {
      getManager(managerId).then((result) => {
        const { territory } = result.data;

        setManagerData((state) => ({
          ...state,
          ...result.data,
          action: 'edit',
          managerId,
          selectedTerritory: TERRITORIES.find((e) => +e.value === territory),
        }));
      });
    }
  }, []);

  const updateSelectedTerritory = useCallback(
    (territory) => {
      setSelectedTerritory(territory);
    },
    [],
  );

  const blockManager = useCallback(() => {
    blockManager(managerId);
  }, []);

  const saveManagerData = useCallback((data) => {
    const {
      action,
      email,
      fullName,
      login,
      password,
      phone,
    } = data;
    const { value: territory } = selectedTerritory;

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
        const message = action === 'edit'
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
      .catch((error) => {
        const { message } = error;
        const builtNotification = notification.buildNotification(message, failureNotificationType);
        if (builtNotification) {
          store.addNotification(builtNotification);
        }
      });
  }, []);

  // onChangePassword = event => {
  //   event.preventDefault();
  //
  //   const {
  //     oldPassword,
  //     managerId,
  //     newPassword,
  //     confirmNewPassword,
  //     failureNotificationType,
  //     successfulNotificationType,
  //   } = this.state;
  //
  //   const builtNotification = passwords.validatePasswords(
  //     oldPassword,
  //     newPassword,
  //     confirmNewPassword,
  //   );
  //   if (builtNotification) {
  //     this.notificationDOMRef.current.addNotification(builtNotification);
  //
  //     return;
  //   }
  //
  //   const body = {
  //     oldPassword,
  //     newPassword,
  //     confirmNewPassword,
  //   };
  //
  //   return profile
  //     .updatePasswordsProfileUser('manager', managerId, body)
  //     .then(result => {
  //       const builtNotification = notification.buildNotification(
  //         result.message,
  //         successfulNotificationType,
  //       );
  //       this.notificationDOMRef.current.addNotification(builtNotification);
  //     })
  //     .catch(err => {
  //       const { errors } = JSON.parse(err.message);
  //       errors.forEach(item => {
  //         const { msg: message } = item;
  //         const builtNotification = notification.buildNotification(
  //           message,
  //           failureNotificationType,
  //         );
  //         this.notificationDOMRef.current.addNotification(builtNotification);
  //       });
  //     });
  // };

  return [managerData, selectedTerritory, updateSelectedTerritory, blockManager, saveManagerData];
};

export default useManagersEditor;
