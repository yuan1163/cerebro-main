import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/DataGrid/styles.module.scss';

type Props = {
  className?: string;
  sticky?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const DataGridHead: React.FC<Props> = ({ children, className, sticky = false, ...props }) => {
  return (
    <div className={cn(styles['data-grid-head'], sticky && styles['data-grid-head-sticky'], className)} role='rowgroup'>
      {children}
    </div>
  );
};
