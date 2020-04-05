import fetch from '../../../api/fetch';

/**
 * @param id {Number}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const deleteClient = (id) => fetch(`${API_URL}/api/v1/clients/${id}`, 'delete');

/**
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const getAllClients = () => fetch(`${API_URL}/api/v1/clients`, 'get');

/**
 * @param id {Number}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const getClient = (id) => fetch(`${API_URL}/api/v1/clients/${id}`, 'get');

/**
 * @param id {Number}
 * @return {Promise<any | void>}
 */
const getClientLoans = (id) => fetch(`${API_URL}/api/v1/clients/${id}/loans`, 'get');

const markClientForDeletion = (id) => fetch(`${API_URL}/api/v1/clients/${id}/deletion`, 'put', {});

/**
 * @param body {Object}
 * @param id {Number | null}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const saveClient = (body, id = null) => {
  if (id) {
    return fetch(`${API_URL}/api/v1/clients/${id}`, 'put', body);
  }

  return fetch(`${API_URL}/api/v1/clients`, 'post', body);
};

export {
  deleteClient,
  getAllClients,
  getClient,
  getClientLoans,
  markClientForDeletion,
  saveClient,
};
