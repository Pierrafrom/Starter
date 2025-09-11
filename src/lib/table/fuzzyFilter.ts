import { rankItem } from '@tanstack/match-sorter-utils';
import type { Column, Row, Table } from '@tanstack/react-table';

export function fuzzyFilter<TData>(row: Row<TData>, columnId: string, value: unknown) {
  const itemRank = rankItem(String(row.getValue(columnId)), String(value));
  return itemRank.passed;
}
