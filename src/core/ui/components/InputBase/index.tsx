import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/Input/styles.module.scss';

type Props = {
  className?: string;
  disabled?: boolean;
  edge?: 'start' | 'end' | 'between';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  type?: string;
  variant?: 'filled' | 'outlined' | 'standard';
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputBase = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      children,
      className,
      disabled = false,
      edge,
      fullWidth = false,
      icon,
      type = 'text',
      variant = 'filled',
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          styles['input-base-wrapper'],
          fullWidth && styles['input-base-full-width'],
          styles[`input-base-${variant}`],
          disabled && styles[`input-base-${disabled}`],
        )}
      >
        <input
          className={cn(styles['input-base'], styles[`adornment-icon-position-${edge}`], className)}
          disabled={disabled}
          ref={ref}
          type={type}
          {...props}
        />
        {icon}
        {children}
      </div>
    );
  },
);
