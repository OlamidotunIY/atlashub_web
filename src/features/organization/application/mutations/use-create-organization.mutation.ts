import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationApi } from '../../infrastructure/rest/organization.api';
import { authApi } from '@/features/authentication/infrastructure/rest/auth.api';
import { authStore } from '@/features/authentication/application/state/auth.store';
import type { CreateOrganizationFormValues } from '../../domain/schemas/create-organization.schema';

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: CreateOrganizationFormValues) => {
      const orgId = await organizationApi.createOrganization(values);
      // Immediately switch into the newly created organization so session gets the active org claim
      const refreshRes = await authApi.switchOrganization({ organizationId: orgId });
      authStore.getState().setTokens(refreshRes.accessToken, refreshRes.refreshToken);
      return orgId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['auth-account'] });
    },
  });
}
