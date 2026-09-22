import { queryClient } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../../infrastructure';
import type { SetupPasswordRequestDto } from '@/shared/api/generated';

export function useSetupPassword() {
  return useMutation({
    mutationFn: (payload: SetupPasswordRequestDto) => authRepository.setupPassword(payload),
  }, queryClient);
}
