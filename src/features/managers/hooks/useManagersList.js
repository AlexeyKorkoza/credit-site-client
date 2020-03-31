import { useEffect, useState } from 'react';

import { getManagers } from '../api';

const useManagersList = () => {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    getManagers().then((result) => {
      setManagers(result);
    });
  });

  return [managers];
};

export default useManagersList;
