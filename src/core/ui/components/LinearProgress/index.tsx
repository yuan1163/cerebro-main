import React from 'react';

// types

import { BrandPalette, SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  color?: BrandPalette | SeverityPalette;
  size?: 'sm' | 'md' | 'lg';
  totalValue?: number;
  value?: number;
} & React.HTMLAttributes<HTMLElement>;

export const LinearProgress: React.FC<Props> = ({
  className,
  color = 'primary',
  size = 'md',
  totalValue = 1,
  value = 0,
  ...props
}) => {
  const progressBarWidth = Math.floor((value * 100) / totalValue) || 0;
  return (
    <div
      aria-valuenow={progressBarWidth}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        styles['linear-progress'],
        styles[`linear-progress-color`],
        styles[`linear-progress-size-${size}`],
        className,
      )}
      role='progressbar'
      {...props}
    >
      <span
        className={cn(
          styles['linear-progress-bar'],
          styles[`linear-progress-bar-color-${color}`],
          styles[`linear-progress-bar-size-${size}`],
        )}
        style={{ width: `${progressBarWidth}%` }}
      />
    </div>
  );
};
