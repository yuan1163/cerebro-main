import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  children?: React.ReactNode;
  className?: string;
  divider?: boolean;
  gap?: boolean;
  variant?: 'solid';
} & React.HTMLAttributes<HTMLElement>;

export const AccordionGroup: React.FC<Props> = ({ children, className, divider = false, gap = false, variant }) => {
  return (
    <div
      className={cn(
        className,
        divider && styles['accordion-group-divider'],
        gap && styles['accordion-group-gap'],
        styles['accordion-group'],
        styles[`accordion-group-variant-${variant}`],
      )}
    >
      {children}
    </div>
  );
};
