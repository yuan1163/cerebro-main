import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { NavLink } from 'react-router-dom';

type Props = {
  disabled?: boolean;
  icon?: React.ReactNode;
  iconHover?: React.ReactNode;
  title?: string;
  url: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const DrawerButtonExpanded: React.FC<Props> = ({ disabled, icon, iconHover, url, title, onClick }) => {
  return (
    <NavLink to={url} className={cn(styles['drawer-button-expanded-container'], disabled && styles['disabled'])}>
      {({ isActive }) => (
        <Button
          align='start'
          color={isActive ? 'primary' : 'icon-secondary'}
          component='div'
          className={styles['drawer-button-expanded']}
          disabled={disabled}
          fontSize='sm'
          fontWeight={isActive ? 'semibold' : 'medium'}
          fullWidth
          size='lg'
          startIcon={isActive ? iconHover : icon}
          textColor={isActive ? '' : 'typography-secondary'}
          variant={isActive ? 'tint' : 'ghost'}
        >
          {title}
        </Button>
      )}
    </NavLink>
  );
};
