// Types
export type {
  ColumnConfig,
  TableConfig,
  GenericTableProps,
} from './types';

// Factory functions
export {
  createColumn,
  createCustomColumn,
  createTextColumn,
  createNumberColumn,
  createDateColumn,
  createBadgeColumn,
  createTableConfig,
} from './factory';

// Components
export { GenericTable } from './GenericTable';
