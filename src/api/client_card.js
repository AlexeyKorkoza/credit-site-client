import fetch from './fetch';

const createClientCard = data => {
  return fetch(`${API_URL}/api/v1/clients-cards`, 'post', data);
};

export default {
  createClientCard,
};
