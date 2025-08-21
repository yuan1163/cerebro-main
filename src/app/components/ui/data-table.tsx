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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fixHeight?: number;
  scrollable?: boolean;
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  fixHeight,
  scrollable,
  onRowClick,
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

  const heightStyle = fixHeight ? { height: `calc(100vh - ${fixHeight}px)` } : {};

  return (
    <>
      <div style={scrollable ? heightStyle : {}}>
        <Scrollbar>
          <Table>
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <tr className='h-5'>
                      <td colSpan={columns.length}></td>
                    </tr>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      {...(onRowClick && { onClick: () => onRowClick(row.original) })}
                      className={cn(onRowClick && 'cursor-pointer hover:bg-primary-50')}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className='py-2 px-[18px]'>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-full text-center'></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </div>
    </>
  );
}
