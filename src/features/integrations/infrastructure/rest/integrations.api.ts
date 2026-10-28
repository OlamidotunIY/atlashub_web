import { getGlobalApiClient } from '@/shared/api';
import type {
  ProviderConnection,
  ProviderOffering,
  ProviderType,
} from '@/domains/integrations/entities/provider-connection.entity';

const getApi = () => getGlobalApiClient();

export const integrationsApi = {
  getAvailableProviders: async (merchantCountry: string): Promise<ProviderOffering[]> => {
    const res = await getApi().get<ProviderOffering[]>(
      `/api/v1/integrations/providers?merchantCountry=${encodeURIComponent(merchantCountry)}`
    );
    return res.data;
  },

  getConnections: async (): Promise<ProviderConnection[]> => {
    const res = await getApi().get<ProviderConnection[]>('/api/v1/integrations/connections');
    return res.data;
  },

  connectCredential: async (params: {
    provider: ProviderType;
    merchantCountry: string;
    credential: string;
  }): Promise<ProviderConnection> => {
    const res = await getApi().post<ProviderConnection>(
      '/api/v1/integrations/connections/credentials',
      params
    );
    return res.data;
  },

  startStripeOAuth: async (params: {
    merchantCountry: string;
  }): Promise<{ authorizationUrl: string; expiresAt: string }> => {
    const res = await getApi().post<{ authorizationUrl: string; expiresAt: string }>(
      '/api/v1/integrations/providers/stripe/authorization-sessions',
      params
    );
    return res.data;
  },

  verifyAuthorization: async (authorizationId: number): Promise<ProviderConnection> => {
    const res = await getApi().post<ProviderConnection>(
      `/api/v1/integrations/authorizations/${authorizationId}/verify`
    );
    return res.data;
  },

  disconnect: async (connectionId: number): Promise<void> => {
    await getApi().delete(`/api/v1/integrations/connections/${connectionId}`);
  },
};
