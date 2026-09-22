import type { ChangeTemporaryPasswordRequestDto } from '@/shared/api/generated';
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../../infrastructure';
import { queryClient } from '@/shared/api';

export function useChangeTemporaryPassword() {
  return useMutation({
    mutationFn: (payload: ChangeTemporaryPasswordRequestDto) => authRepository.changeTemporaryPassword(payload),
  }, queryClient);
}
