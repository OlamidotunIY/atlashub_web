import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { integrationsApi } from '../../infrastructure/rest/integrations.api';
import type { ProviderType } from '@/domains/integrations/entities/provider-connection.entity';

export function useAvailableProviders(country?: string) {
  return useQuery({
    queryKey: ['integrations', 'providers', country],
    queryFn: () => integrationsApi.getAvailableProviders(country || 'NG'),
    enabled: Boolean(country),
  });
}

export function useConnections() {
  return useQuery({
    queryKey: ['integrations', 'connections'],
    queryFn: () => integrationsApi.getConnections(),
  });
}

export function useConnectCredential() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { provider: ProviderType; merchantCountry: string; credential: string }) =>
      integrationsApi.connectCredential(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['integrations', 'connections'] });
    },
  });
}

export function useDisconnectProvider() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (connectionId: number) => integrationsApi.disconnect(connectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['integrations', 'connections'] });
    },
  });
}

export function useVerifyAuthorization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (authorizationId: number) => integrationsApi.verifyAuthorization(authorizationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['integrations', 'connections'] });
    },
  });
}
