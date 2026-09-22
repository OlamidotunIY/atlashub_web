import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../../infrastructure';
import { queryClient } from '@/shared/api';

export function useResendSetupToken() {
  return useMutation({
    mutationFn: (identifier: string) => authRepository.resendSetupToken(identifier),
  }, queryClient);
}
