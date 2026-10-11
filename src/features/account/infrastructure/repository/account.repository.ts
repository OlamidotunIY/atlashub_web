import {
  Account,
  AccountTransaction,
  type AccountTransactionFilterParams,
  type IAccountRepository,
  type PaginatedAccountTransactions,
} from '@/domains/account';
import type { CreateBusinessAccountRequest } from '@/shared/api/generated';
import { accountApi } from '../rest/account.api';

export class AccountRepository implements IAccountRepository {
  async getAccounts(): Promise<Account[]> {
    const dtoArray = await accountApi.getAccounts();
    return dtoArray.map((dto) => Account.fromJson(dto));
  }

  async getAccountById(id: number): Promise<Account> {
    const dto = await accountApi.getAccountById(id);
    return Account.fromJson(dto);
  }

  async getAccountTransactions(
    accountId: number,
    params?: AccountTransactionFilterParams,
  ): Promise<PaginatedAccountTransactions> {
    const dto = await accountApi.getAccountTransactions(accountId, params);
    const items = (dto.content ?? []).map((tx) => AccountTransaction.fromJson(tx));

    return {
      items,
      pageNumber: dto.pageNumber ?? 0,
      pageSize: dto.pageSize ?? 20,
      totalElements: dto.totalElements ?? items.length,
      totalPages: dto.totalPages ?? 1,
    };
  }

  async createAccount(payload: CreateBusinessAccountRequest): Promise<{ accountId: number }> {
    const response = await accountApi.createAccount(payload);
    return { accountId: response.accountId ?? 0 };
  }
}

/** Singleton for use throughout the feature */
export const accountRepository = new AccountRepository();
