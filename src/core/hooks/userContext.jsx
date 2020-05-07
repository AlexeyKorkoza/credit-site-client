import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import localStorage from '../index';

export const UserContext = React.createContext();

const UserProvider = ({ children = '' }) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const result = localStorage.getItem('user', true);

    setRole(result ? result.role : '');
  });

  const updateUserRole = newRole => {
    setRole(newRole);
  };

  return (
    <UserContext.Provider
      value={{
        role,
        updateUserRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.defaultProps = {
  children: '',
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserProvider;
