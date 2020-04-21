import React, { useContext } from 'react';

import { Table } from '../../../shared';
import List from './styles';
import { UserContext } from '../../../core';
import { useClientList } from '../hooks';
import { routesScheme } from '../../../routing';

const ListComponent = () => {
  const [clients] = useClientList();
  const context = useContext(UserContext);
  const { role } = context;

  return (
    <List>
      {role === 'manager' && <List.Link.Add to={routesScheme.clientsAdd}>Add</List.Link.Add>}
      <Table>
        <Table.Header>
          <Table.List.Row.Column>Client&apos;s Name</Table.List.Row.Column>
          <Table.List.Row.Column>Client&apos;s email</Table.List.Row.Column>
          <Table.List.Row.Column />
        </Table.Header>
        <Table.List>
          {clients.map((client) => (
            <Table.List.Row key={client.id}>
              <Table.List.Row.Column>{client.name}</Table.List.Row.Column>
              <Table.List.Row.Column>{client.email}</Table.List.Row.Column>
              <Table.List.Row.LastColumn flex-direction="column">
                <List.Link to={routesScheme.clientsId(client.id)}>Edit</List.Link>
                {role === 'manager' && (
                <List.Link
                  to={{
                    pathname: routesScheme.loansAdd,
                    state: { clientId: client.id },
                  }}
                >
                  Add new loan
                </List.Link>
                )}
              </Table.List.Row.LastColumn>
            </Table.List.Row>
          ))}
        </Table.List>
      </Table>
    </List>
  );
};

export default ListComponent;
