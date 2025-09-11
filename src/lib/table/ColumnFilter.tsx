import React from 'react';

export function ColumnFilter({ column }: { column: any }) {
  return (
    <input
      value={column.getFilterValue() ?? ''}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Filter...`}
      style={{ width: '100%' }}
    />
  );
}
