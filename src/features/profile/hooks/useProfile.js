import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { store } from 'react-notifications-component';
import { useForm } from 'react-hook-form';

import {
  getProfileUser,
  updateProfileUser,
  updatePasswordsProfileUser,
} from '../api';
import { localDb, notification, passwords } from '../../../services';
import { UserContext } from '../../../core';
import TERRITORIES from '../../../constants';
import { adminValidation, managerValidation } from '../validations';

const successfulNotification = 'SuccessfulChangingPassword';
const failureNotification = 'FailureChangingPassword';

const useProfile = () => {
  const [userId, setUserId] = useState(null);
  const [selectedTerritory, setSelectedTerritory] = useState({});
  const context = useContext(UserContext);
  const { role } = context;

  const useFormProps = useForm({
    validationSchema: role === 'admin' ? adminValidation : managerValidation,
    mode: 'onBlur',
  });
  const { setValue } = useFormProps;

  useEffect(() => {
    const { id } = localDb.getDataAuthUser();

    setUserId(id);

    getProfileUser(role, id).then((result) => {
      const { data } = result;
      if (data.territory) {
        const profileData = {
          data,
          selectedTerritory: TERRITORIES
            .find((territory) => +territory.value === data.territory),
        };

        setValue(profileData);
      } else {
        setValue(data);
      }
    });
  }, [userId]);

  const saveData = useCallback((data) => {
    // if (!this.validatorProfile.allValid()) {
    //   return;
    // }

    const { login } = data;

    let body = {
      login,
    };
    if (role === 'manager') {
      const {
        fullName, phone, email,
      } = data;
      const { value: territory } = selectedTerritory;
      body = {
        ...body,
        fullName,
        territory,
        phone,
        email,
      };
    }

    updateProfileUser(role, userId, body);
  });

  const changePassword = useCallback((data) => {
    const {
      oldPassword,
      newPassword,
      confirmNewPassword,
    } = data;

    // const builtNotification = passwords.validatePasswords(
    //   oldPassword,
    //   newPassword,
    //   confirmNewPassword,
    // );
    // if (builtNotification) {
    //   this.notificationDOMRef.current.addNotification(builtNotification);
    //
    //   return;
    // }

    const body = {
      oldPassword,
      newPassword,
      confirmNewPassword,
    };

    updatePasswordsProfileUser(role, userId, body)
      .then((result) => {
        const builtNotification = notification.buildNotification(
          result.message,
          successfulNotification,
        );
        store.addNotification(builtNotification);
      })
      .catch((err) => {
        const { errors } = JSON.parse(err.message);
        errors.forEach((error) => {
          const { msg: message } = error;
          const builtNotification = notification.buildNotification(message, failureNotification);
          store.addNotification(builtNotification);
        });
      });
  });

  const changeSelectedTerritory = useCallback((territory) => {
    setSelectedTerritory(territory);
  }, [selectedTerritory]);

  return [
    changePassword,
    saveData,
    selectedTerritory,
    changeSelectedTerritory,
    useFormProps,
  ];
};

export default useProfile;
