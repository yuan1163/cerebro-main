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
          className={cn(
            styles['drawer-button-expanded'],
            isActive ? 'border-primary-tint-active rounded-[10px]' : 'border-white',
            'tracking-l font-medium',
            'border-3 gap-2.5',
          )}
          disabled={disabled}
          fontSize='sm'
          fontWeight={isActive ? 'semibold' : 'medium'}
          fullWidth
          size='lg'
          // startIcon={isActive ? iconHover : icon}
          textColor={isActive ? '' : 'secondary-500'}
          variant={isActive ? 'tint' : 'ghost'}
        >
          {isActive ? iconHover : icon}
          <span>{title}</span>
        </Button>
      )}
    </NavLink>
  );
};
