import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  disabled?: boolean;
  position?: 'start' | 'end';
} & React.HTMLAttributes<HTMLElement>;

export const InputAdornment: React.FC<Props> = ({ children, className, disabled, position = 'start', ...props }) => {
  return (
    <div
      className={cn(
        styles['input-adornment'],
        disabled && styles['input-adornment-disabled'],
        styles[`input-adornment-position-${position}`],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
