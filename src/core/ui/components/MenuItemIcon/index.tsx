import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/MenuItemButton/styles.module.scss';

// components

import { Icon } from '@core/ui/components/Icon';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const MenuItemIcon: React.FC<Props> = ({ children, className }) => {
  return (
    <Icon className={styles['menu-item-icon']} color='icon-secondary' size='xl' variant='tint'>
      {children}
    </Icon>
  );
};
