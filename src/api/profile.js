import fetch from './fetch';

const routes = {
  admin: '/admins',
  manager: '/managers',
};

/**
 * @param role {String}
 * @param id {Number}
 * @return {Promise<any | Response>|null}
 */
const getProfileUser = (role, id) => {
  if (!role) {
    return null;
  }

  const route = routes[role];

  return fetch(`${API_URL}/api/v1${route}/${id}`, 'get');
};

/**
 * @param role {String}
 * @param id {Number}
 * @param body {Object}
 * @return {Promise<any | Response>|null}
 */
const updateProfileUser = (role, id, body) => {
  if (!role) {
    return null;
  }

  const route = routes[role];

  return fetch(`${API_URL}/api/v1${route}/${id}`, 'put', body);
};

/**
 * @param role {String}
 * @param id {Number}
 * @param body {Object}
 * @return {Promise<any | Response>|null}
 */
const updatePasswordsProfileUser = (role, id, body) => {
  if (!role) {
    return null;
  }

  const route = routes[role];

  return fetch(`${API_URL}/api/v1${route}/${id}/change-password`, 'put', body);
};

export default {
  getProfileUser,
  updateProfileUser,
  updatePasswordsProfileUser,
};
