import type { CreateBusinessAccountRequest } from '@/shared/api/generated';
import type { Account } from '../entities/account.entity';
import type { AccountTransaction } from '../entities/account-transaction.entity';

export interface AccountTransactionFilterParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface PaginatedAccountTransactions {
  items: AccountTransaction[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface IAccountRepository {
  getAccounts(): Promise<Account[]>;
  getAccountById(id: number): Promise<Account>;
  getAccountTransactions(
    accountId: number,
    params?: AccountTransactionFilterParams,
  ): Promise<PaginatedAccountTransactions>;
  createAccount(payload: CreateBusinessAccountRequest): Promise<{ accountId: number }>;
}
