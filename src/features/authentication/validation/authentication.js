import { object, string } from 'yup';

import { VALIDATION_ERROR_MESSAGES } from '../../../constants';

export default object().shape({
  login: string().required(VALIDATION_ERROR_MESSAGES.login),
  password: string().required(VALIDATION_ERROR_MESSAGES.password),
  selectedRole: object().shape({
    label: string(),
    value: string().required(VALIDATION_ERROR_MESSAGES.selectedRole),
  }),
});
