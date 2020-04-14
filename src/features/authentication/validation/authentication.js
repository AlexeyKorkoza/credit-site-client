import * as Yup from 'yup';

export default Yup.object().shape({
  login: Yup.string().required('Please, enter your login'),
  password: Yup.string()
    .required('Please, enter your password'),
  selectedRole: Yup.object().shape({
    label: Yup.string(),
    value: Yup.string().required('Please, select your role'),
  }),
});
