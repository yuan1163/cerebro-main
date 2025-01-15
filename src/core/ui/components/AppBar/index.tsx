import React from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Grid } from '@core/ui/components/Grid';

type Props = {
  className?: string;
  color?: 'inherit' | 'primary' | 'secondary' | 'transparent';
  position?: 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';
} & React.HTMLAttributes<HTMLElement>;

export const AppBar: React.FC<Props> = ({ className, children, color = 'transparent', position, ...props }) => {
  return (
    <Grid
      className={cn(
        styles['app-bar'],
        styles[`app-bar-color-${color}`],
        position && styles[`app-bar-position-${position}`],
        className,
      )}
      component='header'
      direction='column'
      {...props}
    >
      {children}
    </Grid>
  );
};
