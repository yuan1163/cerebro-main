import React from 'react';

// types

import { ButtonProps } from '@core/ui/components/Button/buttonProps';

// styles

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/Breadcrumbs/styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';

type Props = {
  className?: string;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  href?: string;
  onClick?: (event: Event) => void;
  startIcon?: React.ReactNode;
  title?: string | number;
} & React.HTMLAttributes<HTMLElement>;

export const Crumb = <T extends React.ElementType = 'button'>({
  children,
  className,
  component,
  disabled,
  href,
  onClick,
  title,
  ...props
}: ButtonProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
  const Component = component || Button;
  return (
    <Component
      className={cn(styles['crumb'], className)}
      component={component}
      disabled={disabled}
      onClick={onClick}
      to={href || '#'}
      variant='text'
      {...props}
    >
      {title}
    </Component>
  );
};
