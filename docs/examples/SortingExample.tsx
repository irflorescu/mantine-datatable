import { sortBy } from 'lodash';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { companies } from '~/data';

export default function SortingExample() {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'name', direction: 'asc' });
  const [records, setRecords] = useState(sortBy(companies, 'name'));

  useEffect(() => {
    const data = sortBy(companies, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus]);

  return (
    <DataTable
      withBorder
      withColumnBorders
      records={records}
      columns={[
        { accessor: 'name', width: '40%', sortable: true },
        { accessor: 'streetAddress', width: '60%' },
        { accessor: 'city', width: 160, sortable: true },
        { accessor: 'state', width: 80, sortable: true },
      ]}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
    />
  );
}
