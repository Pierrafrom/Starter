import { usePeopleQuery } from '@/features/people/api/people.queries';
import { PeopleTable } from '@/features/people/components/PeopleTable';

export function PeoplePage() {
  const { data, isLoading, isError, error } = usePeopleQuery();

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p style={{ color: 'crimson' }}>Error: {error.message}</p>;

  return (
    <div style={{ padding: 16 }}>
      <h1>People</h1>
      <PeopleTable data={data ?? []} />
    </div>
  );
}
