import React from 'react';

// types

import { PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  color?: 'default' | PaletteString | SeverityPalette;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outlined' | 'ghost' | 'control' | 'tint' | 'text' | 'link' | 'delete';
} & React.HTMLAttributes<HTMLElement>;

export const CircularProgress: React.FC<Props> = ({
  className,
  color = 'default',
  disabled = false,
  size = 'sm',
  variant,
  ...props
}) => {
  return (
    <span
      className={cn(styles['circular-progress-root'], styles[`circular-progress-root-size-${size}`], className)}
      role='progressbar'
    >
      <svg className={cn(styles['circular-progress-svg'])}>
        <circle
          className={cn(
            styles['circular-progress-track'],
            styles[`circular-progress-track-color-${color}`],
            styles[`circular-progress-track-size-${size}`],
            styles[`circular-progress-track-variant-${variant}-color-${color}`],
            disabled && styles['circular-progress-track-disabled'],
          )}
        />
        <circle
          className={cn(
            styles['circular-progress-indicator'],
            styles[`circular-progress-indicator-color-${color}`],
            styles[`circular-progress-indicator-size-${size}`],
            styles[`circular-progress-indicator-variant-${variant}-color-${color}`],
            disabled && styles['circular-progress-indicator-disabled'],
          )}
        />
      </svg>
    </span>
  );
};
