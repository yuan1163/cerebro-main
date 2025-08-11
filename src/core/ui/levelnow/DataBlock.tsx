import React from 'react';
import { cn } from '@core/utils/classnames';

type Item = {
  label: string;
  value: string | null;
};

type DataBlockProps = {
  title?: string;
  data?: { label: string; value: string | null }[];
  columns?: number;
  rows?: number;
  labelWidth?: string;
  minHeight?: number;
  padColumns?: boolean;
  className?: string;
  children?: React.ReactNode;
};

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

export default function DataBlock({
  title,
  data,
  columns = 1,
  rows,
  labelWidth,
  minHeight,
  padColumns = false,
  className,
  children,
}: DataBlockProps) {
  const total = data?.length ?? 0;
  const columnsCount = React.useMemo(() => {
    if (rows && rows > 0) return Math.max(1, Math.ceil(total / rows));
    if (columns && columns > 0) return columns;
    return 1;
  }, [columns, rows, total]);

  const rowsPerColumn = React.useMemo(() => {
    if (rows && rows > 0) return rows;
    return Math.max(1, Math.ceil(total / columnsCount));
  }, [rows, total, columnsCount]);

  const columnsData = React.useMemo(() => {
    return chunk<Item>(data || [], rowsPerColumn);
  }, [data, rowsPerColumn]);

  const gridTemplateColumns = columnsCount > 1 ? `auto repeat(${columnsCount - 1}, minmax(0, 1fr))` : 'auto';

  return (
    <section className={cn('flex flex-col gap-5', className)}>
      {title && <h2 className='font-medium text-md tracking-32 text-neutral-900'>{title}</h2>}
      <div
        className='flex flex-col justify-between p-5 rounded-lg bg-neutral-50'
        style={minHeight ? { minHeight } : undefined}
      >
        <div className='grid gap-x-20 gap-y-3' style={{ gridTemplateColumns: gridTemplateColumns }}>
          {columnsData.map((column, colIndex) => {
            const items = padColumns ? [...column, ...Array(rowsPerColumn - column.length).fill(null)] : column;

            return (
              <dl
                key={colIndex}
                className='grid gap-x-10 gap-y-3'
                style={{
                  gridTemplateColumns: `${labelWidth} minmax(0, 1fr)`,
                }}
              >
                {items.map((item, rowIndex) => (
                  <React.Fragment key={`${colIndex}-${rowIndex}`}>
                    {item ? (
                      <>
                        <dt className='text-sm font-medium tracking-wide text-secondary-500'>{item.label}</dt>
                        <dd className='text-sm font-medium tracking-wide truncate text-neutral-900'>
                          {item.value || '-'}
                        </dd>
                      </>
                    ) : (
                      <>
                        <dt className='text-sm font-medium tracking-wide text-secondary-500'>{'\u00A0'}</dt>
                        <dd className='text-sm font-medium tracking-wide text-neutral-900'>{'\u00A0'}</dd>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </dl>
            );
          })}
        </div>
        {children}
      </div>
    </section>
  );
}
