import type { ExternalBankAccountResponse } from '@/shared/api/generated';

export interface ExternalBankAccountProps {
  id?: number;
  accountName?: string;
  maskedAccountNumber?: string;
  bankName?: string;
  bankCode?: string;
  currency?: string;
  status?: string;
  activatedAt?: string;
}

export class ExternalBankAccount {
  constructor(
    public readonly id?: number,
    public readonly accountName?: string,
    public readonly maskedAccountNumber?: string,
    public readonly bankName?: string,
    public readonly bankCode?: string,
    public readonly currency?: string,
    public readonly status?: string,
    public readonly activatedAt?: string,
  ) {}

  static fromJson(
    data?: ExternalBankAccountResponse | ExternalBankAccountProps,
  ): ExternalBankAccount | undefined {
    if (!data) return undefined;
    return new ExternalBankAccount(
      data.id,
      data.accountName,
      data.maskedAccountNumber,
      data.bankName,
      data.bankCode,
      data.currency,
      data.status,
      data.activatedAt,
    );
  }
}
