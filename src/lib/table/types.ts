import type { RowData } from "@tanstack/react-table";

/**
 * Extend TanStack Table's ColumnMeta to carry UI/filter hints.
 * - filterVariant: 'text' | 'enum'
 * - enumValues: options for 'enum' variant
 * - placeholder: optional input placeholder
 */
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "enum";
    enumValues?: readonly { label: string; value: string }[];
    placeholder?: string;
  }
}
