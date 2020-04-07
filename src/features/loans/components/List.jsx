import React, { useContext } from 'react';

import { useList } from '../hooks';
import LoansTable from './Table';
import List from './styles';
import { UserContext } from '../../../core';
import { routesScheme } from '../../../routing';

const outputProperties = [
  'amount',
  'coefficient',
  'dateIssue',
  'dateMaturity',
  'totalRepaymentAmount',
];

const ListComponent = () => {
  const context = useContext(UserContext);
  const { role } = context;
  const [loans] = useList();

  return (
    <List>
      {role === 'manager' && <List.Link.Add to={routesScheme.loansAdd}>Add</List.Link.Add>}
      <LoansTable loans={loans} outputProperties={outputProperties} role={role} />
    </List>
  );
};

export default ListComponent;
