import type { Person } from '@/features/people/types/people.schema';

type Props = { data: Person[] };

export function PeopleTable({ data }: Props) {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {['ID', 'Name', 'Age', 'Role', 'Active', 'Created', 'Score', 'Tags'].map((h) => (
            <th key={h} style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.id}>
            <td style={{ padding: 8 }}>{p.id}</td>
            <td style={{ padding: 8 }}>{p.name}</td>
            <td style={{ padding: 8 }}>{p.age}</td>
            <td style={{ padding: 8 }}>{p.role}</td>
            <td style={{ padding: 8 }}>{p.isActive ? '✅' : '—'}</td>
            <td style={{ padding: 8 }}>
              {p.createdAt.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              })}
            </td>
            <td style={{ padding: 8 }}>{p.score ?? '—'}</td>
            <td style={{ padding: 8 }}>{p.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
