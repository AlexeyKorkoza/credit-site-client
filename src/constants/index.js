export default [
  {
    label: '0.5 %',
    value: '0.5',
  },
  {
    label: '1 %',
    value: '1',
  },
  {
    label: '1.5 %',
    value: '1.5',
  },
];

export const VALIDATION_ERROR_MESSAGES = {
  amount: 'Please, enter the amount',
  coefficient: 'Please, enter the coefficient',
  confirmNewPassword: "Passwords don't match",
  dateIssue: 'Please, enter the date issue',
  dateMaturity: 'Please, enter the date maturity',
  email: 'Please, enter the email',
  fullName: 'Please, enter the full name',
  invalidPhone: 'Please, enter the valid phone',
  login: 'Please, enter the login',
  oldPassword: 'Please, enter the old password',
  name: 'Please, enter the name',
  newPassword: 'Please, enter the new password',
  passportData: 'Please, enter the passport data',
  password: 'Please, enter the password',
  phone: 'Please, enter the phone',
  selectedRole: 'Please, select your role',
  selectedTerritory: 'Please, select the territory',
  surchargeFactor: 'Please, enter the surcharge factor',
};

export const PHONE_NUMBER_REGEX = /(\d{5,15})$/;
