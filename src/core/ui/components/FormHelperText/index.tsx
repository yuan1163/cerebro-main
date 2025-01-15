import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const FormHelperText: React.FC<Props> = ({
  children,
  className,
  disabled = false,
  error = false,
  required = false,
  ...props
}) => {
  return (
    <p
      className={cn(
        styles['form-helper-text'],
        disabled && styles['disabled'],
        error && styles['error'],
        required && styles['required'],
      )}
    >
      {children}
    </p>
  );
};
