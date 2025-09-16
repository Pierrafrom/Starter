import type { Column } from '@tanstack/react-table';

interface ColumnFilterProps<TData> {
  column: Column<TData, unknown>;
}

export function ColumnFilter<TData>({ column }: ColumnFilterProps<TData>) {
  const meta = column.columnDef.meta ?? {};
  const canFilter = column.getCanFilter();

  if (!canFilter) {
    return <th className="px-3 py-1" />;
  }

  // Enum filter (buttons)
  if (meta.filterVariant === 'enum' && Array.isArray(meta.enumValues)) {
    return <EnumFilter column={column} options={meta.enumValues} />;
  }

  // Text filter (default)
  return <TextFilter column={column} placeholder={meta.placeholder} />;
}

interface EnumFilterProps<TData> {
  column: Column<TData, unknown>;
  options: readonly { label: string; value: string }[];
}

function EnumFilter<TData>({ column, options }: EnumFilterProps<TData>) {
  const current = String(column.getFilterValue() ?? '');

  return (
    <th className="px-3 py-1">
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => {
          const active = current === String(opt.value);
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => column.setFilterValue(active ? undefined : String(opt.value))}
              className={`rounded border px-2 py-0.5 text-xs transition-colors ${
                active ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-50'
              }`}
              title={`Filter by ${opt.label}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </th>
  );
}

interface TextFilterProps<TData> {
  column: Column<TData, unknown>;
  placeholder?: string;
}

function TextFilter<TData>({ column, placeholder }: TextFilterProps<TData>) {
  return (
    <th className="px-3 py-1">
      <input
        className="w-full rounded-md border px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder ?? 'Filter…'}
        value={(column.getFilterValue() as string) ?? ''}
        onChange={(e) => column.setFilterValue(e.target.value || undefined)}
        title={`Filter by ${placeholder?.toLowerCase() ?? 'value'}`}
      />
    </th>
  );
}
