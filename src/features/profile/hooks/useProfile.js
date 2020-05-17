import { useCallback, useContext, useEffect, useState } from 'react';

import { getProfileUser, updateProfileUser } from '../api';
import { localDb } from '../../../services';
import { UserContext, useInitForm } from '../../../core';
import TERRITORIES from '../../../constants';
import { adminValidation, managerValidation } from '../validations';

const useProfile = () => {
  const [selectedTerritory, setSelectedTerritory] = useState({});
  const context = useContext(UserContext);
  const { role } = context;

  const { id: userId } = localDb.getDataAuthUser();

  const [useFormProps] = useInitForm({
    validationSchema: role === 'admin' ? adminValidation : managerValidation,
    defaultValues: {
      fullName: '',
      territory: '',
      phone: '',
      email: '',
      login: '',
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

        setValue(profileData);
      } else {
        setValue(data);
      }
    });
  }, [userId]);

  const saveData = useCallback(data => {
    const { login } = data;

    let body = {
      login,
    };
    if (role === 'manager') {
      const { fullName, phone, email } = data;
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

  const changeSelectedTerritory = useCallback(
    territory => {
      setSelectedTerritory(territory);
    },
    [selectedTerritory],
  );

  return [saveData, selectedTerritory, changeSelectedTerritory, useFormProps];
};

export default useProfile;
