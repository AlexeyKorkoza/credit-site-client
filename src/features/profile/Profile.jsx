import React, { useContext } from 'react';

import { Admin, Manager } from './components';
import { UserContext } from '../../core';

const rolesComponents = {
  admin: Admin,
  manager: Manager,
};

const Profile = () => {
  const context = useContext(UserContext);
  const { role } = context;
  console.log(context);

  if (!role) {
    return null;
  }

  const Component = rolesComponents[role];

  return (
    <Component />
  );
};

export default Profile;
