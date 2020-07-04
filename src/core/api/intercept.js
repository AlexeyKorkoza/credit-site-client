import FetchInterceptor from 'fetch-interceptor';

const interceptor = FetchInterceptor.register({
  onRequestSuccess(response) {
    return response;
  },
  onRequestFailure(response) {
    return response;
  },
});

export default interceptor;
