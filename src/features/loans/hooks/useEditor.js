import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { store } from 'react-notifications-component';

import { getLoan, saveLoan } from '../api';
import TERRITORIES from '../../../constants';
import { calculation, notification } from '../../../services';
import { transformToValidFormat, useInitForm } from '../../../core';
import { loanEditorSchema } from '../validation';

const failureNotificationType = 'FailureEditingLoan';
const successfulNotificationType = 'SuccessfulEditingLoan';

const useEditor = () => {
  const initDates = {
    dateIssue: null,
    dateMaturity: null,
  };
  const [selectedTerritory, setSelectedTerritory] = useState({});
  const [action, setAction] = useState('add');
  const [dates, setDates] = useState(initDates);
  const [formProps] = useInitForm({
    defaultValues: {
      amount: null,
      coefficient: '',
      totalRepaymentAmount: null,
      ...initDates,
    },
    validationSchema: loanEditorSchema,
    registerValues: ['dateIssue', 'dateMaturity', 'selectedTerritory'],
  });
  const { getValues, setValue } = formProps;

  const params = useParams();
  const { id: loanId } = params;

  useEffect(() => {
    getLoan(loanId).then(result => {
      const loanData = result.loan;

      const transformedLoanData = transformToValidFormat(loanData);
      setValue([...transformedLoanData]);

      const { dateIssue, dateMaturity, territory } = result.loan;
      setDates({
        dateIssue: new Date(dateIssue),
        dateMaturity: new Date(dateMaturity),
      });
      setAction('edit');
      setSelectedTerritory(TERRITORIES.find(e => +e.value === +territory));
    });
  }, []);

  const changeSelectedTerritory = useCallback(
    territory => {
      const { dateIssue, dateMaturity, ...values } = getValues();
      values.selectedTerritory = territory;

      const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, values);
      setValue({
        totalRepaymentAmount: result.totalRepaymentAmount,
      });
      setSelectedTerritory(territory);
    },
    [setSelectedTerritory],
  );

  const changeDateIssue = useCallback(
    dateIssue => {
      const { dateMaturity, ...values } = getValues();
      values.selectedTerritory = selectedTerritory;

      const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, values);
      const transformedResult = transformToValidFormat(result);

      setDates(currentDates => ({
        ...currentDates,
        dateIssue: new Date(dateIssue),
      }));
      setValue([...transformedResult]);
    },
    [setDates, selectedTerritory, setValue],
  );

  const changeDateMaturity = useCallback(
    dateMaturity => {
      const { dateIssue, ...values } = getValues();
      values.selectedTerritory = selectedTerritory;

      const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, values);
      const transformedResult = transformToValidFormat(result);

      setDates(currentDates => ({
        ...currentDates,
        dateMaturity: new Date(dateMaturity),
      }));
      setValue([...transformedResult]);
    },
    [setDates, selectedTerritory, setValue],
  );

  const saveLoanData = useCallback(
    data => {
      const { amount, coefficient, dateIssue, dateMaturity, totalRepaymentAmount } = data;
      const { value: territory } = selectedTerritory;

      const body = {
        amount,
        coefficient,
        dateIssue,
        dateMaturity,
        territory,
        totalRepaymentAmount,
      };

      return saveLoan(body, loanId)
        .then(() => {
          const message = 'Loan was edited successfully';
          const builtNotification = notification.buildNotification(
            message,
            successfulNotificationType,
          );
          if (builtNotification) {
            store.addNotification(builtNotification);
          }
        })
        .catch(error => {
          const { message } = error;
          const builtNotification = notification.buildNotification(
            message,
            failureNotificationType,
          );
          if (builtNotification) {
            store.addNotification(builtNotification);
          }
        });
    },
    [selectedTerritory],
  );

  const updateTotalRepaymentAmount = useCallback(
    event => {
      const amount = event.target.value;
      const { dateIssue, dateMaturity, ...values } = getValues();
      values.amount = amount;
      values.selectedTerritory = selectedTerritory;

      const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, values);

      setValue([{ amount }, { totalRepaymentAmount: result.totalRepaymentAmount }]);
    },
    [selectedTerritory, setValue],
  );

  return {
    action,
    changeDateIssue,
    changeDateMaturity,
    changeSelectedTerritory,
    dates,
    formProps,
    saveLoanData,
    selectedTerritory,
    updateTotalRepaymentAmount,
  };
};

export default useEditor;
