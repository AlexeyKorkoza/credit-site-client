import { fetch } from '../../../core';
import { localDb } from '../../../services';

/**
 * @param body {Object}
 * @return {Promise<any | void | never>}
 */
const logIn = body => {
  const url = `${API_URL}/auth/login`;

  return fetch(url, 'post', body);
};

/**
 * @return {Promise<any | void>}
 */

const logOut = () => {
  const url = `${API_URL}/auth/logout`;

  return fetch(url, 'get').then(() => {
    localDb.logoutUser('key');
  });
};

export { logIn, logOut };
