import React from 'react';

// styles

import cn from 'classnames';
import styles from './styles.module.scss';

export type CustomMenuItemProps<T extends React.ElementType> = {
  children?: React.ReactNode;
  className?: string;
  component?: T;
  disablePadding?: boolean;
} & React.LiHTMLAttributes<HTMLLIElement>;

export const MenuItem = <T extends React.ElementType = 'li'>({
  children,
  className,
  component,
  disablePadding,
  ...props
}: CustomMenuItemProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CustomMenuItemProps<T>>) => {
  const Component = component || 'li';
  return (
    <Component
      className={cn(styles['menu-item'], disablePadding && styles['menu-item-disable-padding'], className)}
      role='menuitem'
      {...props}
    >
      {children}
    </Component>
  );
};
