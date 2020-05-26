import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { store } from 'react-notifications-component';

import { getLoan, saveLoan } from '../api';
import TERRITORIES from '../../../constants';
import { calculation, notification } from '../../../services';
import { useInitForm } from '../../../core';
import { loanEditorSchema } from '../validation';

const failureNotificationType = 'FailureEditingLoan';
const successfulNotificationType = 'SuccessfulEditingLoan';

const useEditor = () => {
  const [selectedTerritory, setSelectedTerritory] = useState({});
  const [focusedDateIssue, setFocusedDateIssue] = useState(null);
  const [focusedDateMaturity, setFocusedDateMaturity] = useState(null);
  const [action, setAction] = useState('add');
  const [formProps] = useInitForm({
    defaultValues: {
      amount: null,
      coefficient: '',
      dateIssue: null,
      dateMaturity: null,
      territory: '',
      totalRepaymentAmount: null,
    },
    validationSchema: loanEditorSchema,
    registerValues: ['selectedTerritory'],
  });
  const [getValues, setValue] = formProps;

  const params = useParams();
  const { id: loanId } = params;

  useEffect(() => {
    getLoan(loanId).then(result => {
      const { dateIssue, dateMaturity, territory, ...rest } = result.loan;

      setValue({
        dateIssue: moment(dateIssue),
        dateMaturity: moment(dateMaturity),
        ...rest,
      });
      setAction('edit');
      setSelectedTerritory(TERRITORIES.find(e => +e.value === +territory));
    });
  }, []);

  const changeSelectedTerritory = useCallback(
    territory => {
      setSelectedTerritory(territory);
    },
    [setSelectedTerritory],
  );

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
    const dateMaturity = getValues('dateMaturity');
    const values = getValues();

    const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, values);

    setValue(result);
  }, []);

  const changeDateMaturity = useCallback(dateMaturity => {
    const dateIssue = getValues('dateIssue');
    const values = getValues();

    const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, values);

    setValue(result);
  }, []);

  const saveLoanData = useCallback(data => {
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
        const builtNotification = notification.buildNotification(message, failureNotificationType);
        if (builtNotification) {
          store.addNotification(builtNotification);
        }
      });
  });

  return [
    action,
    focusedDateIssue,
    modifyFocusDateIssue,
    focusedDateMaturity,
    modifyFocusDateMaturity,
    changeDateIssue,
    changeDateMaturity,
    changeSelectedTerritory,
    saveLoanData,
    selectedTerritory,
    formProps,
  ];
};

export default useEditor;
