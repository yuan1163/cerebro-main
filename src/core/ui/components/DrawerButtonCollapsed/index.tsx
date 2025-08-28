import React, { MouseEvent } from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { IconButton } from '@core/ui/components/IconButton';
import { NavLink } from 'react-router-dom';

type Props = {
  disabled?: boolean;
  icon?: React.ReactNode;
  iconHover?: React.ReactNode;
  onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
  title?: string;
  url: string;
};

export const DrawerButtonCollapsed = React.forwardRef<HTMLDivElement, Props>(
  ({ disabled, icon, iconHover, url, title, onMouseEnter, onMouseLeave }, ref) => {
    return (
      <NavLink to={url} className={cn(disabled && styles['disabled'])}>
        {({ isActive }) => (
          <IconButton
            ariaLabel={title}
            className={cn(styles['drawer-button-collapsed'], '')}
            color={isActive ? 'primary' : 'icon-secondary'}
            component='div'
            disabled={disabled}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={ref}
            size='lg'
            variant={isActive ? 'tint' : 'ghost'}
          >
            {isActive ? iconHover : icon}
          </IconButton>
        )}
      </NavLink>
    );
  },
);
