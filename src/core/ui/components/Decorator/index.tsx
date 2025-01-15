import React from 'react';

// types

import { BrandPalette, ColorPalette, IconPalette, PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  children?: React.ReactNode;
  className?: string;
  color?: BrandPalette | ColorPalette | IconPalette | SeverityPalette | PaletteString;
  disabled?: boolean;
  loading?: boolean;
  position?: 'center' | 'end' | 'start';
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
};

export const Decorator: React.FC<Props> = ({
  children,
  className,
  color,
  disabled = false,
  loading = false,
  position = 'start',
  size = 'sm',
}) => {
  return (
    <span
      className={cn(
        !children && styles[`icon-button-${size}`],
        disabled && styles['decorator-disabled'],
        loading && styles['decorator-loading'],
        styles['decorator-icon'],
        styles[`decorator-${position}-icon-size-${size}`],
        styles[`decorator-icon-color-${color}`],
        styles[`decorator-icon-size-${size}`],
        className,
      )}
    >
      {children}
    </span>
  );
};
