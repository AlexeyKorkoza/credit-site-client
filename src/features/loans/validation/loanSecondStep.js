import { date, number, object, string } from 'yup';

const loanSecondStepSchema = object().shape({
  amount: number(),
  dateIssue: date().required('Date issue is not set'),
  dateMaturity: date().required('Date issue is not set'),
  totalRepaymentAmount: number(),
  selectedTerritory: object({
    label: string(),
    value: string(),
  }),
});

export default loanSecondStepSchema;
