import * as React from 'react';
import type { Header, Column } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

type SortingState = Array<{ id: string; desc: boolean }>;

interface SortableHeaderProps<TData> {
  header: Header<TData, unknown>;
  sorting: SortingState;
  onSortClick: (columnId: string, handler?: (event: unknown) => void) => void;
}

export function SortableHeader<TData>({
  header,
  sorting,
  onSortClick,
}: SortableHeaderProps<TData>) {
  if (header.isPlaceholder) return null;

  const sortedBy = header.column.getIsSorted();
  const sortIndex = sorting.findIndex((s) => s.id === header.column.id);
  const priority = sortIndex >= 0 ? sortIndex + 1 : null;

  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 select-none hover:bg-gray-50 p-1 rounded"
      onClick={() => onSortClick(header.column.id, header.column.getToggleSortingHandler())}
      title={header.column.getCanSort() ? 'Sort (multi-sort enabled)' : undefined}
      disabled={!header.column.getCanSort()}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}

      {sortedBy && (
        <SortIndicator direction={sortedBy} priority={sorting.length > 1 ? priority : null} />
      )}
    </button>
  );
}

interface SortIndicatorProps {
  direction: 'asc' | 'desc';
  priority: number | null;
}

function SortIndicator({ direction, priority }: SortIndicatorProps) {
  return (
    <span className="inline-flex items-center gap-0.5">
      <span className="text-xs" aria-label={`Sorted ${direction}ending`}>
        {direction === 'asc' ? '↑' : '↓'}
      </span>
      {priority && (
        <span
          className="text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-semibold"
          title={`Sort priority: ${priority}`}
        >
          {priority}
        </span>
      )}
    </span>
  );
}
