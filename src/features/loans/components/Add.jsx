import React from 'react';
import { StateMachineProvider, createStore } from 'little-state-machine';

import { Stepper } from './Stepper';

createStore({
  data: {
    clientId: null,
    currentStep: 1,
    amount: 0,
  },
});

const Add = () => (
  <StateMachineProvider>
    <Stepper />
  </StateMachineProvider>
);

export default Add;
