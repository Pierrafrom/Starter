import type { Person } from '@/features/people/types/people.schema';
import {
  GenericTable,
  createTextColumn,
  createNumberColumn,
  createDateColumn,
  createCustomColumn,
  createBadgeColumn,
  createTableConfig,
  type TableConfig,
} from '@/lib/table';
import { Badge } from '@/components/ui/badge';

interface PeopleTableProps {
  data: Person[];
}

// Composant pour afficher les tags
function TagsList({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return <span className="text-muted-foreground italic">Aucun</span>;
  }

  return (
    <div className="flex gap-1 flex-wrap">
      {tags.map((tag) => (
        <Badge key={tag} variant="outline" className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

// Configuration du tableau des personnes
const peopleTableConfig: TableConfig<Person> = createTableConfig(
  [
    createNumberColumn('id', 'ID', { width: '80px' }),
    createTextColumn('name', 'Nom'),
    createCustomColumn('age', 'Âge', (person: Person) => `${person.age} ans`, { width: '100px' }),
    createBadgeColumn('role', 'Rôle', {
      width: '120px',
      variantMap: (role: Person['role']) => {
        switch (role) {
          case 'Admin':
            return 'destructive';
          case 'Manager':
            return 'default';
          case 'User':
            return 'secondary';
          default:
            return 'outline';
        }
      },
    }),
    createBadgeColumn('isActive', 'Statut', {
      width: '100px',
      variantMap: (isActive: boolean) => (isActive ? 'default' : 'outline'),
      textMap: (isActive: boolean) => (isActive ? 'Actif' : 'Inactif'),
    }),
    createDateColumn('createdAt', 'Créé le', { width: '150px' }),
    createNumberColumn('score', 'Score', { decimals: 1, width: '80px', align: 'right' }),
    createCustomColumn('tags', 'Tags', (person: Person) => <TagsList tags={person.tags} />, {
      width: '200px',
    }),
  ],
  {
    emptyMessage: 'Aucune personne trouvée',
  },
);

export function PeopleTable({ data }: PeopleTableProps) {
  return <GenericTable data={data} config={peopleTableConfig} />;
}
