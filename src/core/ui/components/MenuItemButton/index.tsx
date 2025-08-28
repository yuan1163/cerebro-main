import React from 'react';

// types

import { IconPalette, PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Decorator } from '@core/ui/components/Decorator';
import { Text } from '@core/ui/components/Text';

export type CustomMenuItemProps<T extends React.ElementType> = {
  action?: React.ReactNode;
  active?: boolean;
  selected?: boolean;
  avatar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  component?: T;
  control?: React.ReactNode;
  disabled?: boolean;
  disableHover?: boolean;
  endIcon?: React.ReactNode;
  endIconColor?: IconPalette | SeverityPalette | PaletteString;
  shortcut?: string;
  startIcon?: React.ReactNode;
  startIconColor?: IconPalette | SeverityPalette | PaletteString;
  variant?: 'action';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MenuItemButton = <T extends React.ElementType = 'button'>({
  action,
  active,
  selected,
  avatar,
  children,
  className,
  component,
  control,
  disabled,
  disableHover,
  endIcon,
  endIconColor = 'icon-secondary',
  shortcut,
  startIcon,
  startIconColor = 'icon-secondary',
  variant,
  ...props
}: CustomMenuItemProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CustomMenuItemProps<T>>) => {
  const Component = component || 'button';
  return (
    <Component
      className={cn(
        active && styles['menu-item-button-active'],
        selected && styles['menu-item-button-selected'],
        disableHover && styles['menu-item-button-disable-hover'],
        styles['menu-item-button'],
        styles[`menu-item-button-variant-${variant}`],
        className,
      )}
      disabled={disabled}
      role='menuitem'
      tabIndex={disabled || active || variant === 'action' ? -1 : 0}
      {...props}
    >
      {control && <div className={styles['control']}>{control}</div>}
      {avatar && <div className={cn(styles['avatar'])}>{avatar}</div>}
      {startIcon && (
        <Decorator className={styles['start-icon']} color={startIconColor} size='sm'>
          {startIcon}
        </Decorator>
      )}
      {children}
      {endIcon && (
        <Decorator className={styles['end-icon']} color={endIconColor} size='sm'>
          {endIcon}
        </Decorator>
      )}
      {shortcut && (
        <Text className={styles['shortcut']} variant='sm'>
          {shortcut}
        </Text>
      )}
      {action && <div className={styles['action']}>{action}</div>}
    </Component>
  );
};
