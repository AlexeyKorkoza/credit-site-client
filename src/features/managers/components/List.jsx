import React from 'react';

import { Table } from '../../../shared';
import List from './styles';
import { useManagersList } from '../hooks';

const ListComponent = () => {
  const [managers] = useManagersList();

  return (
    <List>
      <List.Link.Add to="/managers/add">Add</List.Link.Add>
      <Table>
        <Table.Header>
          <Table.List.Row.Column>Client&apos;s Name</Table.List.Row.Column>
          <Table.List.Row.Column>Client&apos;s email</Table.List.Row.Column>
          <Table.List.Row.Column />
        </Table.Header>
        <Table.List>
          {managers.map((manager) => (
            <Table.List.Row key={manager.id}>
              <Table.List.Row.Column>{manager.login}</Table.List.Row.Column>
              <Table.List.Row.Column>{manager.email}</Table.List.Row.Column>
              <Table.List.Row.LastColumn>
                <List.Link to={`/managers/${manager.id}`}>Edit</List.Link>
              </Table.List.Row.LastColumn>
            </Table.List.Row>
          ))}
        </Table.List>
      </Table>
    </List>
  );
};

export default ListComponent;
