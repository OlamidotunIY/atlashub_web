import { createQueryKeyFactory, queryClient } from '@/shared/api';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { accountRepository } from '../../infrastructure';
import type { Account } from '@/domains/account';

export const accountQueryKeys = {
  ...createQueryKeyFactory('accounts'),
  transactions: (accountId: number, params?: Record<string, unknown>) =>
    ['accounts', 'detail', accountId, 'transactions', params ?? {}] as const,
};

export function useAccounts(
  options?: Omit<UseQueryOptions<Account[], Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(
    {
      ...options,
      queryKey: accountQueryKeys.lists(),
      queryFn: () => accountRepository.getAccounts(),
    },
    queryClient,
  );
}
