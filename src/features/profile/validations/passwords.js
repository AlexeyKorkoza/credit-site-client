import { object, string } from 'yup';

import { VALIDATION_ERROR_MESSAGES } from '../../../constants';

export default object({
  oldPassword: string().required(VALIDATION_ERROR_MESSAGES.oldPassword),
  newPassword: string().required(VALIDATION_ERROR_MESSAGES.newPassword),
  confirmNewPassword: string()
    .required('Confirm your new password')
    .test('passwords-match', VALIDATION_ERROR_MESSAGES.confirmNewPassword, function(value) {
      return this.parent.newPassword === value;
    }),
});
