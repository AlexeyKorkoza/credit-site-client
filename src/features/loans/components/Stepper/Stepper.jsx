import React from 'react';
import { useStateMachine } from 'little-state-machine';

import Step1 from './Step1';
import Step2 from './Step2';
import updateAction from '../../store/action';

const components = {
  1: Step1,
  2: Step2,
};

const Stepper = () => {
  const {
    state: { data },
  } = useStateMachine(updateAction, {
    shouldReRenderApp: true,
  });
  const { currentStep } = data;
  const CurrentComponent = components[currentStep];

  return CurrentComponent ? <CurrentComponent /> : null;
};

export default Stepper;
