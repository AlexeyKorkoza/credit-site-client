import React, { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const LoansContext = createContext();

const LoansProvider = ({ children = '' }) => {
  const [loansFormStore, setLoansFormStore] = useState({
    clientId: null,
    clientName: '',
    currentStep: 1,
    amount: 0,
    selectedTerritory: {},
  });

  const updateLoansFormStore = useCallback(
    data => {
      setLoansFormStore(data);
    },
    [setLoansFormStore],
  );

  return (
    <LoansContext.Provider
      value={{
        loansFormStore,
        updateLoansFormStore,
      }}
    >
      {children}
    </LoansContext.Provider>
  );
};

LoansProvider.defaultProps = {
  children: '',
};

LoansProvider.propTypes = {
  children: PropTypes.node,
};

export default LoansProvider;
