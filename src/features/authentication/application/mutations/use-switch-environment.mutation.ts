import { queryClient } from '@/shared/api';
import type { SwitchEnvironmentRequest } from '@/shared/api/generated';
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../../infrastructure';
import { meQueryKeys } from '../queries/use-me.query';
import { authStore } from '../state';

export function useSwitchEnvironment() {
  return useMutation({
    mutationFn: (request: SwitchEnvironmentRequest) => authRepository.switchEnvironment(request),
    onSuccess: (tokens) => {
      authStore.getState().setTokens(tokens.accessToken, tokens.refreshToken, tokens.accessExpiresAt);
      queryClient.invalidateQueries({ queryKey: meQueryKeys.details() });
    },
  }, queryClient);
}
