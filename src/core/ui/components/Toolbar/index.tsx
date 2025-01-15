import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  disableGutters?: boolean;
  variant?: 'dense' | 'regular' | string;
} & React.HTMLAttributes<HTMLElement>;

export const Toolbar: React.FC<Props> = ({
  children,
  className,
  disableGutters = false,
  variant = 'regular',
  ...props
}) => {
  return (
    <div
      className={cn(
        styles['toolbar'],
        !disableGutters && styles['toolbar-gutters'],
        styles[`toolbar-${variant}`],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
