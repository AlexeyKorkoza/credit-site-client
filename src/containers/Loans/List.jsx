import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';

import { loans } from '../../api';
import { List } from '../../components/Loans';
import { localDb } from '../../services';

class LoansList extends Component{
    state = {
        loans: [],
        role: null,
    };

    static propTypes = {
        history: ReactRouterPropTypes.history.isRequired,
    };

    componentDidMount() {
        const { role } = localDb.getDataAuthUser();

        if (role === 'manager') {
            const { history } = this.props;
            history.push('/loans/add');

            return;
        }

        loans.getAllLoans()
            .then(result => {

                this.setState({ loans: result.loans, role });
            });
    }

    render() {
        const { loans, role } = this.state;

        return (
          <List
            loans={loans}
            role={role}
          />
        )
    }
}

export default withRouter(LoansList);
