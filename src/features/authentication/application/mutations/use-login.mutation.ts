import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../../infrastructure';
import { authStore } from '../state';
import { meQueryKeys } from '../queries/use-me.query';
import { queryClient } from '@/shared/api';
import type { LoginRequest } from '@/shared/api/generated';

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authRepository.login(credentials),
    onSuccess: (tokens) => {
      queryClient.removeQueries({ queryKey: meQueryKeys.details() });
      authStore.getState().setTokens(
        tokens.accessToken,
        tokens.refreshToken,
        tokens.accessExpiresAt,
      );
    },
  }, queryClient);
}
