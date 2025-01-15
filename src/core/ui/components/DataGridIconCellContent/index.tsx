import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/DataGrid/styles.module.scss';

// components

import { Text } from '@core/ui/components/Text';

type Props = {
  children?: React.ReactNode;
  className?: string;
  severity?: 'error' | 'success' | 'trivial' | 'warning';
  startIcon?: React.ReactNode;
  subtitle?: string;
  title?: string;
} & React.HTMLAttributes<HTMLElement>;

export const DataGridIconCellContent: React.FC<Props> = ({
  children,
  className,
  severity,
  startIcon,
  subtitle,
  title,
  ...props
}) => {
  return (
    <div
      className={cn(
        styles['data-grid-icon-cell-content'],
        severity && styles['data-grid-icon-cell-content-severity'],
        className,
      )}
    >
      {severity && (
        <div
          className={cn(styles['data-grid-icon-cell-severity'], styles[`data-grid-icon-cell-severity-${severity}`])}
        />
      )}
      {startIcon}
      <div className={styles['data-grid-icon-cell-text-content']}>
        <div className={styles['data-grid-icon-cell-text']}>
          <Text component='span' variant='sm' weight='medium'>
            {title}
          </Text>
        </div>
        <div className={styles['data-grid-icon-cell-text']}>
          <Text color='typography-secondary' component='span' variant='sm' weight='normal'>
            {subtitle}
          </Text>
        </div>
      </div>
    </div>
  );
};
