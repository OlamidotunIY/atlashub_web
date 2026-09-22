import { createQueryKeyFactory, queryClient } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { userRepository } from '../../infrastructure';

export const userQueryKeys = createQueryKeyFactory('user');

export function useUserById(id: string) {
  return useQuery(
    {
      queryKey: userQueryKeys.detail(id),
      queryFn: () => userRepository.getUserById(id),
    },
    queryClient,
  );
}
