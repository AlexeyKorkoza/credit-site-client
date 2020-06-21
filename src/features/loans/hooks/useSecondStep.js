import { useCallback, useContext, useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import { useHistory } from 'react-router';
import { addDays } from 'date-fns';

import { notification, calculation, localDb } from '../../../services';
import TERRITORIES from '../../../constants';
import { saveLoan } from '../api';
import { routesScheme } from '../../../routing';
import { useInitForm, UserContext, transformResponse } from '../../../core';
import { loanSecondStepSchema } from '../validation';
import { getClientLoans } from '../../clients/api';
import { LoansContext } from './index';

const failureNotificationType = 'FailureCreatingLoan';
const successfulNotificationType = 'SuccessfulCreatingLoan';

const useSecondStep = () => {
  const history = useHistory();
  const context = useContext(LoansContext);
  const { loansFormStore, updateLoansFormStore } = context;
  const { amount, clientId, clientName, territory } = loansFormStore;

  const userContext = useContext(UserContext);
  const { role } = userContext;

  const initDates = {
    dateIssue: new Date(),
    dateMaturity: addDays(new Date(), 7),
  };

  const foundTerritory = TERRITORIES.find(e => +e.value === +territory);
  const [formProps] = useInitForm({
    defaultValues: {
      amount,
      selectedTerritory: foundTerritory,
      totalRepaymentAmount: 0,
      ...initDates,
    },
    validationSchema: loanSecondStepSchema,
    registerValues: ['dateIssue', 'dateMaturity', 'selectedTerritory'],
  });
  const { setValue, getValues } = formProps;

  const [loans, setLoans] = useState([]);
  const [dates, setDates] = useState(initDates);
  const [selectedTerritory] = useState(foundTerritory);

  useEffect(() => {
    getClientLoans(clientId).then(result => {
      setLoans(result.loans);

      const { dateIssue, dateMaturity, ...values } = getValues();

      const calculatedTotalRepayment = calculation.calculateTotalRepaymentAmount(
        dateIssue,
        dateMaturity,
        values,
      );

      const transformedCalculatedTotalRepayment = transformResponse(calculatedTotalRepayment);
      setValue([...transformedCalculatedTotalRepayment]);
    });
  }, []);

  const changeDateIssue = useCallback(
    dateIssue => {
      const { dateMaturity, ...values } = getValues();

      const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, values);
      const transformedResult = transformResponse(result);
      setValue([...transformedResult]);
      setDates({
        dateIssue,
        dateMaturity,
      });
    },
    [setValue],
  );

  const changeDateMaturity = useCallback(
    dateMaturity => {
      const { dateIssue, ...values } = getValues();

      const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, values);
      const transformedResult = transformResponse(result);
      setValue([...transformedResult]);
      setDates({
        dateIssue,
        dateMaturity,
      });
    },
    [setValue],
  );

  const handleCreatingLoan = useCallback(data => {
    const { dateIssue, dateMaturity, totalRepaymentAmount } = data;

    const { currentStep, ...firstStepData } = loansFormStore;
    const authUserData = localDb.getDataAuthUser();
    const { id: managerId } = authUserData;

    const body = {
      coefficient: +territory,
      dateIssue,
      dateMaturity,
      managerId,
      surchargeFactor: amount,
      totalRepaymentAmount,
      ...firstStepData,
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
          clientId: null,
          amount: null,
          currentStep: 1,
          territory: null,
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
    dates,
  };
};

export default useSecondStep;
