import * as yup from 'yup';

const clientSchema = yup.object().shape({
  name: yup.string().required(),
  selectedTerritory: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  action: yup.string(),
  passportData: yup.string(),
  isRemoved: yup.bool(),
});

const removeClientSchema = yup.object().shape({
  isRemoved: yup.bool(),
});

export { removeClientSchema, clientSchema };
