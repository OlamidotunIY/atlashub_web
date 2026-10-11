import type { TransactionResponse } from '@/shared/api/generated';
import { TransactionDirection } from '../value-objects/transaction-direction.enum';
import { TransactionStatus } from '../value-objects/transaction-status.enum';

export interface AccountTransactionProps {
  id: number;
  type?: string;
  status: TransactionStatus | string;
  amount: number;
  fee?: number;
  netAmount?: number;
  currency: string;
  direction?: TransactionDirection | string;
  channel?: string;
  provider?: string;
  reference?: string;
  description?: string;
  createdAt?: string;
  completedAt?: string;
}

export class AccountTransaction {
  constructor(
    public readonly id: number,
    public readonly type?: string,
    public readonly status: TransactionStatus | string = TransactionStatus.PENDING,
    public readonly amount: number = 0,
    public readonly fee: number = 0,
    public readonly netAmount: number = 0,
    public readonly currency: string = 'NGN',
    public readonly direction?: TransactionDirection | string,
    public readonly channel?: string,
    public readonly provider?: string,
    public readonly reference?: string,
    public readonly description?: string,
    public readonly createdAt?: string,
    public readonly completedAt?: string,
  ) {}

  get isCredit(): boolean {
    return this.direction === TransactionDirection.CREDIT || this.direction === 'CREDIT';
  }

  get isDebit(): boolean {
    return this.direction === TransactionDirection.DEBIT || this.direction === 'DEBIT';
  }

  get isSuccess(): boolean {
    return this.status === TransactionStatus.SUCCESS || this.status === 'SUCCESS';
  }

  static fromJson(data: TransactionResponse): AccountTransaction {
    return new AccountTransaction(
      data.id ?? 0,
      data.type,
      (data.status as TransactionStatus) ?? TransactionStatus.PENDING,
      data.amount ?? 0,
      data.fee ?? 0,
      data.netAmount ?? (data.amount ?? 0),
      data.currency ?? 'NGN',
      data.direction,
      data.channel,
      data.provider,
      data.reference,
      data.description,
      data.createdAt,
      data.completedAt,
    );
  }
}
