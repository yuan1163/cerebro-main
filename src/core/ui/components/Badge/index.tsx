import React from 'react';

// types

import {
  BrandPalette,
  ColorPalette,
  PaletteString,
  SeverityPalette,
  SurfacePalette,
} from '@core/api/typesDesignSystem';

// utils

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type BadgeProps<T extends React.ElementType> = {
  border?: boolean;
  children?: React.ReactNode;
  className?: string;
  color?: BrandPalette | ColorPalette | PaletteString | SeverityPalette | SurfacePalette | 'translucent';
  component?: T;
  disabled?: boolean;
  shape?: 'circular' | 'rounded';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'invariable' | 'plain' | 'solid' | 'tint';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Badge = <T extends React.ElementType = 'div'>({
  border,
  children,
  className,
  color = 'primary',
  component,
  disabled = false,
  shape = 'circular',
  size = 'sm',
  variant = 'solid',
  ...props
}: BadgeProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof BadgeProps<T>>) => {
  const Component = component || 'div';

  return (
    <Component
      className={cn(
        border && styles['badge-border'],
        disabled && styles['badge-disabled'],
        styles['badge'],
        styles[`badge-color-${color}`],
        styles[`badge-shape-${shape}`],
        styles[`badge-size-${size}`],
        styles[`badge-variant-${variant}`],
        className,
      )}
      {...props}
    >
      <span className={cn(styles['label'])}>{children}</span>
    </Component>
  );
};
