import React from 'react';

// style

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

type Props = {
  className?: string;
  max?: number;
  min?: number;
  step?: number;
  value: number;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const RangeSlider = React.forwardRef<HTMLInputElement, Props>(
  ({ children, className, step = 1, max = 100, min = 0, value, ...props }, ref) => {
    const percent = ((value - min) / (max - min)) * 100;
    return (
      <div className={cn(styles['slider'])}>
        <span className={cn(styles['slider-rail'])} />
        <span className={cn(styles['slider-track'])} style={{ left: '0%', width: `${percent}%` }} />
        <span className={cn(styles['slider-thumb'])} style={{ left: `${percent}%` }} />
        <input
          aria-orientation='horizontal'
          aria-valuemax={max}
          aria-valuemin={min}
          aria-valuenow={value}
          {...props}
          className={cn(styles['slider-input'])}
          max={max}
          min={min}
          step={step}
          type='range'
          value={value}
        />
      </div>
    );
  },
);
