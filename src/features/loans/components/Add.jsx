import React from 'react';

import { Step1, Step2 } from './Add';
import { useStepper } from '../hooks';

const components = {
  1: Step1,
  2: Step2,
};

const Add = () => {
  const [currentStep, ,] = useStepper();
  const CurrentComponent = components[currentStep];

  return (
    <CurrentComponent />
  );
};

export default Add;
