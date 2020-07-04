import { bool, object, string } from 'yup';

import { VALIDATION_ERROR_MESSAGES } from '../../../constants';

const managerSchema = object().shape({
  fullName: string().required(VALIDATION_ERROR_MESSAGES.fullName),
  selectedTerritory: object({
    label: string(),
    value: string(),
  }).required(VALIDATION_ERROR_MESSAGES.selectedTerritory),
  phone: string().required(VALIDATION_ERROR_MESSAGES.phone),
  action: string(),
  isBlocked: bool(),
});

export { managerSchema };
