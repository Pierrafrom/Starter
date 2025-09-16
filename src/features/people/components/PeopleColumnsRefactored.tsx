import type { ColumnDef } from '@tanstack/react-table';
import {
  createTextColumn,
  createEnumColumn,
  createNumberColumn,
  createDateColumn,
  createCustomColumn,
} from '@/lib/table/column-builder';
import type { Person } from '@/features/people/types/people.schema';

/**
 * Configuration des colonnes pour la table des personnes
 * Utilise le ColumnBuilder pour une configuration plus maintenable
 */
export const peopleColumns: ColumnDef<Person>[] = [
  // ID - pas de filtre nécessaire
  createNumberColumn<Person>({
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
    size: 80,
    enableColumnFilter: false,
  }),

  // Nom - filtre fuzzy
  createTextColumn<Person>({
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    size: 200,
    filterVariant: 'text',
    filterFn: 'fuzzy',
    placeholder: 'Search names...',
  }),

  // Age - filtre par texte
  createNumberColumn<Person>({
    id: 'age',
    accessorKey: 'age',
    header: 'Age',
    size: 80,
    placeholder: 'Filter by age...',
  }),

  // Rôle - filtre enum avec boutons
  createEnumColumn<Person>({
    id: 'role',
    accessorKey: 'role',
    header: 'Role',
    size: 120,
    filterVariant: 'enum',
    enumValues: [
      { label: 'Admin', value: 'Admin' },
      { label: 'User', value: 'User' },
      { label: 'Manager', value: 'Manager' },
    ],
  }),

  // Statut actif - enum avec render custom
  createCustomColumn<Person, boolean>({
    id: 'isActive',
    accessorKey: 'isActive',
    header: 'Active',
    size: 80,
    enableColumnFilter: true,
    cell: ({ getValue }) => <StatusBadge isActive={getValue()} />,
    meta: {
      filterVariant: 'enum',
      enumValues: [
        { label: 'Active', value: 'true' },
        { label: 'Inactive', value: 'false' },
      ],
    },
  }),

  // Date de création - format français
  createDateColumn<Person>({
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Created At',
    size: 150,
    enableColumnFilter: false,
    dateFormat: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    },
  }),

  // Score - avec gestion des valeurs nulles
  createCustomColumn<Person, number | null>({
    id: 'score',
    accessorKey: 'score',
    header: 'Score',
    size: 100,
    enableColumnFilter: true,
    cell: ({ getValue }) => <ScoreCell value={getValue()} />,
    meta: {
      filterVariant: 'text',
      placeholder: 'Filter by score...',
    },
  }),

  // Tags - filtre fuzzy avec affichage custom
  createCustomColumn<Person, string[]>({
    id: 'tags',
    accessorKey: 'tags',
    header: 'Tags',
    size: 200,
    enableSorting: false,
    enableColumnFilter: true,
    cell: ({ getValue }) => <TagsList tags={getValue()} />,
    meta: {
      filterVariant: 'text',
      placeholder: 'Search in tags...',
    },
  }),
];

// Composants d'affichage séparés pour la réutilisabilité
function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 ${isActive ? 'text-green-600' : 'text-red-600'}`}
    >
      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}

function ScoreCell({ value }: { value: number | null }) {
  if (value === null) {
    return <span className="text-gray-400 italic">No score</span>;
  }

  const colorClass =
    value >= 80 ? 'text-green-600' : value >= 60 ? 'text-yellow-600' : 'text-red-600';

  return <span className={colorClass}>{value.toFixed(1)}</span>;
}

function TagsList({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return <span className="text-gray-400 italic">No tags</span>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700 ring-1 ring-inset ring-blue-700/10"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
