import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/MenuItem/styles.module.scss';

export type CustomMenuItemProps<T extends React.ElementType> = {
  children?: React.ReactNode;
  className?: string;
  component?: T;
} & React.HTMLAttributes<HTMLElement>;

export const MenuItemHeader = <T extends React.ElementType = 'div'>({
  children,
  className,
  component,
  ...props
}: CustomMenuItemProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CustomMenuItemProps<T>>) => {
  const Component = component || 'div';
  return (
    <Component className={cn(styles['menu-item'], styles['menu-item-header'], className)} {...props}>
      {children}
    </Component>
  );
};
