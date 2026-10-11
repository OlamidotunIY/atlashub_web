import { useMutation } from '@tanstack/react-query';
import { accountRepository } from '../../infrastructure';
import { accountQueryKeys } from '../queries/use-accounts.query';
import { queryClient } from '@/shared/api';
import type { CreateBusinessAccountRequest } from '@/shared/api/generated';

export function useCreateAccount() {
  return useMutation(
    {
      mutationFn: (payload: CreateBusinessAccountRequest) =>
        accountRepository.createAccount(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: accountQueryKeys.all });
      },
    },
    queryClient,
  );
}
