import * as yup from 'yup';

const managerSchema = yup.object().shape({
  fullName: yup.string().required(),
  selectedTerritory: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .required(),
  phone: yup.string().required(),
  action: yup.string(),
  isBlocked: yup.bool(),
});

export { managerSchema };
