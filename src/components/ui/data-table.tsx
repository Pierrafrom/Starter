import * as React from 'react';
import type {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  Table,
  VisibilityState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { fuzzyFilter } from '@/lib/table/fuzzy';

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Enable global fuzzy search across columns that allow it */
  enableGlobalFilter?: boolean;
  /** Toolbar element that will receive { table, globalFilter, setGlobalFilter } */
  toolbar?: React.ReactElement<{
    table?: Table<TData>;
    globalFilter?: string;
    setGlobalFilter?: (value: string) => void;
  }>;
  /** Initial page size */
  pageSize?: number;
  /** Render footer (e.g., pagination) with the table instance */
  footer?: (table: Table<TData>) => React.ReactNode;
  className?: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  enableGlobalFilter = true,
  toolbar,
  pageSize = 10,
  footer,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
    },
    onSortingChange: (updater) => {
      // default update
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      // keep "last clicked" as highest priority: move last changed id to end
      // We store nothing here—priority is enforced by the onClick below
      setSorting(next);
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    // Multi-sort UX: every click is treated as multi-sort
    enableMultiSort: true,
    isMultiSortEvent: () => true,

    // Global fuzzy search
    ...(enableGlobalFilter && { globalFilterFn: fuzzyFilter as FilterFn<TData> }),

    initialState: {
      pagination: { pageSize },
    },
  });

  /** Ensure last-clicked column becomes highest-priority in multi sort */
  const handleSortClick = (colId: string, handler?: (event: unknown) => void) => {
    handler?.({}); // toggles sort for that column (multi)

    // After the handler has updated sorting, reorder to make this column highest priority
    setTimeout(() => {
      table.setSorting((currentSorting) => {
        const found = currentSorting.find((s) => s.id === colId);
        if (!found) return currentSorting;

        // Remove the clicked column and add it at the end (highest priority)
        const others = currentSorting.filter((s) => s.id !== colId);
        return [...others, found];
      });
    }, 0);
  };

  return (
    <div className={className}>
      {/* Toolbar slot */}
      {toolbar &&
        React.cloneElement(toolbar, {
          table,
          globalFilter,
          setGlobalFilter,
        })}

      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            {table.getHeaderGroups().map((hg) => (
              <React.Fragment key={hg.id}>
                {/* Header row with sortable headers */}
                <tr>
                  {hg.headers.map((h) => (
                    <th key={h.id} className="px-3 py-2 text-left font-medium">
                      {h.isPlaceholder ? null : (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 select-none"
                          onClick={() =>
                            handleSortClick(h.column.id, h.column.getToggleSortingHandler())
                          }
                          title={h.column.getCanSort() ? 'Sort (multi-sort enabled)' : undefined}
                          disabled={!h.column.getCanSort()}
                        >
                          {flexRender(h.column.columnDef.header, h.getContext())}
                          {(() => {
                            const sortedBy = h.column.getIsSorted();
                            if (!sortedBy) return null;

                            // Find sort priority (index in the sorting array)
                            const sortIndex = sorting.findIndex((s) => s.id === h.column.id);
                            const priority = sortIndex >= 0 ? sortIndex + 1 : null;

                            return (
                              <span className="inline-flex items-center gap-0.5">
                                <span className="text-xs">{sortedBy === 'asc' ? '↑' : '↓'}</span>
                                {sorting.length > 1 && priority && (
                                  <span className="text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                                    {priority}
                                  </span>
                                )}
                              </span>
                            );
                          })()}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>

                {/* Per-column filter row */}
                <tr>
                  {hg.headers.map((h) => {
                    if (h.isPlaceholder) return <th key={h.id} />;
                    const col = h.column;
                    const meta = col.columnDef.meta ?? {};
                    const canFilter = col.getCanFilter();
                    if (!canFilter) {
                      return <th key={h.id} className="px-3 py-1" />;
                    }

                    // Render by variant (text | enum)
                    if (meta.filterVariant === 'enum' && Array.isArray(meta.enumValues)) {
                      const current = String(col.getFilterValue() ?? '');
                      return (
                        <th key={h.id} className="px-3 py-1">
                          <div className="flex flex-wrap gap-1">
                            {meta.enumValues.map((opt) => {
                              const active = current === String(opt.value);
                              return (
                                <button
                                  key={String(opt.value)}
                                  type="button"
                                  onClick={() =>
                                    col.setFilterValue(active ? undefined : String(opt.value))
                                  }
                                  className={`rounded border px-2 py-0.5 text-xs ${
                                    active ? 'bg-foreground text-background' : ''
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>
                        </th>
                      );
                    }

                    // Default: text filter (fuzzy if column filterFn = fuzzyFilter)
                    return (
                      <th key={h.id} className="px-3 py-1">
                        <input
                          className="w-full rounded-md border px-2 py-1 text-sm"
                          placeholder={meta.placeholder ?? 'Filter…'}
                          value={(col.getFilterValue() as string) ?? ''}
                          onChange={(e) => col.setFilterValue(e.target.value || undefined)}
                        />
                      </th>
                    );
                  })}
                </tr>
              </React.Fragment>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b last:border-0">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-3 py-6 text-center text-muted-foreground"
                  colSpan={columns.length}
                >
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer slot (e.g., pagination) */}
      {footer?.(table)}
    </div>
  );
}
