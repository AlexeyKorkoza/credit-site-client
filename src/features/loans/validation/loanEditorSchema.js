import { date, object, number, string } from 'yup';

import { VALIDATION_ERROR_MESSAGES } from '../../../constants';

const loanEditorSchema = object().shape({
  amount: number().required(VALIDATION_ERROR_MESSAGES.amount),
  coefficient: number().required(VALIDATION_ERROR_MESSAGES.coefficient),
  dateIssue: date().required(VALIDATION_ERROR_MESSAGES.dateIssue),
  dateMaturity: date().required(VALIDATION_ERROR_MESSAGES.dateMaturity),
  totalRepaymentAmount: number().required(),
  selectedTerritory: object({
    label: string(),
    value: string(),
  }).required(VALIDATION_ERROR_MESSAGES.selectedTerritory),
});

export default loanEditorSchema;
