import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../../infrastructure';
import { queryClient } from '@/shared/api';
import type { LoginRequest } from '@/shared/api/generated';

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authRepository.login(credentials),
  }, queryClient);
}
