import { useEffect, useState } from 'react';

import { getManagers } from '../api';

const useManagersList = () => {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    getManagers().then((result) => {
      const { managers: savedManagers } = result;
      if (savedManagers) {
        setManagers(savedManagers);
      }
    });
  });

  return [managers];
};

export default useManagersList;
