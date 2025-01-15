import React from 'react';

// types

import { PaletteString, TypographyPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  disabled?: boolean;
  inputId?: string;
  label?: string;
  labelColor?: TypographyPalette | PaletteString;
  size?: 'sm' | 'md' | (string & {});
} & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'size'>;

// & Omit<React.HTMLAttributes<HTMLElement>, 'disabled'>

export const ControlLabel: React.FC<Props> = ({
  children,
  className,
  disabled = false,
  inputId,
  label,
  labelColor = 'typography-primary',
  size = 'sm',
  ...props
}) => {
  return (
    <label
      className={cn(styles['label'], styles[`label-size-${size}`], styles[`label-color-${labelColor}`])}
      htmlFor={inputId}
    >
      {label}
    </label>
  );
};
