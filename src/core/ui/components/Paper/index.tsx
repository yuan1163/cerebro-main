import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { BrandPalette, ColorPalette, PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

type PaperProps<T extends React.ElementType> = {
  children?: React.ReactNode;
  className?: string;
  color?: 'default' | BrandPalette | ColorPalette | PaletteString | SeverityPalette | 'transparent';
  component?: T;
  elevation?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  square?: boolean;
  variant?: 'plain' | 'outlined';
} & React.HTMLAttributes<HTMLElement>;

export const Paper = <T extends React.ElementType = 'div'>({
  children,
  className,
  color = 'default',
  component,
  elevation = 'none',
  square,
  variant = 'plain',
  ...props
}: PaperProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof PaperProps<T>>) => {
  const Component = component || 'div';
  const isCustomComponent = typeof Component === 'function';
  const customComponentProps = isCustomComponent ? { square } : {};
  return (
    <Component
      className={cn(
        !square && styles['paper-rounded'],
        styles['paper'],
        styles[`paper-variant-${variant}-color-${color}`],
        styles[`paper-elevation-${elevation}`],
        styles[`paper-variant-${variant}`],
        className,
      )}
      {...customComponentProps}
      {...props}
    >
      {children}
    </Component>
  );
};
