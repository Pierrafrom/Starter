import { usePeopleQuery } from '@/features/people/api/people.queries';
import { PeopleTable } from '@/features/people/components/PeopleTable';
import { Button } from '@/components/ui/button';

export function PeoplePage() {
  const { data, isLoading, isError, error } = usePeopleQuery();

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p style={{ color: 'crimson' }}>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">People</h1>
        <Button variant="default">Ajouter une personne</Button>
      </div>
      <PeopleTable data={data ?? []} />
    </div>
  );
}
