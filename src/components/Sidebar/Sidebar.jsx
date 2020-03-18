import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import Sidebar from './styles';
import { Client, Loan, Logout, Manager, Profile } from './icons';

const sidebarItems = [
  {
    key: uuidv4(),
    link: '/clients',
    label: 'Clients',
    icon: Client,
    roles: ['admin', 'manager'],
  },
  {
    key: uuidv4(),
    link: '/loans',
    label: 'Loans',
    icon: Loan,
    roles: ['admin'],
  },
  {
    key: uuidv4(),
    link: '/managers',
    label: 'Managers',
    icon: Manager,
    roles: ['admin'],
  },
  {
    key: uuidv4(),
    link: '/profile',
    label: 'Profile',
    icon: Profile,
    roles: ['admin', 'manager'],
  },
];

const SidebarComponent = props => {
  const { onLogOut, role } = props;

  return (
    <Sidebar>
      <Sidebar.Container>
        <Sidebar.Navigation>
          {sidebarItems
            .filter(e => e.roles.includes(role))
            .map(item => {
              const { key, icon: Icon } = item;

              return (
                <Sidebar.Navigation.Item key={key}>
                  <Link to={item.link}>
                    <Icon />
                  </Link>
                </Sidebar.Navigation.Item>
              );
            })}
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
