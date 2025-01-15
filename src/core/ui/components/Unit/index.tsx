import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Grid } from '@core/ui/components/Grid';

type Props = {
  className?: string;
  height?: 'full' | 'screen';
  variant?: 'sidebar' | string;
} & React.HTMLAttributes<HTMLElement>;

export const Unit: React.FC<Props> = ({ children, className, height = 'screen', variant }) => {
  return (
    <Grid
      direction='column'
      className={cn(styles['unit'], styles[`unit-height-${height}`], variant && styles[`unit-${variant}`], className)}
    >
      {children}
    </Grid>
  );
};
