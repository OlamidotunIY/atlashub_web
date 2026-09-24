import { createQueryKeyFactory, queryClient } from '@/shared/api';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { authRepository } from '../../infrastructure';
import type { AuthAccount } from '@/domains/auth';

export const meQueryKeys = createQueryKeyFactory('me');

export function useMe(
  options?: Omit<UseQueryOptions<AuthAccount, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery(
    {
      ...options,
      queryKey: meQueryKeys.details(),
      queryFn: () => authRepository.getMe(),
    },
    queryClient,
  );
}
