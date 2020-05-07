import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';
import { useForm } from 'react-hook-form';

import { logIn } from '../api';
import { localDb, notification } from '../../../services';
import { UserContext } from '../../../core';
import authenticationSchema from '../validation';
import { routesScheme } from '../../../routing';

const NOTIFICATION_TYPE = 'Sign In';

const useAuthentication = () => {
  const history = useHistory();
  const context = useContext(UserContext);
  const { updateUserRole } = context;

  const useFormProps = useForm({
    validationSchema: authenticationSchema,
    mode: 'onBlur',
  });
  const { register, unregister, setValue, triggerValidation } = useFormProps;

  useEffect(() => {
    register({ name: 'selectedRole' });

    return () => {
      unregister('selectedRole');
    };
  }, [register, unregister]);

  const [selectedRoleInSelect, setSelectedRoleInSelect] = useState(null);

  const onSubmit = useCallback(
    data => {
      const { login, password, selectedRole } = data;
      const { value } = selectedRole;

      const body = {
        login,
        password,
        role: value,
      };

      logIn(body)
        .then(result => {
          localDb.authUser(result);

          updateUserRole(value);

          history.push(routesScheme.profile);
        })
        .catch(error => {
          const { message } = error;
          const builtNotification = notification.buildNotification(message, NOTIFICATION_TYPE);
          if (builtNotification) {
            store.addNotification(builtNotification);
          }
        });
    },
    [selectedRoleInSelect],
  );

  const handleSelectedRole = async role => {
    setValue('selectedRole', role);
    setSelectedRoleInSelect(role);
  };

  const handleSelectBlur = async () => {
    if (!selectedRoleInSelect) {
      await triggerValidation('selectedRole');
    }
  };

  return [selectedRoleInSelect, onSubmit, handleSelectedRole, useFormProps, handleSelectBlur];
};

export default useAuthentication;
