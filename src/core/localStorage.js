/**
 * @param key
 * @param isJson
 */
const getItem = (key, isJson = false) => {
    const data = localStorage.getItem(key);

    if (!data) {
        return null;
    }

    return isJson
        ? JSON.parse(data)
        : data;
};

/**
 * @param key
 * @param data
 * @param isJson
 */
const setItem = (key, data, isJson = false) => {
    localStorage.setItem(key,
        isJson
            ? JSON.stringify(data)
            : data
    );
};

/**
 * @param key
 */
const removeItem = key => {
    localStorage.removeItem(key);
};

export default {
    getItem,
    setItem,
    removeItem,
};
