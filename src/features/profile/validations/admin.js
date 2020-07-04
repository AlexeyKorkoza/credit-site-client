import { object, string } from 'yup';

import { VALIDATION_ERROR_MESSAGES } from '../../../constants';

export default object({
  login: string().required(VALIDATION_ERROR_MESSAGES.login),
});
