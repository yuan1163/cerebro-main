import React from 'react';

// types

import { BrandPalette, PaletteString, SeverityPalette, TypographyPalette } from '@core/api/typesDesignSystem';

export type ButtonProps<T extends React.ElementType> = {
  align?: 'start' | 'center';
  badge?: number;
  children?: React.ReactNode;
  className?: string;
  color?: 'default' | BrandPalette | PaletteString | SeverityPalette;
  component?: T;
  dot?: boolean;
  endIcon?: React.ReactNode;
  fontSize?: 'base' | 'sm' | 'md' | 'lg';
  fontWeight?: 'medium' | 'semibold';
  fullWidth?: boolean;
  iconColor?: 'primary' | 'icon-secondary' | 'secondary-tint-active' | 'white' | 'neutral-900';
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  square?: boolean;
  startIcon?: React.ReactNode;
  textColor?: TypographyPalette | PaletteString;
  variant?: 'solid' | 'outlined' | 'ghost' | 'control' | 'tint' | 'text' | 'link' | 'delete';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
