import type { ReactTable, RowData } from '@tanstack/react-table';
import { Button } from '@/shared/ui/button';
import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from '@phosphor-icons/react';
import type { DataTableFeatures } from './data-table-features';
import { cn } from '@/shared/lib';

export interface DataTablePaginationProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>;
  className?: string;
}

export function DataTablePagination<TData extends RowData>({
  table,
  className,
}: DataTablePaginationProps<TData>) {
  return (
    <div className={cn('flex items-center justify-between px-2 py-3 text-xs', className)}>
      <div className="text-muted-foreground flex-1">
        {table.getFilteredRowModel().rows.length} total item(s)
      </div>
      <div className="flex items-center space-x-4 lg:space-x-6">
        <div className="flex items-center justify-center font-medium">
          Page {table.state.pagination.pageIndex + 1} of{' '}
          {Math.max(1, table.getPageCount())}
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 border-0"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to first page"
          >
            <CaretDoubleLeftIcon className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 border-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to previous page"
          >
            <CaretLeftIcon className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 border-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Go to next page"
          >
            <CaretRightIcon className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 border-0"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Go to last page"
          >
            <CaretDoubleRightIcon className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
