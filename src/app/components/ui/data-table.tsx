import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@app/components/ui/table';
import { useState } from 'react';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { cn } from '@core/utils/classnames';
import { t } from '@core/utils/translate';
// icons
import SearchIcon from '@assets/icons/LevelNOW/search.svg?component';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fixHeight?: number;
  onRowClick?: (row: TData) => void;
  isFiltering?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  fixHeight,
  onRowClick,
  isFiltering,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'eventDate', desc: true }]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const isNoEvents = data.length === 0 && !isFiltering;
  const isNoFilteredEvents = data.length === 0 && isFiltering;

  const heightStyle = fixHeight ? { height: `calc(100vh - ${fixHeight}px)` } : {};

  // No events
  if (isNoEvents) {
    return (
      <div style={heightStyle}>
        <Scrollbar>
          <Table fullHeight>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className='px-0 py-3'>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} className='p-0'>
                  <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='flex items-center justify-center rounded-full w-11 h-11 bg-neutral-100 dark:bg-surface-03'>
                      <SearchIcon />
                    </div>
                    <h3 className='text-[22px] font-semibold text-typography-primary'>No events</h3>
                    <p className='text-[18px] font-medium tracking-36 text-secondary-500'>
                      {t('events.none', 'There are no events here yet.', 'Message displayed when there is no data.')}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Scrollbar>
      </div>
    );
  }

  // No filtered events
  if (isNoFilteredEvents) {
    return (
      <div style={heightStyle}>
        <Scrollbar>
          <Table fullHeight>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className='px-0 py-3'>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} className='p-0'>
                  <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='flex items-center justify-center rounded-full w-11 h-11 bg-neutral-100'>
                      <SearchIcon />
                    </div>
                    <h3 className='text-[22px] font-semibold text-black'>Oops! No events found</h3>
                    <p className='text-[18px] font-medium tracking-36 text-secondary-500'>
                      {t(
                        'events.filter.none',
                        'No events found. Try clearing the filters.',
                        'Message displayed when there is no filtered data.',
                      )}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Scrollbar>
      </div>
    );
  }

  return (
    <>
      <div style={heightStyle}>
        <Scrollbar>
          <Table className='border-separate border-spacing-0'>
            <TableHeader className='sticky top-0 z-10 bg-surface-01 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-border'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className='px-0 py-3 bg-surface-01'>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <tr className='h-5'>
                    <td colSpan={columns.length}></td>
                  </tr>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    {...(onRowClick && { onClick: () => onRowClick(row.original) })}
                    className={cn(onRowClick && 'cursor-pointer hover:bg-primary-50 dark:hover:bg-surface-03')}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className='px-4 py-2'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </div>
    </>
  );
}
