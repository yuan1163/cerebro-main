import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  flexItem?: boolean;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle' | string;
} & React.HTMLAttributes<HTMLHRElement>;

export const Divider: React.FC<Props> = ({
  className,
  flexItem = false,
  orientation = 'horizontal',
  variant = 'fullWidth',
  ...props
}) => {
  return (
    <hr
      className={cn(
        styles['divider'],
        styles[`divider-${variant}`],
        styles[`divider-${orientation}`],
        flexItem && styles['divider-flexItem'],
        className,
      )}
      {...props}
    />
  );
};
