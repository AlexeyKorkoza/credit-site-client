import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { List } from '../../components/Clients';
import { clients, managers } from '../../api';
import { localDb } from '../../services';

class ClientsList extends Component {
    state = {
        clients: [],
        role: '',
    };

    componentDidMount() {
        const { role, id: managerId } = localDb.getDataAuthUser();
        const func = role === 'manager'
            ? managers.getManagerClients
            : clients.getAllClients;

        func(managerId)
            .then(result => {
                this.setState({ clients: result.clients, role });
            });
    }

    render() {
        const { clients, role } = this.state;

        return (
          <List
            clients={clients}
            role={role}
          />
        )
    }
}

export default withRouter(ClientsList);
