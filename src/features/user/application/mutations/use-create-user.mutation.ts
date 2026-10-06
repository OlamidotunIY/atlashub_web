import type { RegisterRequest } from '@/shared/api/generated';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '../../infrastructure';
import { queryClient } from '@/shared/api';

export function useCreateUser() {
  return useMutation(
    {
      mutationFn: (req: RegisterRequest) => userApi.createUser(req),
    },
    queryClient,
  );
}
