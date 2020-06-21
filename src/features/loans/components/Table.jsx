import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { v4 as uuidv4 } from 'uuid';

import { H1, Table } from '../../../shared';
import List from './styles';

const headers = [
  {
    content: 'Amount',
    key: uuidv4(),
  },
  {
    content: 'Coefficient',
    key: uuidv4(),
  },
  {
    content: 'Date Issue',
    key: uuidv4(),
  },
  {
    content: 'Date Maturity',
    key: uuidv4(),
  },
  {
    content: 'Total Repayment Amount',
    key: uuidv4(),
  },
];

const LoansTable = props => {
  const { loans, outputProperties, role } = props;

  if (loans && loans.length === 0) {
    return <H1 color="#3f4357">No loans</H1>;
  }

  return (
    <List>
      <Table>
        <Table.Header>
          {headers
            .filter(e => outputProperties.includes(e.key))
            .map(item => {
              const { content, key } = item;

              return <Table.List.Row.Column key={key}>{content}</Table.List.Row.Column>;
            })}
          {role === 'admin' && <Table.List.Row.Column />}
        </Table.Header>
        <Table.List>
          {loans.map(loan => (
            <Table.List.Row key={loan.id}>
              {outputProperties.map(item => {
                if (item === 'dateMaturity' || item === 'dateIssue') {
                  return (
                    <Table.List.Row.Column key={item}>
                      {format(new Date(loan[item]), 'dd.MM.yyyy')}
                    </Table.List.Row.Column>
                  );
                }

                return <Table.List.Row.Column key={item}>{loan[item]}</Table.List.Row.Column>;
              })}
              {role === 'admin' && (
                <Table.List.Row.LastColumn>
                  <List.Link to={`/loans/${loan.id}`}>Edit</List.Link>
                </Table.List.Row.LastColumn>
              )}
            </Table.List.Row>
          ))}
        </Table.List>
      </Table>
    </List>
  );
};

LoansTable.defaultProps = {
  loans: [],
  outputProperties: [],
  role: PropTypes.string,
};

LoansTable.propTypes = {
  loans: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number,
      coefficient: PropTypes.number,
      dateIssue: PropTypes.string,
      dateMaturity: PropTypes.string,
      totalRepaymentAmount: PropTypes.number,
      id: PropTypes.number,
    }),
  ),
  outputProperties: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])),
  role: PropTypes.string,
};

export default LoansTable;
