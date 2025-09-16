import type { ColumnDef, FilterFn } from '@tanstack/react-table';
import { fuzzyFilter, enumEqualsFilter } from '@/lib/table/fuzzy';

export interface ColumnOptions<TData, TValue = unknown> {
  id: string;
  accessorKey: keyof TData;
  header: string;
  size?: number;
  enableSorting?: boolean;
  enableColumnFilter?: boolean;
}

export interface TextColumnOptions<TData, TValue = unknown> extends ColumnOptions<TData, TValue> {
  filterVariant: 'text';
  placeholder?: string;
  filterFn?: 'fuzzy' | 'includes';
}

export interface EnumColumnOptions<TData, TValue = unknown> extends ColumnOptions<TData, TValue> {
  filterVariant: 'enum';
  enumValues: readonly { label: string; value: string }[];
}

export interface CustomColumnOptions<TData, TValue = unknown> extends ColumnOptions<TData, TValue> {
  cell?: (props: { getValue: () => TValue }) => React.ReactNode;
  filterFn?: FilterFn<TData> | string;
  meta?: Record<string, unknown>;
}

/**
 * Factory pour créer des colonnes typées avec des configurations communes
 */
export class ColumnBuilder<TData> {
  /**
   * Colonne de texte avec filtre fuzzy
   */
  static text<TData>(options: TextColumnOptions<TData, string>): ColumnDef<TData> {
    const { filterFn = 'fuzzy', ...rest } = options;

    return {
      id: rest.id,
      accessorKey: rest.accessorKey as string,
      header: rest.header,
      size: rest.size ?? 150,
      enableSorting: rest.enableSorting ?? true,
      enableColumnFilter: rest.enableColumnFilter ?? true,
      filterFn: filterFn === 'fuzzy' ? (fuzzyFilter as FilterFn<TData>) : 'includesString',
      meta: {
        filterVariant: 'text',
        placeholder: rest.placeholder ?? `Filter by ${rest.header.toLowerCase()}...`,
      },
    };
  }

  /**
   * Colonne enum avec boutons de filtre
   */
  static enum<TData>(options: EnumColumnOptions<TData, string>): ColumnDef<TData> {
    return {
      id: options.id,
      accessorKey: options.accessorKey as string,
      header: options.header,
      size: options.size ?? 120,
      enableSorting: options.enableSorting ?? true,
      enableColumnFilter: options.enableColumnFilter ?? true,
      filterFn: enumEqualsFilter as FilterFn<TData>,
      meta: {
        filterVariant: 'enum',
        enumValues: options.enumValues,
      },
    };
  }

  /**
   * Colonne numérique
   */
  static number<TData>(options: TextColumnOptions<TData, number>): ColumnDef<TData> {
    return {
      id: options.id,
      accessorKey: options.accessorKey as string,
      header: options.header,
      size: options.size ?? 100,
      enableSorting: options.enableSorting ?? true,
      enableColumnFilter: options.enableColumnFilter ?? true,
      filterFn: 'includesString',
      meta: {
        filterVariant: 'text',
        placeholder: options.placeholder ?? `Filter by ${options.header.toLowerCase()}...`,
      },
    };
  }

  /**
   * Colonne personnalisée avec render custom
   */
  static custom<TData, TValue = unknown>(
    options: CustomColumnOptions<TData, TValue>,
  ): ColumnDef<TData, TValue> {
    return {
      id: options.id,
      accessorKey: options.accessorKey as string,
      header: options.header,
      size: options.size ?? 150,
      enableSorting: options.enableSorting ?? true,
      enableColumnFilter: options.enableColumnFilter ?? false,
      ...(options.cell && { cell: options.cell }),
      ...(options.filterFn && { filterFn: options.filterFn }),
      ...(options.meta && { meta: options.meta }),
    };
  }

  /**
   * Colonne de date avec formatting
   */
  static date<TData>(
    options: Omit<CustomColumnOptions<TData, Date>, 'cell'> & {
      dateFormat?: Intl.DateTimeFormatOptions;
    },
  ): ColumnDef<TData, Date> {
    const dateFormat = options.dateFormat ?? {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };

    return this.custom({
      ...options,
      cell: ({ getValue }) => {
        const date = getValue();
        return date.toLocaleDateString('fr-FR', dateFormat);
      },
    });
  }
}

// Export des helpers pour une utilisation plus simple
export const createTextColumn = ColumnBuilder.text;
export const createEnumColumn = ColumnBuilder.enum;
export const createNumberColumn = ColumnBuilder.number;
export const createCustomColumn = ColumnBuilder.custom;
export const createDateColumn = ColumnBuilder.date;
