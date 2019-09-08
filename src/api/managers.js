import fetch from './fetch';

/**
 * @param id {Number}
 * @return {Promise<any | void>}
 */
const blockManager = id => {
    return fetch(`${API_URL}/api/v1/managers/${id}/block-manager`, 'put', {})
        .catch(err => console.error(err.message, 'blockManager'));
};

/**
 * @param id {Number}
 * @return {Promise<any | void>}
 */
const getManager = id => {
    return fetch(`${API_URL}/api/v1/managers/${id}`, 'get')
        .catch(err => console.error(err.message, 'getManagers'));
};

/**
 * @param id {Number}
 * @return {Promise<any | void>}
 */
const getManagerClients = id => {
    return fetch(`${API_URL}/api/v1/managers/${id}/clients`, 'get')
        .catch(err => console.error(err.message, 'getManagerClients'));
};

const getManagers = () => {
    return fetch(`${API_URL}/api/v1/managers`, 'get')
        .catch(err => console.error(err.message, 'getManagers'));
};

/**
 * @param body {Object}
 * @param id {Number | null}
 * @return {Promise<any | void>}
 */
const saveManager = (body, id = null) => {
  if (id) {
      return fetch(`${API_URL}/api/v1/managers/${id}/update-profile`, 'put', body)
          .catch(err => console.error(err.message, 'updateManager'));
  }

  return fetch(`${API_URL}/api/v1/managers`, 'post', body)
      .catch(err => console.error(err.message, 'saveManager'));
};

export default {
    blockManager,
    getManager,
    getManagerClients,
    getManagers,
    saveManager,
};
