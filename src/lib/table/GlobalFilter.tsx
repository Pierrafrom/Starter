import React from 'react';

export function GlobalFilter({ globalFilter, setGlobalFilter }: any) {
  return (
    <input
      value={globalFilter ?? ''}
      onChange={(e) => setGlobalFilter(e.target.value)}
      placeholder="Search..."
      style={{ marginBottom: 8 }}
    />
  );
}
