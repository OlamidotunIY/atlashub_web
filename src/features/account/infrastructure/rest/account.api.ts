import { getGlobalApiClient } from '@/shared/api';
import type {
  CreateBusinessAccountRequest,
  CreateBusinessAccountResponse,
  FinancialAccountResponse,
  PageResultTransactionResponse,
} from '@/shared/api/generated';
import type { AccountTransactionFilterParams } from '@/domains/account';

const getApi = () => getGlobalApiClient();

export const accountApi = {
  getAccounts: (): Promise<FinancialAccountResponse[]> =>
    getApi()
      .get<{ data?: FinancialAccountResponse[] }>('/api/v1/pay/accounts')
      .then((r) => r.data.data ?? []),

  getAccountById: (id: number): Promise<FinancialAccountResponse> =>
    getApi()
      .get<{ data?: FinancialAccountResponse }>(`/api/v1/pay/accounts/${id}`)
      .then((r) => {
        if (!r.data.data) {
          throw new Error(`Account with id ${id} not found`);
        }
        return r.data.data;
      }),

  getAccountTransactions: (
    accountId: number,
    params?: AccountTransactionFilterParams,
  ): Promise<PageResultTransactionResponse> =>
    getApi()
      .get<{ data?: PageResultTransactionResponse }>(`/api/v1/pay/accounts/${accountId}/transactions`, {
        params,
      })
      .then((r) => r.data.data ?? {}),

  createAccount: (req: CreateBusinessAccountRequest): Promise<CreateBusinessAccountResponse> =>
    getApi()
      .post<{ data?: CreateBusinessAccountResponse }>('/api/v1/pay/accounts', req)
      .then((r) => r.data.data ?? {}),
};
