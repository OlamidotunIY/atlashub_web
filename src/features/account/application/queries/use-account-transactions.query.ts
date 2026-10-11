import { queryClient } from '@/shared/api';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { accountRepository } from '../../infrastructure';
import { accountQueryKeys } from './use-accounts.query';
import type {
  AccountTransactionFilterParams,
  PaginatedAccountTransactions,
} from '@/domains/account';

export function useAccountTransactions(
  accountId?: number,
  params?: AccountTransactionFilterParams,
  options?: Omit<UseQueryOptions<PaginatedAccountTransactions, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(
    {
      ...options,
      queryKey: accountQueryKeys.transactions(accountId ?? 0, params as Record<string, unknown>),
      queryFn: () => {
        if (!accountId) throw new Error('Account ID is required');
        return accountRepository.getAccountTransactions(accountId, params);
      },
      enabled: Boolean(accountId) && (options?.enabled ?? true),
    },
    queryClient,
  );
}
