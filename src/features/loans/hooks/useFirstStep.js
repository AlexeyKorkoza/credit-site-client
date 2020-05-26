import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useStateMachine } from 'little-state-machine';

import { getClient } from '../../clients/api';
import TERRITORIES from '../../../constants';
import { createClientCard } from '../api';
import { useInitForm } from '../../../core';
import { loanFirstStepSchema } from '../validation';
import updateAction from '../store/action';

const useFirstStep = () => {
  const location = useLocation();
  const { state } = location;

  const { action } = useStateMachine(updateAction);
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
  const [clientName, setClientName] = useState('');
  const { setValue } = formProps;
  const [selectedTerritory, setSelectedTerritory] = useState({});

  useEffect(() => {
    if (state) {
      const { clientId } = state;

      getClient(clientId).then(result => {
        const { client } = result;

        setClientName(client.name);
        setValue(client);
        setSelectedTerritory(TERRITORIES.find(e => +e.value === +client.territory));
      });
    }
  }, []);

  const handleCreatingClientCard = useCallback(
    data => {
      const { email, fullName, phone, passportData, surchargeFactor } = data;

      if (surchargeFactor === 0) {
        return;
      }

      const territory = TERRITORIES.find(e => +e.value === +selectedTerritory.value).value;
      const { clientId } = state;

      const body = {
        email,
        fullName,
        phone,
        territory,
        passportData,
        clientId,
        surchargeFactor,
      };

      createClientCard(body).then(() => {
        action({
          clientId,
          amount: surchargeFactor,
          currentStep: 2,
        });
      });
    },
    [state],
  );

  const modifySelectedTerritory = useCallback(
    territory => {
      setSelectedTerritory(territory);
    },
    [setSelectedTerritory],
  );

  return [handleCreatingClientCard, formProps, selectedTerritory, modifySelectedTerritory];
};

export default useFirstStep;
