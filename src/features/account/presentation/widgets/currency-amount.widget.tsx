import { cn } from '@/shared/lib';

export interface CurrencyAmountWidgetProps {
  amount: number;
  currency?: string;
  direction?: 'CREDIT' | 'DEBIT' | string;
  showDirection?: boolean;
  className?: string;
}

export function formatCurrencyAmount(amount: number, currency: string = 'NGN'): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency.toUpperCase()} ${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}

export function CurrencyAmountWidget({
  amount,
  currency = 'NGN',
  direction,
  showDirection = false,
  className,
}: CurrencyAmountWidgetProps) {
  const isCredit = direction?.toUpperCase() === 'CREDIT';
  const isDebit = direction?.toUpperCase() === 'DEBIT';
  const formatted = formatCurrencyAmount(amount, currency);

  let prefix = '';
  let colorClass = '';

  if (showDirection) {
    if (isCredit) {
      prefix = '+';
      colorClass = 'text-emerald-600 dark:text-emerald-400';
    } else if (isDebit) {
      prefix = '-';
      colorClass = 'text-foreground';
    }
  }

  return (
    <span className={cn('tabular-nums font-medium', colorClass, className)}>
      {prefix}
      {formatted}
    </span>
  );
}
