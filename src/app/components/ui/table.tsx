import * as React from 'react';
import { Scrollbar } from '@core/ui/components/Scrollbar';
// import { cn } from "@app/lib/utils"
import { cn } from '@core/utils/classnames';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement> & { fullHeight?: boolean }>(
  ({ className, fullHeight, ...props }, ref) => (
    <div className={cn('relative w-full', fullHeight && 'h-full flex flex-col')}>
      <Scrollbar className={fullHeight ? 'flex-1 flex flex-col' : ''}>
        <table
          ref={ref}
          className={cn('w-full caption-bottom text-sm', fullHeight && 'h-full', className)}
          {...props}
        />
      </Scrollbar>
    </div>
  ),
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn('[&_tr]:border-y', className)} {...props} />,
);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0 [&_tr:first-child]:mt-0', className)} {...props} />
  ),
);
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />
  ),
);
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => <tr ref={ref} className={cn('', className)} {...props} />,
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <td ref={ref} className={cn('', className)} {...props} />,
);
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => <caption ref={ref} className={cn('', className)} {...props} />,
);
TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
