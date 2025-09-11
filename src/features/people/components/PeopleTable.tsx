import type { Person } from '@/features/people/types/people.schema';
import { Table } from '@/lib/table/Table';
import { peopleColumns } from './peopleColumns';

type Props = { data: Person[] };

export function PeopleTable({ data }: Props) {
  return <Table<Person> data={data} columns={peopleColumns} />;
}
