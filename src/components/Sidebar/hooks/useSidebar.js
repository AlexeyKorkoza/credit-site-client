import { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { logOut } from '../../../features/authentication';
import { routesScheme } from '../../../routing';
import { UserContext } from '../../../core';

const useSidebar = () => {
  const history = useHistory();
  const context = useContext(UserContext);
  const { role, updateUserRole } = context;

  const onLogOut = useCallback(() => {
    logOut().then(() => {
      history.push(routesScheme.auth);
      updateUserRole('');
    });
  }, []);

  return [
    role,
    onLogOut,
  ];
};

export default useSidebar;
