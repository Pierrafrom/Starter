import * as React from 'react';
import type {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { fuzzyFilter } from '@/lib/table/fuzzy';

export interface UseDataTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  enableGlobalFilter?: boolean;
  pageSize?: number;
  initialSorting?: SortingState;
  initialFilters?: ColumnFiltersState;
}

export function useDataTable<TData>({
  data,
  columns,
  enableGlobalFilter = true,
  pageSize = 10,
  initialSorting = [],
  initialFilters = [],
}: UseDataTableOptions<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(initialFilters);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    // Multi-sort configuration
    enableMultiSort: true,
    isMultiSortEvent: () => true,

    // Global fuzzy search
    ...(enableGlobalFilter && { globalFilterFn: fuzzyFilter as FilterFn<TData> }),

    initialState: {
      pagination: { pageSize },
    },
  });

  const handleSortClick = React.useCallback(
    (colId: string, handler?: (event: unknown) => void) => {
      handler?.({});

      // Reorder to make clicked column highest priority
      setTimeout(() => {
        table.setSorting((currentSorting) => {
          const found = currentSorting.find((s) => s.id === colId);
          if (!found) return currentSorting;

          const others = currentSorting.filter((s) => s.id !== colId);
          return [...others, found];
        });
      }, 0);
    },
    [table],
  );

  return {
    table,
    sorting,
    globalFilter,
    setGlobalFilter,
    handleSortClick,
  };
}
