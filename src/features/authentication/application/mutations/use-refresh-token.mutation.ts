import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../../infrastructure';
import { queryClient } from '@/shared/api';
import { getDeviceFingerprint } from '@/shared/lib';

export function useRefreshToken() {
  return useMutation({
    mutationFn: (token: string) => authRepository.refreshToken({
      refreshToken: token,
      deviceFingerprint: getDeviceFingerprint(),
    }),
  }, queryClient);
}
