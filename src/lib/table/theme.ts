/**
 * Configuration des styles et classes CSS pour les tables
 * Permet une personnalisation facile du thème
 */

export const tableTheme = {
  table: {
    container: 'overflow-x-auto rounded-md border border-gray-200 shadow-sm',
    wrapper: 'w-full text-sm',
  },
  header: {
    container: 'bg-gray-50/80 border-b border-gray-200',
    cell: 'px-4 py-3 text-left font-medium text-gray-900',
    sortButton:
      'inline-flex items-center gap-1 select-none hover:bg-gray-100 p-1 rounded transition-colors',
    sortButtonDisabled: 'cursor-not-allowed opacity-50',
  },
  body: {
    row: 'border-b border-gray-100 hover:bg-gray-50/50 transition-colors',
    rowLast: 'last:border-0',
    cell: 'px-4 py-3 text-gray-900',
    emptyState: 'px-4 py-8 text-center text-gray-500',
  },
  filter: {
    row: 'bg-white border-b border-gray-100',
    cell: 'px-4 py-2',
    input:
      'w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors',
    enumButton:
      'rounded-md border border-gray-300 px-2 py-1 text-xs transition-colors hover:bg-gray-50',
    enumButtonActive: 'bg-blue-500 border-blue-500 text-white hover:bg-blue-600',
  },
  sort: {
    indicator: 'text-xs text-gray-600',
    priority:
      'text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-semibold ml-1',
  },
  toolbar: {
    container:
      'mb-4 flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200',
    searchInput:
      'flex-1 min-w-64 rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none',
    button:
      'inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors',
    buttonPrimary: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700',
    multiSortIndicator:
      'text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-200',
    columnVisibility: 'flex flex-wrap items-center gap-2',
    checkboxLabel:
      'flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer hover:text-gray-900',
  },
  pagination: {
    container:
      'mt-4 flex items-center justify-between gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200',
    info: 'text-sm text-gray-600',
    controls: 'flex items-center gap-2',
    select:
      'rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
    button:
      'inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
    pageInfo: 'text-sm text-gray-600 px-3',
  },
  badge: {
    active:
      'inline-flex items-center gap-1.5 rounded-md bg-green-50 px-2 py-1 text-xs text-green-700 ring-1 ring-inset ring-green-600/20',
    inactive:
      'inline-flex items-center gap-1.5 rounded-md bg-red-50 px-2 py-1 text-xs text-red-700 ring-1 ring-inset ring-red-600/20',
    tag: 'inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700 ring-1 ring-inset ring-blue-700/10',
  },
  score: {
    high: 'text-green-600 font-medium',
    medium: 'text-yellow-600 font-medium',
    low: 'text-red-600 font-medium',
    null: 'text-gray-400 italic',
  },
} as const;

export type TableTheme = typeof tableTheme;

/**
 * Hook pour utiliser le thème de table
 * Permet de surcharger facilement certaines classes
 */
export function useTableTheme(overrides?: Partial<TableTheme>) {
  return {
    ...tableTheme,
    ...overrides,
  };
}
