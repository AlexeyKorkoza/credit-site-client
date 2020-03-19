import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';

import { logIn } from '../api';
import { localDb, notification } from '../../../services';
import { UserContext } from '../../../core';

const NOTIFICATION_TYPE = 'Sign In';

const useAuthentication = () => {
  const history = useHistory();
  const context = useContext(UserContext);
  const { role, updateUserRole } = context;
  const [isActiveModal, setIsActiveModal] = useState(false);
  // const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    setIsActiveModal(!(role));
  }, [role]);

  const onSubmit = useCallback((data) => {
    const {
      login, password, selectedRole,
    } = data;
    const { value } = selectedRole;

    const body = {
      login,
      password,
      role: value,
    };

    logIn(body)
      .then((result) => {
        localDb.authUser(result);

        updateUserRole(value);

        history.push('/profile');
      })
      .catch((error) => {
        const { message } = error;
        const builtNotification = notification.buildNotification(message, NOTIFICATION_TYPE);
        if (builtNotification) {
          store.addNotification(builtNotification);
        }
      });
  });

  return [
    isActiveModal,
    onSubmit,
  ];
};

export default useAuthentication;
