import React from 'react';

// types

import { BrandPalette, PaletteString, SeverityPalette, TypographyPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  align?: 'left' | 'center' | 'right' | 'justify';
  casing?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
  children?: React.ReactNode;
  className?: string;
  color?: BrandPalette | TypographyPalette | SeverityPalette | PaletteString;
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span' | 'time' | 'label';
  decoration?: 'underline' | 'overline' | 'line-through' | 'no-underline';
  disabled?: boolean;
  gutterBottom?: boolean;
  italic?: boolean;
  letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
  lineHeight?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  overflow?: 'hidden';
  textOverflow?: 'truncate' | 'ellipsis' | 'clip';
  variant?:
    | '7xl'
    | '6xl'
    | '5xl'
    | '4xl'
    | '3xl'
    | '2xl'
    | 'xl'
    | 'lg'
    | 'base'
    | 'md'
    | 'sm'
    | 'xs'
    | 'xxs'
    | 'paragraph-sm'
    | 'paragraph-md'
    | 'paragraph-lg';
  verticalAlign?: 'baseline' | 'top' | 'middle' | 'bottom' | 'text-top' | 'text-bottom' | 'sub' | 'super';
  weight?:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black'
    | (string & {});
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap';
  wordBreak?: 'normal' | 'words' | 'all';
};

export const Text: React.FC<Props> = ({
  align,
  casing,
  children,
  className,
  color = 'typography-primary',
  component = 'p',
  decoration,
  disabled = false,
  gutterBottom = false,
  italic = false,
  letterSpacing,
  lineHeight,
  overflow,
  textOverflow,
  variant = 'base',
  verticalAlign,
  weight = 'normal',
  whiteSpace,
  wordBreak,
  ...props
}) => {
  const componentProps = {
    className: cn(
      disabled && styles['text-disabled'],
      gutterBottom && styles[`text-${variant}-gutter-bottom`],
      italic && styles['text-italic'],
      styles[`font-weight-${weight}`],
      styles[`letter-spacing-${letterSpacing}`],
      styles[`line-height-${lineHeight}`],
      styles[`text-align-${align}`],
      styles[`text-color-${color}`],
      styles[`text-decoration-${decoration}`],
      styles[`text-overflow-${overflow}`],
      styles[`text-overflow-${textOverflow}`],
      styles[`text-transform-${casing}`],
      styles[`text-variant-${variant}`],
      styles[`text`],
      styles[`vertical-align-${verticalAlign}`],
      styles[`white-space-${whiteSpace}`],
      styles[`word-break-${wordBreak}`],
      className,
    ),
    ...props,
  };
  const componentChildren = [children];
  return React.createElement(component, componentProps, componentChildren);
};
