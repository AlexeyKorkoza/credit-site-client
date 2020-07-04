import { number, object, string } from 'yup';

import { VALIDATION_ERROR_MESSAGES } from '../../../constants';

const loanFirstStepSchema = object().shape({
  fullName: string().required(VALIDATION_ERROR_MESSAGES.fullName),
  phone: string().required(VALIDATION_ERROR_MESSAGES.phone),
  email: string().required(VALIDATION_ERROR_MESSAGES.email),
  surchargeFactor: number().required(VALIDATION_ERROR_MESSAGES.surchargeFactor),
  selectedTerritory: object({
    label: string(),
    value: string(),
  }).required(VALIDATION_ERROR_MESSAGES.selectedTerritory),
});

export default loanFirstStepSchema;
