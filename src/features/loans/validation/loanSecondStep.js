import * as yup from 'yup';

const loanSecondStepSchema = yup.object().shape({
  amount: yup.number().required(),
  coefficient: yup.number().required(),
  dateIssue: yup.date().required(),
  dateMaturity: yup.date().required(),
  totalRepaymentAmount: yup.number().required(),
});

export default loanSecondStepSchema;
