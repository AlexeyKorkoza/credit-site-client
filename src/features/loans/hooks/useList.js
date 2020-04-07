import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { UserContext } from '../../../core';
import { getAllLoans } from '../api';
import { routesScheme } from '../../../routing';

const useList = () => {
  const context = useContext(UserContext);
  const { role } = context;
  const [loans, setLoans] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (role === 'manager') {
      history.push(routesScheme.loansAdd);

      return;
    }

    getAllLoans().then((result) => {
      setLoans(result);
    });
  });

  return [loans];
};

export default useList;
