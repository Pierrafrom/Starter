import type { ColumnDef } from '@tanstack/react-table';
import { ColumnFilter } from '@/lib/table/ColumnFilter';
import type { Person } from '../types/people.schema';

export const peopleColumns: ColumnDef<Person>[] = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
    enableColumnFilter: true,
    headerClassName: 'name',
  },
  { accessorKey: 'age', header: 'Age' },
  {
    accessorKey: 'role',
    header: 'Role',
    enableColumnFilter: true,
    cell: (info) => info.getValue(),
  },
  { accessorKey: 'isActive', header: 'Active', cell: (info) => (info.getValue() ? '✅' : '—') },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  { accessorKey: 'score', header: 'Score' },
  { accessorKey: 'tags', header: 'Tags', cell: (info) => (info.getValue() as string[]).join(', ') },
];
