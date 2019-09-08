import { BehaviorSubject } from 'rxjs';

import fetch from './fetch';
import localStorage from '../core';
import { localDb } from '../services';

const currentUserSubject = new BehaviorSubject(localStorage.getItem('user', true));

/**
 * @param body {Object}
 * @return {Promise<any | void | never>}
 */
const logIn = body => {
    const url = `${API_URL}/auth/login`;

    return fetch(url, 'post', body)
        .then(result => {
            currentUserSubject.next(result);

            return result;
        });
};

/**
 * @return {Promise<any | void>}
 */
// TODO remove item data from localstorage
const logOut = () => {
    const url = `${API_URL}/auth/logout`;

    return fetch(url, 'get')
        .then(() => {
            localDb.logoutUser('key');
            currentUserSubject.next({});
        })
        .catch(err => console.error(err.message, 'logOut'));
};

export default {
    currentUserSubject,
    logIn,
    logOut,
};
