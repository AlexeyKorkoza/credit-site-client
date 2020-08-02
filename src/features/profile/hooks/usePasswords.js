import { useCallback, useContext, useEffect } from 'react';
import { store } from 'react-notifications-component';

import { getProfileUser, updatePasswordsProfileUser } from '../api';
import { localDb, notification } from '../../../services';
import { transformToValidFormat, UserContext, useInitForm } from '../../../core';
import TERRITORIES from '../../../constants';
import { passwordsValidation } from '../validations';

const successfulNotification = 'SuccessfulChangingPassword';
const failureNotification = 'FailureChangingPassword';

const usePasswords = () => {
  const context = useContext(UserContext);
  const { role } = context;
  const { id: userId } = localDb.getDataAuthUser();

  const [useFormProps] = useInitForm({
    validationSchema: passwordsValidation,
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const { setValue } = useFormProps;

  useEffect(() => {
    getProfileUser(role, userId).then(result => {
      const { data } = result;
      if (data.territory) {
        const profileData = {
          data,
          selectedTerritory: TERRITORIES.find(territory => +territory.value === data.territory),
        };

        const transformedProfileData = transformToValidFormat(profileData);
        setValue([...transformedProfileData]);
      } else {
        const transformedData = transformToValidFormat(data);
        setValue([...transformedData]);
      }
    });
  }, [userId]);

  const changePassword = useCallback(data => {
    const { oldPassword, newPassword, confirmNewPassword } = data;

    const body = {
      oldPassword,
      newPassword,
      confirmNewPassword,
    };

    updatePasswordsProfileUser(role, userId, body)
      .then(result => {
        const builtNotification = notification.buildNotification(
          result.message,
          successfulNotification,
        );
        store.addNotification(builtNotification);
      })
      .catch(err => {
        const { errors } = JSON.parse(err.message);
        errors.forEach(error => {
          const { msg: message } = error;
          const builtNotification = notification.buildNotification(message, failureNotification);
          store.addNotification(builtNotification);
        });
      });
  }, []);

  return [changePassword, useFormProps];
};

export default usePasswords;
