import type { FinancialAccountResponse } from '@/shared/api/generated';
import { ExternalBankAccount } from './external-bank-account.entity';
import { CurrencySummary } from './currency-summary.entity';
import { AccountStatus } from '../value-objects/account-status.enum';
import { AccountType } from '../value-objects/account-type.enum';

export interface AccountProps {
  id: number;
  businessName?: string;
  name: string;
  type?: AccountType | string;
  scope?: string;
  currency: string;
  status: AccountStatus | string;
  frozen?: boolean;
  restrictions?: string[];
  ledgerBalance?: number;
  availableBalance?: number;
  pendingSettlementBalance?: number;
  balance?: number;
  balanceAsOf?: string;
  bankAccount?: ExternalBankAccount;
  createdAt?: string;
}

export class Account {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly type?: AccountType | string,
    public readonly scope?: string,
    public readonly currency: string = 'NGN',
    public readonly status: AccountStatus | string = AccountStatus.ACTIVE,
    public readonly restrictions: string[] = [],
    public readonly balance: number = 0,
    public readonly balanceAsOf?: string,
    public readonly bankAccount?: ExternalBankAccount,
    public readonly createdAt?: string,
    public readonly businessName?: string,
    public readonly frozen: boolean = false,
    public readonly availableBalance: number = 0,
    public readonly ledgerBalance: number = 0,
    public readonly pendingSettlementBalance: number = 0,
  ) {}

  get isActive(): boolean {
    return (
      (this.status === AccountStatus.ACTIVE || this.status === 'ACTIVE') &&
      !this.frozen
    );
  }

  get isFrozen(): boolean {
    return Boolean(this.frozen);
  }

  get formattedType(): string {
    if (!this.type) return 'Standard';
    return String(this.type)
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  get accountNumber(): string | undefined {
    return this.bankAccount?.maskedAccountNumber;
  }

  get bankName(): string | undefined {
    return this.bankAccount?.bankName;
  }

  static fromJson(data: FinancialAccountResponse): Account {
    const available = Number(data.availableBalance ?? data.ledgerBalance ?? 0);
    const ledger = Number(data.ledgerBalance ?? available);
    const pending = Number(data.pendingSettlementBalance ?? 0);

    return new Account(
      data.id ?? 0,
      data.name ?? 'Business Account',
      data.type ?? AccountType.DEFAULT,
      data.scope ?? 'BUSINESS',
      data.currency ?? 'NGN',
      (data.status as AccountStatus) ?? AccountStatus.ACTIVE,
      data.restrictions ?? [],
      available,
      data.balanceAsOf,
      ExternalBankAccount.fromJson(data.bankAccount),
      data.createdAt,
      data.businessName,
      Boolean(data.frozen),
      available,
      ledger,
      pending,
    );
  }

  /**
   * Groups a list of accounts by their currency and calculates the count and total balance per currency.
   * Example: 5 accounts (3 NGN, 2 USD) -> 2 CurrencySummary objects
   */
  static groupCurrencies(accounts: Account[]): CurrencySummary[] {
    const currencyMap = new Map<string, { count: number; totalBalance: number }>();

    for (const acc of accounts) {
      const curr = (acc.currency || 'NGN').toUpperCase();
      const current = currencyMap.get(curr) ?? { count: 0, totalBalance: 0 };
      current.count += 1;
      current.totalBalance += acc.availableBalance || acc.balance;
      currencyMap.set(curr, current);
    }

    return Array.from(currencyMap.entries()).map(
      ([currency, data]) => new CurrencySummary(currency, data.count, data.totalBalance),
    );
  }
}
