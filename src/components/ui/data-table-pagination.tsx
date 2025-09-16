import * as React from 'react';
import type { Table } from '@tanstack/react-table';

export type DataTablePaginationProps<TData> = {
  table: Table<TData>;
  showPageSize?: boolean;
  pageSizeOptions?: number[];
  className?: string;
};

export function DataTablePagination<TData>({
  table,
  showPageSize = true,
  pageSizeOptions = [5, 10, 20, 50],
  className,
}: DataTablePaginationProps<TData>) {
  const total = table.getFilteredRowModel().rows.length;

  return (
    <div className={className}>
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="text-xs text-muted-foreground">{total} result(s)</div>

        <div className="flex items-center gap-2">
          {showPageSize && (
            <select
              className="rounded border px-2 py-1"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n} / page
                </option>
              ))}
            </select>
          )}

          <button
            className="rounded border px-2 py-1 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </button>
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
          </span>
          <button
            className="rounded border px-2 py-1 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
