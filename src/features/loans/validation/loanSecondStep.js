import { date, number, object, string } from 'yup';

import { VALIDATION_ERROR_MESSAGES } from '../../../constants';

const loanSecondStepSchema = object().shape({
  amount: number(),
  dateIssue: date().required(VALIDATION_ERROR_MESSAGES.dateIssue),
  dateMaturity: date().required(VALIDATION_ERROR_MESSAGES.dateMaturity),
  totalRepaymentAmount: number(),
  selectedTerritory: object({
    label: string(),
    value: string(),
  }),
});

export default loanSecondStepSchema;
