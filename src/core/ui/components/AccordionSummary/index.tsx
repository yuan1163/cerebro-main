import React from 'react';

// types

import { SurfacePalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Icon } from '@core/ui/components/Icon';

// icons

import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import ChevronUpLineIcon from '@assets/icons/line/chevron-up.svg?component';

export type AccordionSummaryProps<T extends React.ElementType> = {
  className?: string;
  color?: SurfacePalette;
  component?: T;
  disabled?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
  expanded?: boolean;
  size?: 'sm' | 'md' | 'lg';
} & React.HTMLAttributes<HTMLElement>;

export const AccordionSummary = <T extends React.ElementType = 'div'>({
  children,
  className,
  color,
  component,
  disabled = false,
  disableGutters = false,
  divider = false,
  expanded,
  size = 'md',
}: AccordionSummaryProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof AccordionSummaryProps<T>>) => {
  const Component = component || 'div';
  return (
    <Component
      className={cn(
        disabled && styles['accordion-summary-disabled'],
        disableGutters && styles['accordion-summary-disable-gutters'],
        divider && styles['accordion-summary-divider'],
        styles['accordion-summary'],
        styles[`accordion-summary-color-${color}`],
        styles[`accordion-summary-size-${size}`],
        className,
      )}
      tabIndex={disabled ? -1 : 0}
    >
      <div className={cn(styles['accordion-summary-content'])}>{children}</div>
      <Icon className={styles['icon']} color='icon-secondary' disabled={disabled} variant='plain'>
        {expanded ? <ChevronUpLineIcon /> : <ChevronDownLineIcon />}
      </Icon>
    </Component>
  );
};
