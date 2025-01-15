import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  dense?: boolean;
  disableGutters?: boolean;
  disablePadding?: boolean;
  disablePaddingX?: boolean;
} & React.LiHTMLAttributes<HTMLLIElement>;

export const ListItem: React.FC<Props> = ({
  children,
  className,
  dense = false,
  disableGutters = false,
  disablePadding = false,
  disablePaddingX = false,
  ...props
}) => {
  return (
    <li
      className={cn(
        styles['list-item'],
        dense && styles['list-item-dense'],
        !disableGutters && styles['list-item-gutters'],
        !disablePadding && styles['list-item-padding'],
        disablePaddingX && styles['list-item-disable-padding-x'],
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
};
