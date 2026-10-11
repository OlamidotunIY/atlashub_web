import { createColumnHelper } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/shared/composites/data-table';
import type { AccountTransaction } from '@/domains/account';
import { TransactionStatusBadgeWidget } from '../../widgets/transaction-status-badge.widget';
import { CurrencyAmountWidget } from '../../widgets/currency-amount.widget';
import { ArrowDownLeftIcon, ArrowUpRightIcon } from '@phosphor-icons/react';

const columnHelper = createColumnHelper<DataTableFeatures, AccountTransaction>();

export const transactionColumns = columnHelper.columns([
  columnHelper.accessor('direction', {
    header: 'Type',
    cell: ({ row }) => {
      const isCredit = row.original.isCredit;
      return (
        <div className="flex items-center gap-2">
          <div
            className={`size-6 rounded-full flex items-center justify-center shrink-0 ${
              isCredit
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {isCredit ? (
              <ArrowDownLeftIcon className="size-3.5" weight="bold" />
            ) : (
              <ArrowUpRightIcon className="size-3.5" weight="bold" />
            )}
          </div>
          <span className="text-[11px] font-semibold uppercase">
            {row.original.direction || 'TRANSFER'}
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor('reference', {
    header: 'Reference',
    cell: ({ getValue, row }) => (
      <div className="flex flex-col">
        <span className="font-mono text-xs font-medium text-foreground">
          {getValue() || `TXN-${row.original.id}`}
        </span>
        <span className="text-[10px] text-muted-foreground capitalize">
          {row.original.channel || 'Standard'}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: ({ getValue }) => (
      <span className="text-xs text-foreground truncate max-w-xs block">
        {getValue() || 'Account Transaction'}
      </span>
    ),
  }),
  columnHelper.accessor('amount', {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <CurrencyAmountWidget
          amount={row.original.amount}
          currency={row.original.currency}
          direction={row.original.direction}
          showDirection
          className="font-semibold text-xs"
        />
      </div>
    ),
  }),
  columnHelper.accessor('fee', {
    header: () => <div className="text-right">Fee</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <CurrencyAmountWidget
          amount={row.original.fee}
          currency={row.original.currency}
          className="text-[11px] text-muted-foreground"
        />
      </div>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ getValue }) => <TransactionStatusBadgeWidget status={getValue()} />,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Date',
    cell: ({ getValue }) => {
      const val = getValue();
      if (!val) return <span className="text-[11px] text-muted-foreground">—</span>;
      const date = new Date(val);
      return (
        <span className="text-[11px] text-muted-foreground">
          {isNaN(date.getTime())
            ? val
            : date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
        </span>
      );
    },
  }),
]);
