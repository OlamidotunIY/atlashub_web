import { createColumnHelper } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/shared/composites/data-table';
import type { Account } from '@/domains/account';
import { AccountStatusBadgeWidget } from '../../widgets/account-status-badge.widget';
import { CurrencyAmountWidget } from '../../widgets/currency-amount.widget';
import { CaretRightIcon } from '@phosphor-icons/react';
import { Badge } from '@/shared/ui/badge';

const columnHelper = createColumnHelper<DataTableFeatures, Account>();

export const accountColumns = columnHelper.columns([
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Account Name',
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex flex-col py-0.5">
        <span className="font-semibold text-foreground text-xs">{row.original.name}</span>
        {row.original.businessName && (
          <span className="text-[11px] text-muted-foreground line-clamp-1">
            {row.original.businessName}
          </span>
        )}
      </div>
    ),
  }),

  columnHelper.accessor('type', {
    id: 'type',
    header: 'Account Type',
    cell: ({ row }) => (
      <span className="inline-flex items-center text-[11px] font-medium text-foreground/80 bg-muted/60 px-2 py-0.5 rounded-md">
        {row.original.formattedType}
      </span>
    ),
  }),

  columnHelper.accessor('currency', {
    id: 'currency',
    header: 'Currency',
    cell: ({ getValue }) => (
      <span className="font-semibold text-[11px] px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground uppercase tracking-wider">
        {getValue()}
      </span>
    ),
  }),

  columnHelper.accessor('availableBalance', {
    id: 'availableBalance',
    header: () => <div className="text-right">Available Balance</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <CurrencyAmountWidget
          amount={row.original.availableBalance}
          currency={row.original.currency}
          className="font-semibold text-xs"
        />
      </div>
    ),
  }),

  columnHelper.accessor('ledgerBalance', {
    id: 'ledgerBalance',
    header: () => <div className="text-right">Ledger Balance</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <CurrencyAmountWidget
          amount={row.original.ledgerBalance}
          currency={row.original.currency}
          className="font-medium text-xs text-muted-foreground"
        />
      </div>
    ),
  }),

  columnHelper.accessor('pendingSettlementBalance', {
    id: 'pendingSettlementBalance',
    header: () => <div className="text-right">Pending Settlement</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <CurrencyAmountWidget
          amount={row.original.pendingSettlementBalance}
          currency={row.original.currency}
          className="text-[11px] text-muted-foreground font-mono"
        />
      </div>
    ),
  }),

  columnHelper.accessor('status', {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 flex-wrap">
        <AccountStatusBadgeWidget status={row.original.status} />
        {row.original.isFrozen && (
          <Badge
            variant="outline"
            className="text-[9px] font-semibold uppercase px-1.5 py-0 bg-blue-500/10 text-blue-500 border-blue-500/20"
          >
            Frozen
          </Badge>
        )}
      </div>
    ),
  }),

  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const dateStr = row.original.createdAt;
      if (!dateStr) return <span className="text-[11px] text-muted-foreground">-</span>;
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(new Date(dateStr));
        return <span className="text-[11px] text-muted-foreground whitespace-nowrap">{formatted}</span>;
      } catch {
        return <span className="text-[11px] text-muted-foreground">{dateStr}</span>;
      }
    },
  }),

  columnHelper.display({
    id: 'actions',
    header: '',
    enableHiding: false,
    cell: () => (
      <div className="flex justify-end text-muted-foreground">
        <CaretRightIcon className="size-3.5" />
      </div>
    ),
  }),
]);
