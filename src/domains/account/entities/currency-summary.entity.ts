export interface CurrencySummaryProps {
  currency: string;
  accountCount: number;
  totalBalance: number;
}

export class CurrencySummary {
  constructor(
    public readonly currency: string,
    public readonly accountCount: number,
    public readonly totalBalance: number,
  ) {}
}
