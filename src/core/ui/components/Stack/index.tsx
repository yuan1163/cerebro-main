import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  direction?: // | 'column-reverse'
  | 'column'
    // | 'row-reverse'
    | 'row'
    // | Array<'column-reverse' | 'column' | 'row-reverse' | 'row'>
    | object;
  className?: string;
  fullWidth?: boolean;
  spacing?: Array<number | string> | number | object | string;
} & React.HTMLAttributes<HTMLElement>;

export const Stack: React.FC<Props> = ({
  children,
  className,
  direction = 'column',
  fullWidth = false,
  spacing = 2,
  ...props
}) => {
  let spacingClass;
  if (direction === 'column') {
    spacingClass = `stack-space-y-${spacing}`;
  } else if (direction === 'row') {
    spacingClass = `stack-space-x-${spacing}`;
  }
  return (
    <div
      className={cn(
        styles['stack'],
        styles[`stack-direction-${direction}`],
        styles[`${spacingClass}`],
        fullWidth && styles['stack-full-width'],
        className,
      )}
    >
      {children}
    </div>
  );
};
