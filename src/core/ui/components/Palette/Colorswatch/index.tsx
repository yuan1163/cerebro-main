import React from 'react';

// types

import { ColorPalette } from '@core/api/typesDesignSystem';

// style
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  color?: ColorPalette | string;
  id?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Colorswatch = React.forwardRef<HTMLInputElement, Props>(
  ({ className, id, children, color, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          styles['colorswatch'],
          color !== 'secondary' ? styles[`colorswatch-color-${color}`] : 'colorswatch-color-secondary',
          className,
        )}
        id={id}
        type='radio'
        {...props}
      />
    );
  },
);
