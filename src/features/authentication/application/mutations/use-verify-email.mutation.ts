import type { CompleteVerificationRequestDto } from '@/shared/api/generated';
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../../infrastructure';
import { queryClient } from '@/shared/api';

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (payload: CompleteVerificationRequestDto) => authRepository.verifyEmail(payload),
  }, queryClient);
}
