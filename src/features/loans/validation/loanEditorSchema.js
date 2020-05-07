import * as yup from 'yup';

const loanEditorSchema = yup.object().shape({
  amount: yup.number,
  coefficient: yup.number,
  dateIssue: yup.date(),
  dateMaturity: yup.date(),
  totalRepaymentAmount: yup.number(),
  selectedTerritory: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .required(),
});

export default loanEditorSchema;
