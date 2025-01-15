import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const DataGridToolbar: React.FC<Props> = ({ children, className, ...props }) => {
  return <div className={cn(styles['data-grid-toolbar'], className)}>{children}</div>;
};
