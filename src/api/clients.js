import fetch from './fetch';

/**
 * @param id {Number}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const deleteClient = id => {
    return fetch(`${API_URL}/api/v1/clients/${id}`, 'delete')
        .catch(err => console.error(err.message, 'deleteClient'));
};

/**
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const getAllClients = () => {
  return fetch(`${API_URL}/api/v1/clients`, 'get')
      .catch(err => console.error(err.message, 'getAllClients'));
};

/**
 * @param id {Number}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const getClient = id => {
    return fetch(`${API_URL}/api/v1/clients/${id}`, 'get')
        .catch(err => console.error(err.message, 'getClient'));
};

/**
 * @param id {Number}
 * @return {Promise<any | void>}
 */
const getClientLoans = id => {
    return fetch(`${API_URL}/api/v1/clients/${id}/loans`, 'get')
        .catch(err => console.error(err.message, 'getClientLoans'));
};

const markClientForDeletion = id => {
    return fetch(`${API_URL}/api/v1/clients/${id}/deletion`, 'put', {})
        .catch(err => console.error(err.message, 'markClientForDeletion'));
};

/**
 * @param body {Object}
 * @param id {Number | null}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const saveClient = (body, id = null) => {
    if (id) {
        return fetch(`${API_URL}/api/v1/clients/${id}`, 'put', body)
            .catch(err => console.error(err.message, 'saveClient'));
    }

    return fetch(`${API_URL}/api/v1/clients`, 'post', body)
        .catch(err => console.error(err.message, 'saveClient'));
};

export default {
    deleteClient,
    getAllClients,
    getClient,
    getClientLoans,
    markClientForDeletion,
    saveClient,
};
