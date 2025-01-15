import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  borderBottom?: boolean;
  borderTop?: boolean;
  children?: React.ReactNode;
  className?: string;
  disablePadding?: boolean;
  disablePaddingBottom?: boolean;
  disablePaddingTop?: boolean;
  disablePaddingX?: boolean;
  disablePaddingY?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  onClick?: () => void;
  scrollable?: boolean;
  size?: 'xxxxs' | 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
} & React.HTMLAttributes<HTMLElement>;

export const CardContent: React.FC<Props> = ({
  alignItems,
  borderBottom = false,
  borderTop = false,
  children,
  className,
  disablePadding = false,
  disablePaddingBottom = false,
  disablePaddingTop = false,
  disablePaddingX = false,
  disablePaddingY = false,
  fullHeight = false,
  fullWidth = false,
  justifyContent,
  onClick,
  scrollable = false,
  size = 'sm',
  ...props
}) => {
  return (
    <div
      className={cn(
        alignItems && styles[`card-content-align-items-${alignItems}`],
        borderBottom && styles['card-content-border-bottom'],
        borderTop && styles['card-content-border-top'],
        disablePadding && styles['card-content-disable-padding'],
        disablePaddingBottom && styles['card-content-disable-padding-bottom'],
        disablePaddingTop && styles['card-content-disable-padding-top'],
        disablePaddingX && styles['card-content-disable-padding-x'],
        disablePaddingY && styles['card-content-disable-padding-y'],
        fullHeight && styles['card-content-fullHeight'],
        fullWidth && styles['card-content-full-width'],
        justifyContent && styles[`card-content-justify-content-${justifyContent}`],
        scrollable && styles['card-content-scrollable'],
        styles['card-content'],
        styles[`card-content-size-${size}`],
        className,
        onClick && styles['card-content-hover'],
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
