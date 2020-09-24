/**
 * @param {object} data
 * @return {array}
 */
export const transformToValidFormat = data =>
  Object.keys(data).map(item => ({
    [item]: data[item],
  }));

/**
 * @param {object} obj
 * @return {boolean}
 */
export const isEmptyObject = obj => Object.keys(obj).length === 0;
