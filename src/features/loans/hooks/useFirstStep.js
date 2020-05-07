import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { getClient, getClientLoans } from '../../clients/api';
import TERRITORIES from '../../../constants';
import { createClientCard } from '../api';

const useFirstStep = () => {
  const location = useLocation();
  const { state } = location;

  const [loanData, setLoanData] = useState({});
  const [selectedTerritory, setSelectedTerritory] = useState({});

  useEffect(() => {
    if (state) {
      const { clientId } = state;

      getClient(clientId).then(result => {
        const { client } = result;
        const { name: clientName } = client;

        setLoanData({
          ...client,
          clientId,
          clientName,
          selectedTerritory: TERRITORIES.find(e => +e.value === +client.territory),
        });
      });
    }
  });

  const handleCreatingClientCard = useCallback(data => {
    const { email, fullName, phone, passportData, surchargeFactor } = data;

    if (surchargeFactor === 0) {
      return;
    }

    const territory = TERRITORIES.find(e => +e.value === +selectedTerritory.value).value;
    const { clientId } = loanData;

    const body = {
      email,
      fullName,
      phone,
      territory,
      passportData,
      clientId,
      surchargeFactor,
    };

    createClientCard(body)
      .then(() => getClientLoans(clientId))
      .then(result => {
        const { loans } = result;

        // this.setState({
        //   amount: surchargeFactor,
        //   currentStep: 2,
        //   loans,
        // });
      });
  });

  const modifySelectedTerritory = useCallback(territory => {
    setSelectedTerritory(territory);
  });

  return [handleCreatingClientCard, loanData, modifySelectedTerritory];
};

export default useFirstStep;
