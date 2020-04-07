import fetch from './fetch';

const createClientCard = (data) => fetch(`${API_URL}/api/v1/clients-cards`, 'post', data);

export {
  createClientCard,
};
