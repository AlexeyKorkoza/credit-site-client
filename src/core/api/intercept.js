import FetchInterceptor from 'fetch-interceptor';

import { localDb } from '../../services';
import fetch from './fetch';

const updateRefreshToken = () => {
  const url = `${API_URL}/auth/refresh-token`;
  const userData = localDb.getDataAuthUser();
  const { refreshToken, role } = userData;

  return fetch(url, 'post', {
    refreshToken,
    role,
  }).then(() => {
    localDb.logoutUser();
    const currentUrl = location.href;
    const formedUrl = new URL(currentUrl);
    const { pathname } = formedUrl;
    window.location.href = `${API_URL}/auth/?return_url=${encodeURIComponent(pathname)}`;
  });
};

const interceptor = FetchInterceptor.register({
  onRequestSuccess(response) {
    return response;
  },
  onRequestFailure(response) {
    if (response.status === 401) {
      updateRefreshToken().then(() => response);
    }

    return response;
  },
});

export default interceptor;
