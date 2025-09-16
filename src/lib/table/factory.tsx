import type React from 'react';
import type { ColumnConfig, TableConfig } from './types';
import { Badge } from '@/components/ui/badge';
import type { BadgeProps } from '@/components/ui/badge';

/**
 * Crée une configuration de colonne basique
 */
export function createColumn<TData = Record<string, unknown>>(
  key: string,
  title: string,
  options: Partial<Omit<ColumnConfig<TData>, 'key' | 'title'>> = {},
): ColumnConfig<TData> {
  return {
    key,
    title,
    type: 'text',
    align: 'left',
    ...options,
  };
}

/**
 * Crée une colonne avec un accessor personnalisé
 */
export function createCustomColumn<TData = Record<string, unknown>>(
  key: string,
  title: string,
  accessor: (data: TData) => React.ReactNode,
  options: Partial<Omit<ColumnConfig<TData>, 'key' | 'title' | 'accessor'>> = {},
): ColumnConfig<TData> {
  return {
    key,
    title,
    accessor,
    type: 'custom',
    align: 'left',
    ...options,
  };
}

/**
 * Crée une colonne pour afficher du texte simple depuis une propriété de l'objet
 */
export function createTextColumn<TData = Record<string, unknown>>(
  key: keyof TData,
  title: string,
  options: Partial<Omit<ColumnConfig<TData>, 'key' | 'title' | 'type'>> = {},
): ColumnConfig<TData> {
  return createColumn(key as string, title, {
    type: 'text',
    accessor: (data: TData) => String(data[key] ?? ''),
    ...options,
  });
}

/**
 * Crée une colonne pour afficher des nombres
 */
export function createNumberColumn<TData = Record<string, unknown>>(
  key: keyof TData,
  title: string,
  options: Partial<Omit<ColumnConfig<TData>, 'key' | 'title' | 'type'>> & {
    decimals?: number;
    prefix?: string;
    suffix?: string;
  } = {},
): ColumnConfig<TData> {
  const { decimals = 0, prefix = '', suffix = '', ...rest } = options;

  return createColumn(key as string, title, {
    type: 'number',
    align: 'right',
    accessor: (data: TData) => {
      const value = data[key] as number;
      if (value === null || value === undefined) return 'N/A';
      const formatted = decimals > 0 ? value.toFixed(decimals) : String(value);
      return `${prefix}${formatted}${suffix}`;
    },
    ...rest,
  });
}

/**
 * Crée une colonne pour afficher des dates
 */
export function createDateColumn<TData = Record<string, unknown>>(
  key: keyof TData,
  title: string,
  options: Partial<Omit<ColumnConfig<TData>, 'key' | 'title' | 'type'>> & {
    locale?: string;
    formatOptions?: Intl.DateTimeFormatOptions;
  } = {},
): ColumnConfig<TData> {
  const { locale = 'fr-FR', formatOptions = {}, ...rest } = options;
  const defaultFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    ...formatOptions,
  };

  return createColumn(key as string, title, {
    type: 'date',
    accessor: (data: TData) => {
      const value = data[key] as Date | string | null;
      if (!value) return 'N/A';
      const date = value instanceof Date ? value : new Date(value);
      return new Intl.DateTimeFormat(locale, defaultFormatOptions).format(date);
    },
    ...rest,
  });
}

/**
 * Crée une colonne avec un badge shadcn/ui
 */
export function createBadgeColumn<
  TData = Record<string, unknown>,
  K extends keyof TData = keyof TData,
>(
  key: K,
  title: string,
  options: Partial<Omit<ColumnConfig<TData>, 'key' | 'title' | 'type'>> & {
    variantMap?: (value: TData[K]) => BadgeProps['variant'];
    textMap?: (value: TData[K]) => string;
  } = {},
): ColumnConfig<TData> {
  const { variantMap, textMap, ...rest } = options;

  return createColumn(key as string, title, {
    type: 'badge',
    accessor: (data: TData) => {
      const value = data[key];
      const variant = variantMap ? variantMap(value) : 'default';
      const text = textMap ? textMap(value) : String(value);

      return <Badge variant={variant}>{text}</Badge>;
    },
    ...rest,
  });
}

/**
 * Crée une configuration complète de tableau
 */
export function createTableConfig<TData = Record<string, unknown>>(
  columns: ColumnConfig<TData>[],
  options: Partial<Omit<TableConfig<TData>, 'columns'>> = {},
): TableConfig<TData> {
  return {
    columns,
    emptyMessage: 'Aucune donnée trouvée',
    searchable: false,
    paginated: false,
    pageSize: 10,
    ...options,
  };
}
