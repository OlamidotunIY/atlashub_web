import type { LoginRequestDto } from '@/shared/api/generated';
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../../infrastructure';
import { queryClient } from '@/shared/api';

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginRequestDto) => authRepository.login(credentials),
  }, queryClient);
}
