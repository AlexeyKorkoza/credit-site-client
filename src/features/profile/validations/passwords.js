import * as Yup from 'yup';

export default Yup.object({
  oldPassword: Yup.string().required(),
  newPassword: Yup.string().required(),
  confirmNewPassword: Yup.string().required().test('passwords-match', 'Passwords don\'t match', function (value) {
    return this.parent.password === value;
  }),
});
