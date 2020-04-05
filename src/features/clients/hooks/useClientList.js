import { useContext, useEffect, useState } from 'react';

import { localDb } from '../../../services';
import { UserContext } from '../../../core';

const useClientList = () => {
  const context = useContext(UserContext);
  const [clients, setClients] = useState([]);
  const { role } = context;

  useEffect(() => {
    const { id: managerId } = localDb.getDataAuthUser();
    const func = role === 'manager' ? managers.getManagerClients : clients.getAllClients;

    func(managerId).then((result) => {
      setClients(result.clients);
    });
  });

  return [clients];
};

export default useClientList;
