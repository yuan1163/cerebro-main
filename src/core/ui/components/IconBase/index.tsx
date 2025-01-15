import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/Icon/styles.module.scss';

type Props = {
  className?: string;
  color?:
    | 'inherit'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'typography-primary'
    | 'typography-secondary'
    | 'error'
    | 'success'
    | 'warning'
    | 'common-white'
    | string;
  size?: 'inherit' | 'large' | 'medium' | 'small' | string;
} & React.HTMLAttributes<HTMLElement>;

export const IconBase: React.FC<Props> = ({ children, className, color = 'inherit', size = 'medium', ...props }) => {
  return (
    <span
      className={cn(
        styles['icon-base'],
        styles[`icon-base-color-${color}`],
        size !== 'inherit' && styles[`icon-base-size-${size}`],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
