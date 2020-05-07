import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { store } from 'react-notifications-component';

import { getLoan, saveLoan } from '../api';
import TERRITORIES from '../../../constants';
import { calculation, notification } from '../../../services';

const failureNotificationType = 'FailureEditingLoan';
const successfulNotificationType = 'SuccessfulEditingLoan';

const useEditor = () => {
  const params = useParams();
  const [loanData, setLoanData] = useState({});
  const [selectedTerritory, setSelectedTerritory] = useState({});
  const [focusedDateIssue, setFocusedDateIssue] = useState(null);
  const [focusedDateMaturity, setFocusedDateMaturity] = useState(null);

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      const { id: loanId } = params;

      getLoan(loanId).then(result => {
        const { dateIssue, dateMaturity, territory, ...rest } = result.loan;

        setLoanData({
          action: 'edit',
          dateIssue: moment(dateIssue),
          dateMaturity: moment(dateMaturity),
          loanId,
          selectedTerritory: TERRITORIES.find(e => +e.value === +territory),
          ...rest,
        });
      });
    } else {
      setLoanData({
        action: 'add',
      });
    }
  });

  const changeSelectedTerritory = useCallback(territory => {
    setSelectedTerritory(territory);
  }, []);

  const modifyFocusDateIssue = useCallback(({ focused }) => {
    setFocusedDateIssue(focused);
  });

  const modifyFocusDateMaturity = useCallback(({ focused }) => {
    setFocusedDateMaturity(focused);
  });

  const changeDateIssue = useCallback(dateIssue => {
    const { dateMaturity } = loanData;

    const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, loanData);

    setLoanData(result);
  });

  const changeDateMaturity = useCallback(dateMaturity => {
    const { dateIssue } = loanData;

    const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, loanData);

    setLoanData(result);
  });

  const saveLoanData = useCallback(data => {
    const { amount, coefficient, dateIssue, dateMaturity, totalRepaymentAmount } = data;
    const { loanId } = params;
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
    loanData,
    focusedDateIssue,
    modifyFocusDateIssue,
    focusedDateMaturity,
    modifyFocusDateMaturity,
    changeDateIssue,
    changeDateMaturity,
    changeSelectedTerritory,
    saveLoanData,
    selectedTerritory,
  ];
};

export default useEditor;
