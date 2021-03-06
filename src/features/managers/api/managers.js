import { fetch } from '../../../core';

/**
 * @param id {Number}
 * @param isBlocked {Boolean}
 * @return {Promise<any | void>}
 */
const blockManager = (id, isBlocked) =>
  fetch(`${API_URL}/api/v1/managers/${id}/block-manager`, 'put', { is_blocked: isBlocked });

/**
 * @param id {Number}
 * @return {Promise<any | void>}
 */
const getManager = id => fetch(`${API_URL}/api/v1/managers/${id}`, 'get');

/**
 * @param id {Number}
 * @return {Promise<any | void>}
 */
const getManagerClients = id => fetch(`${API_URL}/api/v1/managers/${id}/clients`, 'get');

const getManagers = () => fetch(`${API_URL}/api/v1/managers`, 'get');

/**
 * @param body {Object}
 * @param id {Number | null}
 * @return {Promise<any | void>}
 */
const saveManager = (body, id = null) => {
  if (id) {
    return fetch(`${API_URL}/api/v1/managers/${id}/update-profile`, 'put', body);
  }

  return fetch(`${API_URL}/api/v1/managers`, 'post', body);
};

export { blockManager, getManager, getManagerClients, getManagers, saveManager };
