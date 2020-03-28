import React from 'react';

import { Admin, Manager } from './components';
import useProfile from './hooks';

const rolesComponents = {
  admin: Admin,
  manager: Manager,
};

const Profile = () => {
  const [, , role] = useProfile();

  if (!role) {
    return null;
  }

  const Component = rolesComponents[role];

  return (
    <Component />
  );
};

export default Profile;
