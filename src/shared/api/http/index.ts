import type { ApiClient } from './api-client';

let globalApiClient: ApiClient | null = null;

export const setGlobalApiClient = (client: ApiClient) => {
  globalApiClient = client;
};

export const getGlobalApiClient = (): ApiClient => {
  if (!globalApiClient) {
    throw new Error('API Client not initialized. Call setGlobalApiClient first.');
  }
  return globalApiClient;
};

export * from './api-client';
export * from './errors/index';
export * from './interceptor/index';
export * from './storage.api';