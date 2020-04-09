import * as yup from 'yup';

const loanFirstStepSchema = yup.object().shape({
  fullName: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required(),
  surchargeFactor: yup.number().required(),
  selectedTerritory: yup.object({
    label: yup.string(),
    value: yup.string(),
  }).required(),
});

export default loanFirstStepSchema;
