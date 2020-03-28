import * as Yup from 'yup';

export default Yup.object({
  login: Yup.string().required()
});
