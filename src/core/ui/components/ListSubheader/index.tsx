import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  color?: 'default' | 'inherit' | 'primary';
  disableGutters?: boolean;
  variant?: 'menu' | 'default' | string;
} & React.LiHTMLAttributes<HTMLLIElement>;

export const ListSubheader: React.FC<Props> = ({
  children,
  className,
  color = 'default',
  disableGutters = false,
  variant = 'default',
  ...props
}) => {
  return (
    <div
      className={cn(
        styles['list-subheader'],
        styles[`list-subheader-${variant}`],
        styles[`list-subheader-color-${color}`],
        !disableGutters && styles['list-subheader-gutters'],
        className,
      )}
    >
      {children}
    </div>
  );
};
