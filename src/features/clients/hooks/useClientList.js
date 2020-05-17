import { useContext, useEffect, useState } from 'react';

import { localDb } from '../../../services';
import { UserContext } from '../../../core';
import { getManagerClients } from '../../managers';
import { getAllClients } from '../api';

const useClientList = () => {
  const context = useContext(UserContext);
  const [clients, setClients] = useState([]);
  const { role } = context;

  useEffect(() => {
    const { id: managerId } = localDb.getDataAuthUser();
    const func = role === 'manager' ? getManagerClients : getAllClients;

    func(managerId).then(result => {
      setClients(result.clients);
    });
  }, []);

  return [clients, role];
};

export default useClientList;
