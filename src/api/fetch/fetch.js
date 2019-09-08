import { localDb } from '../../services';

/**
 * @param url {String}
 * @param method {String}
 * @param data {Object | null}
 * @return {Promise<any | void>}
 */
const senderApiRequest = (url, method, data = null) => {
    const userData = localDb.getDataAuthUser();
    const options = {
        method,
    };
    const headers = new Headers({
        'content-type': 'application/json',
    });

    if (userData) {
        const { accessToken } = userData;
        headers.set('access-token', accessToken);
    }

    options.headers = headers;

    if (method === 'post' || method === 'put') {
        options.body = JSON.stringify(data);
    }

    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw response;
        })
        .catch(error => {
            if (error instanceof Error) {
                return {
                    error,
                }
            }

            return error.json().then(result => {
                // TODO Add Custom Validation Class on frontend and backend
                if (result.errors && result.errors.length > 0) {
                    throw new Error(JSON.stringify({errors: result.errors }));
                }

                throw new Error(result.message);
            })
        })
};

export default senderApiRequest;
