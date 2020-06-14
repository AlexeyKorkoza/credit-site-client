import { date, number, object, string } from 'yup';

const loanSecondStepSchema = object().shape({
  amount: number().required(),
  coefficient: number().required(),
  dateIssue: date().required(),
  dateMaturity: date().required(),
  totalRepaymentAmount: number().required(),
  selectedTerritory: object({
    label: string(),
    value: string(),
  }).required(),
});

export default loanSecondStepSchema;
