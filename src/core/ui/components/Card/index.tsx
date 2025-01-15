import React from 'react';

// types

import {
  BrandPalette,
  ColorPalette,
  PaletteString,
  SeverityPalette,
  SurfacePalette,
} from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';
import stylesPaper from '@core/ui/components/Paper/styles.module.scss';

type CardProps<T extends React.ElementType> = {
  children?: React.ReactNode;
  className?: string;
  color?: 'default' | SurfacePalette | BrandPalette | ColorPalette | PaletteString | SeverityPalette | 'transparent';
  component?: T;
  elevation?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  fullHeight?: boolean;
  fullWidth?: boolean;
  scrollable?: boolean;
  severity?: 'error' | 'success' | 'trivial' | 'warning' | (string & {});
  square?: boolean;
  variant?: 'plain' | 'outlined';
  width?: number | 'modal';
} & React.HTMLAttributes<HTMLElement>;

export const Card = <T extends React.ElementType = 'div'>({
  children,
  className,
  color = 'default',
  component,
  elevation = 'none',
  square,
  fullHeight = false,
  fullWidth = false,
  scrollable = false,
  severity,
  variant = 'plain',
  width,
  ...props
}: CardProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CardProps<T>>) => {
  const Component = component || 'div';
  const isCustomComponent = typeof Component === 'function';
  const customComponentProps = isCustomComponent ? { square } : {};
  return (
    <Component
      className={cn(
        styles['card'],
        severity && styles['card-severity'],
        severity && styles[`card-severity-${severity}`],
        scrollable && styles['card-scrollable'],
        fullHeight && styles['card-full-height'],
        fullWidth && styles['card-full-width'],
        !square && stylesPaper['paper-rounded'],
        stylesPaper['paper'],
        stylesPaper[`paper-variant-${variant}-color-${color}`],
        stylesPaper[`paper-elevation-${elevation}`],
        stylesPaper[`paper-variant-${variant}`],
        width === 'modal' && styles['card-width-modal'],
        className,
      )}
      color={color}
      elevation={elevation}
      style={{ width: `${width}rem` }}
      variant={variant}
      {...customComponentProps}
      {...props}
    >
      {children}
    </Component>
  );
};
