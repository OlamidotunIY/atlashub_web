import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../../infrastructure';
import { queryClient } from '@/shared/api';

export function useRefreshToken() {
  return useMutation({
    mutationFn: (token: string) => authRepository.refreshToken(token),
  }, queryClient);
}
