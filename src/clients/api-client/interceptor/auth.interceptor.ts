import { AUTH_HEADER, BEARER_PREFIX } from '@org/shared';
import { AxiosInstance } from 'axios';

export function applyAuthInterceptor(
  instance: AxiosInstance,
  options?: {
    getToken: () => string | null;
    onTokenRefresh: () => Promise<string>;
  },
) {
  instance.interceptors.request.use((config) => {
    const token = options?.getToken();

    if (token) {
      config.headers[AUTH_HEADER] = `${BEARER_PREFIX}${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      if (
        error.response?.status === 401 && 
        !originalRequest._retried && 
        !originalRequest.url?.includes('/auth/refresh')
      ) {
        originalRequest._retried = true;
        try {
          const newToken = await options?.onTokenRefresh();
          originalRequest.headers[AUTH_HEADER] = `${BEARER_PREFIX}${newToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
}
