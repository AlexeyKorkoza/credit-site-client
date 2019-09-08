import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { managers } from '../../api';
import { List } from '../../components/Managers';

class ManagersList extends Component{
    state = {
        managers: [],
    };

    componentDidMount() {
        managers.getManagers()
            .then(result => {
                this.setState({ managers: result.managers });
            });
    }

    render() {
        const { managers } = this.state;

        return (
          <List
            managers={managers}
          />
        )
    }
}

export default withRouter(ManagersList);
