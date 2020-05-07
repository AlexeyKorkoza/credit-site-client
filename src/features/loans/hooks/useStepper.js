import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

const useStepper = () => {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(1);

  const handleBackClick = useCallback(() => {
    history.goBack();
  }, []);

  const modifyCurrentStep = useCallback(step => {
    setCurrentStep(step);
  }, []);

  return [currentStep, handleBackClick, modifyCurrentStep];
};

export default useStepper;
