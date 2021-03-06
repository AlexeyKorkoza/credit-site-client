import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { getClient } from '../../clients/api';
import TERRITORIES from '../../../constants';
import { useInitForm } from '../../../core';
import { loanFirstStepSchema } from '../validation';
import { LoansContext } from './index';

const useFirstStep = () => {
  const location = useLocation();
  const { state } = location;

  const context = useContext(LoansContext);
  const { updateLoansFormStore } = context;
  const [formProps] = useInitForm({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      passportData: '',
      surchargeFactor: null,
    },
    validationSchema: loanFirstStepSchema,
    registerValues: ['selectedTerritory'],
  });
  const { setValue } = formProps;
  const [selectedTerritory, setSelectedTerritory] = useState({});

  useEffect(() => {
    if (state) {
      const { clientId } = state;

      getClient(clientId).then(result => {
        const { client } = result;

        setValue(client);
        setValue(
          'selectedTerritory',
          TERRITORIES.find(e => +e.value === +client.territory),
        );
      });
    }
  }, []);

  const handleCreatingClientCard = useCallback(
    data => {
      const { email, fullName, phone, passportData, surchargeFactor } = data;

      if (surchargeFactor === 0) {
        return;
      }

      const { value: selectedTerritoryValue } = selectedTerritory;
      const territory = TERRITORIES.find(e => +e.value === +selectedTerritoryValue).value;
      const { clientId } = state;

      const body = {
        amount: surchargeFactor,
        clientId,
        email,
        fullName,
        passportData,
        phone,
        territory,
      };

      updateLoansFormStore({
        ...body,
        clientId,
        currentStep: 2,
        territory,
      });
    },
    [state, selectedTerritory],
  );

  const modifySelectedTerritory = useCallback(
    territory => {
      setSelectedTerritory(territory);
      setValue('selectedTerritory', territory);
    },
    [setSelectedTerritory],
  );

  return {
    handleCreatingClientCard,
    formProps,
    modifySelectedTerritory,
  };
};

export default useFirstStep;
