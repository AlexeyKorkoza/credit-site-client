import * as Yup from 'yup';

export default Yup.object({
  login: Yup.string().required(),
  password: Yup.string()
    .required(),
  selectedRole: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required(),
});
