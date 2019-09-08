import localStorage from '../core';

const userKey = 'user';

const getDataAuthUser = () => localStorage.getItem(userKey, true);

const authUser = data => {
    localStorage.setItem(userKey, data, true);
};

const logoutUser = () => {
    localStorage.removeItem(userKey);
};

export default {
    getDataAuthUser,
    authUser,
    logoutUser,
};
