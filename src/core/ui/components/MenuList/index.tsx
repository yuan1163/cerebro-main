import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

export type CustomMenuListProps<T extends React.ElementType> = {
  className?: string;
  component?: T;
  disablePadding?: boolean;
  height?: number;
  width?: number;
} & React.HTMLAttributes<HTMLUListElement>;

export const MenuList = <T extends React.ElementType = 'ul'>({
  children,
  className,
  component,
  disablePadding,
  height,
  width,
  ...props
}: CustomMenuListProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CustomMenuListProps<T>>) => {
  const Component = component || 'ul';
  return (
    <Component
      className={cn(
        styles['menu-list'],
        disablePadding && styles['menu-list-disable-padding'],
        styles[`height-${height}`],
        styles[`width-${width}`],
        className,
      )}
      onClick={(event) => event.stopPropagation()}
      role='menu'
      tabIndex={-1}
      {...props}
    >
      {children}
    </Component>
  );
};
