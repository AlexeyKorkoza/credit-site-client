import { object, bool, string } from 'yup';

import { VALIDATION_ERROR_MESSAGES } from '../../../constants';

const clientSchema = object().shape({
  name: string().required(VALIDATION_ERROR_MESSAGES.name),
  selectedTerritory: object({
    label: string(),
    value: string(VALIDATION_ERROR_MESSAGES.selectedTerritory),
  }).required(),
  email: string().required(VALIDATION_ERROR_MESSAGES.email),
  phone: string().required(VALIDATION_ERROR_MESSAGES.phone),
  action: string(),
  passportData: string().required(VALIDATION_ERROR_MESSAGES.passportData),
  isRemoved: bool(),
});

export { clientSchema };
