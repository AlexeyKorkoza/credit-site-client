import React from 'react';

import { Stepper } from './Stepper';
import { LoansProvider } from '../hooks';

const Add = () => (
  <LoansProvider>
    <Stepper />
  </LoansProvider>
);

export default Add;
