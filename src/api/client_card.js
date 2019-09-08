import fetch from './fetch';

const createClientCard = data => {
    return fetch(`${API_URL}/api/v1/clients-cards`, 'post', data)
        .catch(err => console.error(err.message, 'createClientCard'));
};

export default {
    createClientCard,
};
