import { object, string } from 'yup';

import { VALIDATION_ERROR_MESSAGES } from '../../../constants';

export default object({
  fullName: string().required(VALIDATION_ERROR_MESSAGES.fullName),
  phone: string().required(VALIDATION_ERROR_MESSAGES.password),
  selectedTerritory: object({
    label: string(),
    value: string(),
  }).required(VALIDATION_ERROR_MESSAGES.selectedTerritory),
  email: string().required(VALIDATION_ERROR_MESSAGES.email),
});
