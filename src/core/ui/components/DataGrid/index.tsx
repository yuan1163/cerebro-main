import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  disableBorder?: boolean;
  disableLastBorder?: boolean;
  size?: 'sm' | 'md' | 'lg';
} & React.HTMLAttributes<HTMLElement>;

export const DataGrid: React.FC<Props> = ({
  children,
  className,
  disableBorder = false,
  disableLastBorder = false,
  size = 'md',
  ...props
}) => {
  return (
    <div
      role='grid'
      className={cn(
        disableLastBorder && styles['data-grid-disable-last-border'],
        disableBorder && styles['data-grid-disable-border'],
        styles['data-grid'],
        styles[`data-grid-size-${size}`],
        className,
      )}
    >
      {children}
    </div>
  );
};
