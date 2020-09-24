import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

/**
 * @param {Object} formProps
 * @param {Object} formProps.validationSchema
 * @param {Object} formProps.defaultValues
 * @param {Object} formProps.registerValues
 * @return {Array}
 */
const useInitForm = ({ validationSchema, defaultValues, registerValues = {} }) => {
  const useFormProps = useForm({
    validationSchema,
    defaultValues,
    mode: 'onBlur',
  });
  const { register, unregister } = useFormProps;

  useEffect(() => {
    if (registerValues.length > 0) {
      registerValues.forEach(registerValuesKey => {
        register({ name: registerValuesKey });
      });
    }

    return () => {
      if (registerValues.length > 0) {
        registerValues.forEach(registerValuesKey => {
          unregister(registerValuesKey);
        });
      }
    };
  }, [register, unregister]);

  return [useFormProps];
};

export default useInitForm;
