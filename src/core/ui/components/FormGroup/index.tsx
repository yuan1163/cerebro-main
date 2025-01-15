import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  row?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const FormGroup: React.FC<Props> = ({ children, className, row = false, ...props }) => {
  return <div className={cn(styles['form-group'], row && styles['form-group-row'], className)}>{children}</div>;
};
