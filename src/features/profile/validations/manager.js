import * as Yup from 'yup';

export default Yup.object({
  fullName: Yup.string().required(),
  phone: Yup.string().required(),
  selectedTerritory: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required(),
  email: Yup.string().required(),
});
