import { number, object, string } from 'yup';

import { PHONE_NUMBER_REGEX, VALIDATION_ERROR_MESSAGES } from '../../../constants';

const loanFirstStepSchema = object().shape({
  fullName: string().required(VALIDATION_ERROR_MESSAGES.fullName),
  phone: string()
    .matches(PHONE_NUMBER_REGEX, VALIDATION_ERROR_MESSAGES.invalidPhone)
    .required(VALIDATION_ERROR_MESSAGES.phone),
  email: string().required(VALIDATION_ERROR_MESSAGES.email),
  surchargeFactor: number().required(VALIDATION_ERROR_MESSAGES.surchargeFactor),
  selectedTerritory: object({
    label: string(),
    value: string(),
  }).required(VALIDATION_ERROR_MESSAGES.selectedTerritory),
});

export default loanFirstStepSchema;
