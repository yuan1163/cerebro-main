import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  color?: string;
  message?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const SnackbarContainer: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={cn(styles['snackbar-container'], className)} {...props}>
      {children}
    </div>
  );
};
