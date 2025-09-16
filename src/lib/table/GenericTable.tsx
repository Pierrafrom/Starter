import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { GenericTableProps } from './types';

/**
 * Composant Table générique basé sur shadcn/ui
 * Utilise une configuration pour définir les colonnes et le comportement
 */
export function GenericTable<TData = Record<string, unknown>>({
  data,
  config,
  className,
  loading = false,
}: GenericTableProps<TData>) {
  // Gestion de l'état de chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  // Gestion du cas sans données
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">
          {config.emptyMessage ?? 'Aucune donnée trouvée'}
        </div>
      </div>
    );
  }

  // Fonction pour obtenir la valeur d'une cellule
  const getCellValue = (row: TData, columnKey: string): React.ReactNode => {
    const column = config.columns.find((col) => col.key === columnKey);
    if (!column) return '';

    // Si la colonne a un accessor personnalisé, l'utiliser
    if (column.accessor) {
      return column.accessor(row);
    }

    // Sinon, récupérer la valeur directement depuis l'objet
    return String((row as Record<string, unknown>)[columnKey] ?? '');
  };

  // Fonction pour obtenir les classes CSS de la cellule selon l'alignement
  const getCellClassName = (align?: string): string => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  return (
    <div className={cn('rounded-md border', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {config.columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  getCellClassName(column.align),
                  column.width && `w-[${column.width}]`,
                )}
              >
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => {
            // Essayer d'utiliser un id unique si disponible, sinon utiliser l'index
            const rowData = row as Record<string, unknown>;
            const rowKey = String(rowData['id'] ?? rowData['key'] ?? `row-${index}`);

            return (
              <TableRow key={rowKey}>
                {config.columns.map((column) => (
                  <TableCell
                    key={`${rowKey}-${column.key}`}
                    className={getCellClassName(column.align)}
                  >
                    {getCellValue(row, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
