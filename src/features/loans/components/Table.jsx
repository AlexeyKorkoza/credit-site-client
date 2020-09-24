import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import { H1, Table } from '../../../shared';
import List from './styles';

const headers = [
  {
    title: 'Amount',
    backendPropertyName: 'amount',
  },
  {
    title: 'Coefficient',
    backendPropertyName: 'coefficient',
  },
  {
    title: 'Date Issue',
    backendPropertyName: 'dateIssue',
  },
  {
    title: 'Date Maturity',
    backendPropertyName: 'dateMaturity',
  },
  {
    title: 'Total Repayment Amount',
    backendPropertyName: 'totalRepaymentAmount',
  },
];

const LoansTable = props => {
  const { loans, outputProperties, role } = props;

  return (
    <>
      {loans && loans.length === 0 ? (
        <H1 color="#3f4357">No loans</H1>
      ) : (
        <List>
          <Table>
            <Table.Header>
              {headers
                .filter(e => outputProperties.includes(e.backendPropertyName))
                .map(item => {
                  const { title, key } = item;

                  return <Table.List.Row.Column key={title}>{title}</Table.List.Row.Column>;
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
      )}
    </>
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
