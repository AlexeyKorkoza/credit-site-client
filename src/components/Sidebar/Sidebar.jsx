import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from './styles';
import {
    Client,
    Loan,
    Logout,
    Manager,
    Profile,
} from './icons';

const sidebarItems = [
    {
        link: '/clients',
        label: 'Clients',
        icon: Client,
        roles: ['admin', 'manager'],
    },
    {
        link: '/loans',
        label: 'Loans',
        icon: Loan,
        roles: ['admin'],
    },
    {
        link: '/managers',
        label: 'Managers',
        icon: Manager,
        roles: ['admin'],
    },
    {
        link: '/profile',
        label: 'Profile',
        icon: Profile,
        roles: ['admin', 'manager'],
    },
];

const SidebarComponent = props => {
    const {
        onLogOut,
        role,
    } = props;

    return (
      <Sidebar>
        <Sidebar.Container>
          <Sidebar.Navigation>
            {sidebarItems
                .filter(e => e.roles.includes(role))
                .map((item, index) => {
                  const { icon: Icon } = item;

                  return (
                    <Sidebar.Navigation.Item key={index.toString()}>
                      <Link to={item.link}>
                        <Icon />
                      </Link>
                    </Sidebar.Navigation.Item>
                  );
              })
            }
            <Sidebar.Navigation.Item onClick={onLogOut}>
              <Logout />
            </Sidebar.Navigation.Item>
          </Sidebar.Navigation>
        </Sidebar.Container>
      </Sidebar>
    );
};

SidebarComponent.defaultProps = {
    onLogOut: PropTypes.func,
    role: PropTypes.string,
};

SidebarComponent.propTypes = {
    onLogOut: PropTypes.func,
    role: PropTypes.string,
};

export default SidebarComponent;
