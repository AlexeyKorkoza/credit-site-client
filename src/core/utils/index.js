/**
 * @param {object} response
 * @return {array}
 */
export const transformResponse = response =>
  Object.keys(response).map(item => ({
    [item]: response[item],
  }));

/**
 * @param {object} obj
 * @return {boolean}
 */
export const isEmptyObject = obj => Object.keys(obj).length === 0;
