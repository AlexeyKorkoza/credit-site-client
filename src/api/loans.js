import fetch from './fetch';

/**
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const getAllLoans = () => {
    return fetch(`${API_URL}/api/v1/loans`, 'get')
        .catch(err => console.error(err.message, 'getAllLoans'));
};

/**
 * @param id {Number}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const getLoan = id => {
    return fetch(`${API_URL}/api/v1/loans/${id}`, 'get')
        .catch(err => console.error(err.message, 'getLoan'));
};

/**
 * @param body {Object}
 * @param id {Number | null}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const saveLoan = (body, id = null) => {
    if (id) {
        return fetch(`${API_URL}/api/v1/loans/${id}`, 'put', body)
            .catch(err => console.error(err.message, 'saveLoan'));
    }

    return fetch(`${API_URL}/api/v1/loans`, 'post', body)
        .catch(err => console.error(err.message, 'saveLoan'));
};

export default {
    getAllLoans,
    getLoan,
    saveLoan,
};
