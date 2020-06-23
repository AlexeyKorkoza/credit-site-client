import { date, object, number, string } from 'yup';

const loanEditorSchema = object().shape({
  amount: number().required('Enter amount'),
  coefficient: number().required('Enter coefficient'),
  dateIssue: date().required('Enter date issue'),
  dateMaturity: date().required('Enter date maturity'),
  totalRepaymentAmount: number().required(),
  selectedTerritory: object({
    label: string(),
    value: string(),
  }).required('Select territory'),
});

export default loanEditorSchema;
