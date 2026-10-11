import { queryClient } from '@/shared/api';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { accountRepository } from '../../infrastructure';
import { accountQueryKeys } from './use-accounts.query';
import type { Account } from '@/domains/account';

export function useAccount(
  accountId?: number,
  options?: Omit<UseQueryOptions<Account, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(
    {
      ...options,
      queryKey: accountQueryKeys.detail(accountId ?? 0),
      queryFn: () => {
        if (!accountId) throw new Error('Account ID is required');
        return accountRepository.getAccountById(accountId);
      },
      enabled: Boolean(accountId) && (options?.enabled ?? true),
    },
    queryClient,
  );
}
