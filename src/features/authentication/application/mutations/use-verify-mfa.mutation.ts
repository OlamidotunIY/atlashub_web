import type { VerifyMfaRequestDto } from '@/shared/api/generated';
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../../infrastructure';
import { queryClient } from '@/shared/api';

export function useVerifyMfa() {
  return useMutation({
    mutationFn: (payload: VerifyMfaRequestDto) => authRepository.verifyMfa(payload),
  }, queryClient);
}
