import { bool, object, string } from 'yup';

import { PHONE_NUMBER_REGEX, VALIDATION_ERROR_MESSAGES } from '../../../constants';

const managerSchema = object().shape({
  fullName: string().required(VALIDATION_ERROR_MESSAGES.fullName),
  selectedTerritory: object({
    label: string(),
    value: string(),
  }).required(VALIDATION_ERROR_MESSAGES.selectedTerritory),
  phone: string()
    .matches(PHONE_NUMBER_REGEX, VALIDATION_ERROR_MESSAGES.invalidPhone)
    .required(VALIDATION_ERROR_MESSAGES.phone),
  action: string(),
  isBlocked: bool(),
});

export { managerSchema };
