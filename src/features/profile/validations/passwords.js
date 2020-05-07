import { object, string } from 'yup';

export default object({
  oldPassword: string().required('Enter your old password'),
  newPassword: string().required('Enter your new password'),
  confirmNewPassword: string()
    .required('Confirm your new password')
    .test('passwords-match', "Passwords don't match", function(value) {
      return this.parent.newPassword === value;
    }),
});
