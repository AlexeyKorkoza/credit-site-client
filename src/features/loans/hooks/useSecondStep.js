import { useCallback, useState } from 'react';
import { store } from 'react-notifications-component';
import { useHistory } from 'react-router';

import { notification } from '../../../services';
import TERRITORIES from '../../../constants';
import { saveLoan } from '../api';
import { routesScheme } from '../../../routing';

const failureNotificationType = 'FailureCreatingLoan';
const successfulNotificationType = 'SuccessfulCreatingLoan';

const useSecondStep = () => {
  const history = useHistory();
  const [focusedDateIssue, setFocusedDateIssue] = useState(null);
  const [focusedDateMaturity, setFocusedDateMaturity] = useState(null);

  // getClientLoans(clientId))
  const modifyFocusDateIssue = useCallback(({ focused }) => {
    setFocusedDateIssue(focused);
  });

  const modifyFocusDateMaturity = useCallback(({ focused }) => {
    setFocusedDateMaturity(focused);
  });

  const changeDateIssue = useCallback(dateIssue => {
    // const { dateMaturity } = loanData;
    //
    // const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, loanData);
    //
    // setLoanData(result);
  });

  const changeDateMaturity = useCallback(dateMaturity => {
    // const { dateIssue } = loanData;
    //
    // const result = calculation.calculateTotalRepaymentAmount(dateIssue, dateMaturity, loanData);
    //
    // setLoanData(result);
  });

  const handleCreatingLoan = useCallback(data => {
    const {
      amount,
      selectedTerritory,
      dateIssue,
      dateMaturity,
      clientId,
      totalRepaymentAmount,
    } = data;

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

  return [
    focusedDateIssue,
    modifyFocusDateIssue,
    focusedDateMaturity,
    modifyFocusDateMaturity,
    changeDateIssue,
    changeDateMaturity,
    handleCreatingLoan,
  ];
};

export default useSecondStep;
