import type { Table } from '@tanstack/react-table';

export type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  globalFilter?: string;
  setGlobalFilter?: (v: string) => void;
};

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
}: DataTableToolbarProps<TData>) {
  const handleReset = () => {
    setGlobalFilter?.('');
    table.resetColumnFilters();
    table.resetSorting();
    table.resetColumnVisibility();
    table.resetPageIndex();
  };

  const activeSorts = table.getState().sorting;
  const hasSorting = activeSorts.length > 0;

  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      {/* Global search (fuzzy across allowed columns) */}
      {setGlobalFilter && (
        <input
          className="w-64 rounded-md border px-2 py-1"
          placeholder="Search…"
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter?.(e.target.value)}
        />
      )}

      {/* Multi-sort indicator */}
      {hasSorting && activeSorts.length > 1 && (
        <div className="text-xs text-muted-foreground bg-blue-50 px-2 py-1 rounded">
          Multi-tri actif ({activeSorts.length} colonnes)
        </div>
      )}

      <button
        className="rounded border px-2 py-1"
        type="button"
        onClick={handleReset}
        title="Reset filters, sorting and visibility"
      >
        Reset
      </button>

      {/* Clear sorting only */}
      {hasSorting && (
        <button
          className="rounded border px-2 py-1 text-xs"
          type="button"
          onClick={() => table.resetSorting()}
          title="Clear all sorting"
        >
          Clear sorts
        </button>
      )}

      {/* Column visibility toggles */}
      <div className="ml-auto flex flex-wrap items-center gap-2">
        {table.getAllLeafColumns().map((col) => (
          <label key={col.id} className="flex items-center gap-1 text-xs">
            <input
              type="checkbox"
              checked={col.getIsVisible()}
              onChange={col.getToggleVisibilityHandler()}
            />
            {String(col.columnDef.header ?? col.id)}
          </label>
        ))}
      </div>
    </div>
  );
}
