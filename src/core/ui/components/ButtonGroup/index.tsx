import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/Button/styles.module.scss';

type Props = {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
} & React.HTMLAttributes<HTMLElement>;

export const ButtonGroup: React.FC<Props> = ({ children, className, disabled = false, orientation = 'horizontal' }) => {
  return (
    <div
      role='group'
      className={cn(
        styles['button-group'],
        styles[`button-group-orientation-${orientation}`],
        disabled && styles['button-group-disabled'],
        className,
      )}
    >
      {children}
    </div>
  );
};
