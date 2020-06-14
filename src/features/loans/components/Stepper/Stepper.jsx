import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';

import Step1 from './Step1';
import Step2 from './Step2';
import { LoansContext } from '../../hooks';
import { routesScheme } from '../../../../routing';

const components = {
  1: Step1,
  2: Step2,
};

const Stepper = () => {
  const history = useHistory();
  const context = useContext(LoansContext);
  const location = useLocation();
  const { state } = location;

  const {
    loansFormStore: { currentStep },
  } = context;
  if (!state?.clientId) {
    history.push(routesScheme.clients);

    return null;
  }

  const CurrentComponent = components[currentStep];

  return CurrentComponent ? <CurrentComponent /> : null;
};

export default Stepper;
