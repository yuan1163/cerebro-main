import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { CardContent } from '@core/ui/components/CardContent';

type Props = {
  borderTop?: boolean;
  children?: React.ReactNode;
  className?: string;
  disablePaddingTop?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
} & React.HTMLAttributes<HTMLElement>;

export const CardActions: React.FC<Props> = ({
  borderTop = false,
  children,
  className,
  disablePaddingTop = false,
  size = 'sm',
  ...props
}) => {
  return (
    <CardContent
      borderTop={borderTop}
      className={cn(styles['card-actions'], className)}
      disablePaddingTop={disablePaddingTop}
      size={size}
    >
      {children}
    </CardContent>
  );
};
