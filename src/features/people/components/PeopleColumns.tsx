import type { ColumnDef, FilterFn } from '@tanstack/react-table';
import { fuzzyFilter, enumEqualsFilter } from '@/lib/table/fuzzy';
import type { Person } from '@/features/people/types/people.schema';

export const peopleColumns: ColumnDef<Person>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
    size: 80,
    enableSorting: true,
    enableColumnFilter: false, // ID doesn't need filtering
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    size: 200,
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: fuzzyFilter as FilterFn<Person>,
    meta: {
      filterVariant: 'text',
      placeholder: 'Filter by name...',
    },
  },
  {
    id: 'age',
    accessorKey: 'age',
    header: 'Age',
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: 'includesString',
    meta: {
      filterVariant: 'text',
      placeholder: 'Filter by age...',
    },
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Role',
    size: 120,
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: enumEqualsFilter as FilterFn<Person>,
    meta: {
      filterVariant: 'enum',
      enumValues: [
        { label: 'Admin', value: 'Admin' },
        { label: 'User', value: 'User' },
        { label: 'Manager', value: 'Manager' },
      ],
    },
  },
  {
    id: 'isActive',
    accessorKey: 'isActive',
    header: 'Active',
    size: 80,
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: enumEqualsFilter as FilterFn<Person>,
    cell: ({ getValue }) => (
      <span className={getValue() ? 'text-green-600' : 'text-red-600'}>
        {getValue() ? '✓ Active' : '✗ Inactive'}
      </span>
    ),
    meta: {
      filterVariant: 'enum',
      enumValues: [
        { label: 'Active', value: 'true' },
        { label: 'Inactive', value: 'false' },
      ],
    },
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Created At',
    size: 150,
    enableSorting: true,
    enableColumnFilter: false, // Date filtering could be complex
    cell: ({ getValue }) => {
      const date = getValue() as Date;
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
  {
    id: 'score',
    accessorKey: 'score',
    header: 'Score',
    size: 100,
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: 'includesString',
    cell: ({ getValue }) => {
      const score = getValue() as number | null;
      return score !== null ? score.toFixed(1) : '-';
    },
    meta: {
      filterVariant: 'text',
      placeholder: 'Filter by score...',
    },
  },
  {
    id: 'tags',
    accessorKey: 'tags',
    header: 'Tags',
    size: 200,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: fuzzyFilter as FilterFn<Person>,
    cell: ({ getValue }) => {
      const tags = getValue() as string[];
      return tags.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        '-'
      );
    },
    meta: {
      filterVariant: 'text',
      placeholder: 'Filter by tags...',
    },
  },
];