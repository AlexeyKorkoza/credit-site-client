import React from 'react';
import PropTypes from 'prop-types';

import { Table } from '../../shared';
import List from './styles';

const ListComponent = props => {
    const { managers } = props;

    return (
      <List>
        <List.Link.Add to="/managers/add">Add</List.Link.Add>
        <Table>
            <Table.Header>
                <Table.List.Row.Column>Client's Name</Table.List.Row.Column>
                <Table.List.Row.Column>Client's email</Table.List.Row.Column>
                <Table.List.Row.Column/>
            </Table.Header>
          <Table.List>
            {managers.map(manager => {
                return (
                  <Table.List.Row key={manager.id}>
                    <Table.List.Row.Column>
                      {manager.login}
                    </Table.List.Row.Column>
                    <Table.List.Row.Column>
                      {manager.email}
                    </Table.List.Row.Column>
                    <Table.List.Row.LastColumn>
                      <List.Link to={`/managers/${manager.id}`}>Edit</List.Link>
                    </Table.List.Row.LastColumn>
                  </Table.List.Row>
                );
            })}
          </Table.List>
        </Table>
      </List>
    );
};

ListComponent.defaultProps = {
  managers: [],
};

ListComponent.propTypes = {
  managers: PropTypes.arrayOf(
      PropTypes.shape({
          email: PropTypes.string,
          full_name: PropTypes.string,
          id: PropTypes.number,
          is_blocked: PropTypes.bool,
          login: PropTypes.string,
      })
  ),
};

export default ListComponent;
