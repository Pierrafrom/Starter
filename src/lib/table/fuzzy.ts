
import { compareItems, rankItem } from "@tanstack/match-sorter-utils";
import type { FilterFn, SortingFn } from "@tanstack/react-table";
import { sortingFns } from "@tanstack/react-table";

// Extend the FilterMeta interface to include itemRank
declare module "@tanstack/react-table" {
  interface FilterMeta {
    itemRank?: import("@tanstack/match-sorter-utils").RankingInfo;
  }
}

/** Fuzzy filter usable per-column and as global filter */
export const fuzzyFilter: FilterFn<unknown> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(String(row.getValue(columnId) ?? ""), String(value ?? ""));
  addMeta?.({ itemRank });
  return itemRank.passed;
};

/** Sort that uses fuzzy rank when available, else alphanumeric */
export const fuzzySort: SortingFn<unknown> = (rowA, rowB, columnId) => {
  const metaA = rowA.columnFiltersMeta[columnId]?.itemRank;
  const metaB = rowB.columnFiltersMeta[columnId]?.itemRank;
  if (metaA && metaB) {
    const res = compareItems(metaA, metaB);
    if (res !== 0) return res;
  }
  return sortingFns.alphanumeric(rowA, rowB, columnId);
};

/** Exact match for enums/booleans/strings */
export const enumEqualsFilter: FilterFn<unknown> = (row, columnId, filterValue) => {
  if (filterValue == null || filterValue === "") return true;
  const cell = row.getValue(columnId);
  // boolean, number, string → compare stringified values
  return String(cell) === String(filterValue);
};
