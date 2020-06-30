import { useCallback, useContext, useEffect, useState } from 'react';

import { getProfileUser, updateProfileUser } from '../api';
import { localDb } from '../../../services';
import { UserContext, useInitForm, transformToValidFormat } from '../../../core';
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
      phone: '',
      email: '',
      login: '',
    },
    registerValues: role === 'manager' ? ['selectedTerritory'] : [],
  });
  const { setValue } = useFormProps;

  useEffect(() => {
    getProfileUser(role, userId).then(result => {
      const { data } = result;
      if (data.territory) {
        const foundSelectedTerritory = TERRITORIES.find(
          territory => +territory.value === data.territory,
        );

        const transformedData = transformToValidFormat(data);
        setSelectedTerritory(foundSelectedTerritory);
        setValue([...transformedData]);
      } else {
        const transformedData = transformToValidFormat(data);
        setValue([...transformedData]);
      }
    });
  }, []);

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
