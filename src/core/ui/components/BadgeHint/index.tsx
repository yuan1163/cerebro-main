import React from 'react';

// types

import { BrandPalette, ColorPalette, PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

// utils

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type BadgeHintProps<T extends React.ElementType> = {
  border?: boolean;
  children?: React.ReactNode;
  className?: string;
  color?: BrandPalette | ColorPalette | PaletteString | SeverityPalette;
  component?: T;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  variant?: 'default' | 'text';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const BadgeHint = <T extends React.ElementType = 'div'>({
  border,
  children,
  className,
  color = 'primary',
  component,
  disabled = false,
  size = 'sm',
  variant = 'default',
  ...props
}: BadgeHintProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof BadgeHintProps<T>>) => {
  const Component = component || 'div';

  return (
    <Component className={styles['badge-hint-container']} {...props}>
      <span
        className={cn(
          border && styles[`badge-hint-border`],
          disabled && styles['badge-hint-disabled'],
          styles['badge-hint'],
          styles[`badge-hint-color-${color}`],
          styles[`badge-hint-size-${size}`],
          styles[`badge-hint-variant-${variant}`],
          className,
        )}
      />
      {children}
    </Component>
  );
};
