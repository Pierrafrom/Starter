import { DataTable } from '@/components/ui/data-table';
import { DataTableToolbar } from '@/components/ui/data-table-toolbar';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { peopleColumns } from './PeopleColumns';
import type { Person } from '@/features/people/types/people.schema';

export type PeopleTableProps = {
  data: Person[];
  className?: string;
};

export function PeopleTable({ data, className }: PeopleTableProps) {
  // Create toolbar element - props will be injected by DataTable via cloneElement
  const toolbarElement = <DataTableToolbar {...({} as Parameters<typeof DataTableToolbar>[0])} />;

  return (
    <DataTable
      data={data}
      columns={peopleColumns}
      enableGlobalFilter={true}
      pageSize={10}
      className={className ?? ''}
      toolbar={toolbarElement}
      footer={(table) => <DataTablePagination table={table} />}
    />
  );
}
