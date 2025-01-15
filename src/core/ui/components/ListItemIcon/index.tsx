import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  ariaLabel?: string;
  className?: string;
  gap?: 'small' | 'medium';
  size?: 'small' | 'medium' | 'large' | 'x-large' | 'extra-large' | string;
} & React.HTMLAttributes<HTMLElement>;

export const ListItemIcon: React.FC<Props> = ({
  ariaLabel,
  children,
  className,
  gap = 'medium',
  size = 'medium',
  ...props
}) => {
  return (
    <div
      aria-label={ariaLabel}
      className={cn(
        styles['list-item-icon'],
        styles[`list-item-icon-size-${size}`],
        styles[`list-item-icon-gap-${gap}`],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
