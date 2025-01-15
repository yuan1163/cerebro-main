import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/DataGrid/styles.module.scss';

type CustomRowProps<T extends React.ElementType> = {
  className?: string;
  clickable?: boolean;
  component?: T;
  disableHover?: boolean;
  rowId?: any;
} & React.HTMLAttributes<HTMLElement>;

export const DataGridRow = <T extends React.ElementType = 'div'>({
  children,
  className,
  clickable,
  component,
  disableHover = false,
  rowId,
  ...props
}: CustomRowProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CustomRowProps<T>>) => {
  const Component = component || 'div';

  return (
    <Component
      id={rowId}
      role='row'
      className={cn(
        styles['data-grid-row'],
        clickable && styles['data-grid-row-clickable'],
        disableHover && styles['data-grid-row-disable-hover'],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
