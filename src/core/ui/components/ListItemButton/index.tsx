import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { ButtonBase } from '@core/ui/components/ButtonBase';

type CustomListButtonProps<T extends React.ElementType> = {
  alignItems?: 'center' | 'start';
  className?: string;
  component?: T;
  dense?: boolean;
  disableGutters?: boolean;
  endIcon?: React.ReactNode;
  justifyContent?: 'start' | 'center' | 'between' | 'around' | 'evenly';
  startIcon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ListItemButton = <T extends React.ElementType = 'button'>({
  alignItems = 'center',
  children,
  className,
  component,
  dense = false,
  disableGutters = false,
  endIcon,
  justifyContent = 'start',
  startIcon,
  ...props
}: CustomListButtonProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CustomListButtonProps<T>>) => {
  const Component = component || ButtonBase;
  return (
    <Component
      className={cn(
        styles['list-item-button'],
        styles[`list-item-button-alignItems-${alignItems}`],
        styles[`list-item-button-justifyContent-${justifyContent}`],
        dense && styles['list-item-button-dense'],
        !disableGutters && styles['list-item-button-gutters'],
        className,
      )}
      {...props}
    >
      {startIcon && <span className={styles['start-icon']}>{startIcon}</span>}
      {children}
      {endIcon && <span className={styles['end-icon']}>{endIcon}</span>}
    </Component>
  );
};
