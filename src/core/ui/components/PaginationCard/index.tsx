import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const PaginationCard: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={styles['pagination-card-container']}>
      <div className={styles['pagination-card']}>{children}</div>
    </div>
  );
};
