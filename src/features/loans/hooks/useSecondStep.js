import { useCallback, useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import { useHistory } from 'react-router';
import { useStateMachine } from 'little-state-machine';

import { notification, calculation } from '../../../services';
import TERRITORIES from '../../../constants';
import { saveLoan } from '../api';
import { routesScheme } from '../../../routing';
import { useInitForm } from '../../../core';
import { loanSecondStepSchema } from '../validation';
import { getClientLoans } from '../../clients/api';
import updateAction from '../store/action';

const failureNotificationType = 'FailureCreatingLoan';
const successfulNotificationType = 'SuccessfulCreatingLoan';

const useSecondStep = () => {
  const history = useHistory();
  const {
    action,
    state: { data },
  } = useStateMachine(updateAction, {
    shouldReRenderApp: true,
  });
  const { amount, clientId, clientName, selectedTerritory } = data;
  const [formProps] = useInitForm({
    defaultValues: {
      amount,
      coefficient: '',
      dateIssue: null,
      dateMaturity: null,
      totalRepaymentAmount: null,
    },
    validationSchema: loanSecondStepSchema,
    registerValues: ['dateIssue', 'dateMaturity'],
  });
  const { setValue, getValues } = formProps;
  const [loans, setLoans] = useState([]);
  const [focusedDateIssue, setFocusedDateIssue] = useState(null);
  const [focusedDateMaturity, setFocusedDateMaturity] = useState(null);

  useEffect(() => {
    getClientLoans(clientId).then(result => {
      setLoans(result.loans);
    });
  }, [clientId]);

  const modifyFocusDateIssue = useCallback(
    ({ focused }) => {
      setFocusedDateIssue(focused);
    },
    [setFocusedDateIssue],
  );

  const modifyFocusDateMaturity = useCallback(
    ({ focused }) => {
      setFocusedDateMaturity(focused);
    },
    [setFocusedDateMaturity],
  );

  const changeDateIssue = useCallback(dateIssue => {
    const { dateMaturity } = getValues();
    const values = getValues();

    const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, values);

    setValue(result);
  }, []);

  const changeDateMaturity = useCallback(dateMaturity => {
    const { dateIssue } = getValues();
    const values = getValues();

    const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, values);

    setValue(result);
  }, []);

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

        action({
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
    focusedDateIssue,
    modifyFocusDateIssue,
    focusedDateMaturity,
    modifyFocusDateMaturity,
    changeDateIssue,
    changeDateMaturity,
    handleCreatingLoan,
    formProps,
    loans,
    selectedTerritory,
    clientName,
  };
};

export default useSecondStep;
