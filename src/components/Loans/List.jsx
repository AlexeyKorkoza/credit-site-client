import React from 'react';
import PropTypes from 'prop-types';

import LoansTable from './Table';
import List from './styles';

const outputProperties = ['amount', 'coefficient', 'dateIssue', 'dateMaturity', 'totalRepaymentAmount'];

const ListComponent = props => {
    const { loans, role } = props;

    return (
      <List>
        {role === 'manager' && <List.Link.Add to="/loans/add">Add</List.Link.Add>}
        <LoansTable
          loans={loans}
          outputProperties={outputProperties}
          role={role}
        />
      </List>
    );
};

ListComponent.defaultProps = {
    loans: [],
    role: PropTypes.string,
};

ListComponent.propTypes = {
    loans: PropTypes.arrayOf(
        PropTypes.shape({
            amount: PropTypes.number,
            coefficient: PropTypes.number,
            dateIssue: PropTypes.string,
            dateMaturity: PropTypes.string,
            totalRepaymentAmount: PropTypes.number,
            id: PropTypes.number,
        })
    ),
    role: PropTypes.string,
};

export default ListComponent;
