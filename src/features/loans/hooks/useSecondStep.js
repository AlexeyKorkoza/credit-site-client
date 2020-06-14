import { useCallback, useContext, useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import { useHistory } from 'react-router';
import { addDays } from 'date-fns';

import { notification, calculation } from '../../../services';
import TERRITORIES from '../../../constants';
import { saveLoan } from '../api';
import { routesScheme } from '../../../routing';
import { useInitForm, UserContext } from '../../../core';
import { loanSecondStepSchema } from '../validation';
import { getClientLoans } from '../../clients/api';
import { LoansContext } from './index';

const failureNotificationType = 'FailureCreatingLoan';
const successfulNotificationType = 'SuccessfulCreatingLoan';

const useSecondStep = () => {
  const history = useHistory();

  const context = useContext(LoansContext);
  const { loansFormStore, updateLoansFormStore } = context;
  const { amount, clientId, clientName, selectedTerritory } = loansFormStore;

  const userContext = useContext(UserContext);
  const { role } = userContext;

  const [formProps] = useInitForm({
    defaultValues: {
      amount,
      coefficient: '',
      dateIssue: new Date(),
      dateMaturity: addDays(new Date(), 7),
      selectedTerritory,
      totalRepaymentAmount: null,
    },
    validationSchema: loanSecondStepSchema,
    registerValues: ['dateIssue', 'dateMaturity', 'selectedTerritory'],
  });
  const { setValue, getValues } = formProps;

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const { dateIssue, dateMaturity, ...values } = getValues();

    const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, values);

    setValue('selectedTerritory', selectedTerritory);
    setValue([result]);
  }, []);

  useEffect(() => {
    getClientLoans(clientId).then(result => {
      setLoans(result.loans);
    });
  }, [clientId]);

  const changeDateIssue = useCallback(
    dateIssue => {
      const { dateMaturity, ...values } = getValues();

      const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, values);

      setValue([result]);
    },
    [setValue],
  );

  const changeDateMaturity = useCallback(
    dateMaturity => {
      const { dateIssue, ...values } = getValues();

      const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, values);

      setValue([result]);
    },
    [setValue],
  );

  const handleCreatingLoan = useCallback(data => {
    const { dateIssue, dateMaturity, totalRepaymentAmount } = data;

    const territory = TERRITORIES.find(e => +e.value === +selectedTerritory.value);

    const body = {
      amount,
      coefficient: +territory.value,
      clientId,
      dateIssue,
      dateMaturity,
      totalRepaymentAmount,
    };

    return saveLoan(body)
      .then(() => {
        const message = 'Loan was created successfully';
        const builtNotification = notification.buildNotification(
          message,
          successfulNotificationType,
        );
        if (builtNotification) {
          store.addNotification(builtNotification);
        }

        updateLoansFormStore({
          clientName: '',
          clientId: null,
          amount: null,
          currentStep: 1,
          selectedTerritory: {},
        });

        history.push(routesScheme.clients);
      })
      .catch(error => {
        const { message } = error;
        const builtNotification = notification.buildNotification(message, failureNotificationType);
        if (builtNotification) {
          store.addNotification(builtNotification);
        }
      });
  }, []);

  return {
    changeDateIssue,
    changeDateMaturity,
    handleCreatingLoan,
    formProps,
    loans,
    selectedTerritory,
    clientName,
    role,
  };
};

export default useSecondStep;
