import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

export type AccordionDetailsProps<T extends React.ElementType> = {
  className?: string;
  component?: T;
  disableGutters?: boolean;
  disablePadding?: boolean;
  divider?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const AccordionDetails = <T extends React.ElementType = 'div'>({
  children,
  className,
  component,
  disableGutters = false,
  disablePadding = false,
  divider = false,
}: AccordionDetailsProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof AccordionDetailsProps<T>>) => {
  const Component = component || 'div';
  return (
    <Component
      className={cn(
        styles['accordion-details'],
        divider && styles['accordion-details-divider'],
        disableGutters && styles['accordion-details-disable-gutters'],
        disablePadding && styles['accordion-details-disable-padding'],
        className,
      )}
    >
      {children}
    </Component>
  );
};
