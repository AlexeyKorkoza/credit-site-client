import { fetch } from '../../../core';

/**
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const getAllLoans = () => fetch(`${API_URL}/api/v1/loans`, 'get');

/**
 * @param id {Number}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const getLoan = id => fetch(`${API_URL}/api/v1/loans/${id}`, 'get');

/**
 * @param body {Object}
 * @param id {Number | null}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const saveLoan = (body, id = null) => {
  if (id) {
    return fetch(`${API_URL}/api/v1/loans/${id}`, 'put', body);
  }

  return fetch(`${API_URL}/api/v1/loans`, 'post', body);
};

export { getAllLoans, getLoan, saveLoan };
