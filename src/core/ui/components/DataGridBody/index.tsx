import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/DataGrid/styles.module.scss';

type Props = {
  className?: string;
  scrollable?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const DataGridBody: React.FC<Props> = ({ children, className, scrollable = false, ...props }) => {
  return (
    <div className={cn(styles['data-grid-body'], scrollable && styles['data-grid-body-scrollable'], className)}>
      {children}
    </div>
  );
};
