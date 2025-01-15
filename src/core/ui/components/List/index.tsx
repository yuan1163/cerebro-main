import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  dense?: boolean;
} & React.HTMLAttributes<HTMLUListElement>;

export const List: React.FC<Props> = ({ children, className, dense = false, ...props }) => {
  return (
    <ul className={cn(styles['list'], dense && styles['list-dense'], className)} {...props}>
      {children}
    </ul>
  );
};
