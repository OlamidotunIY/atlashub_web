import type { AccountTransaction } from '@/domains/account';
import { DataTable } from '@/shared/composites/data-table';
import { transactionColumns } from './columns';
import { ArrowsLeftRightIcon } from '@phosphor-icons/react';

export const transactionColumnLabels: Record<string, string> = {
  direction: 'Type',
  reference: 'Reference',
  description: 'Description',
  amount: 'Amount',
  fee: 'Fee',
  status: 'Status',
  createdAt: 'Date',
};

export interface AccountTransactionsTableProps {
  transactions: AccountTransaction[];
  isLoading?: boolean;
  onReload?: () => void;
  isReloading?: boolean;
  className?: string;
}

export function AccountTransactionsTable({
  transactions,
  isLoading = false,
  onReload,
  isReloading = false,
  className,
}: AccountTransactionsTableProps) {
  return (
    <DataTable
      columns={transactionColumns}
      data={transactions}
      isLoading={isLoading}
      isReloading={isReloading}
      onReload={onReload}
      columnLabels={transactionColumnLabels}
      searchKey="reference"
      searchPlaceholder="Filter transactions by reference..."
      emptyIcon={ArrowsLeftRightIcon}
      emptyHeading="No transactions found"
      emptyDescription="There are no posted credits, debits, or transfers recorded for this account."
      className={className}
    />
  );
}
