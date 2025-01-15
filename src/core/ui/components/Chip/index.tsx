import React from 'react';

// types

import { BrandPalette, ColorPalette, PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import AvatarChipFallback from '@core/ui/components/AvatarChipFallback';
import { IconButton } from '@core/ui/components/IconButton';

// icons

import XCloseLineIcon from '@assets/icons/line/x-close.svg?component';

type ChipProps<T extends React.ElementType> = {
  avatar?: string;
  children?: React.ReactNode;
  className?: string;
  color?: BrandPalette | ColorPalette | PaletteString | SeverityPalette;
  component?: T;
  deletable?: boolean;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  lineThrough?: boolean;
  onDelete?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: 'sm' | 'md';
  startIcon?: React.ReactNode;
  uppercase?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Chip = <T extends React.ElementType = 'div'>({
  avatar,
  children,
  className,
  color = 'primary',
  component,
  deletable,
  disabled,
  endIcon,
  lineThrough,
  onDelete,
  size = 'sm',
  startIcon,
  uppercase,
  ...props
}: ChipProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ChipProps<T>>) => {
  const Component = component || 'div';

  return (
    <Component
      className={cn(
        styles['chip'],
        styles[`chip-color-${color}`],
        styles[`chip-size-${size}`],
        disabled && styles['chip-disabled'],
        className,
      )}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {avatar && (
        <span className={styles['start-icon']}>
          <AvatarChipFallback size={size} src={avatar} />
        </span>
      )}
      {startIcon && <span className={styles['start-icon']}>{startIcon}</span>}
      <span
        className={cn(
          lineThrough && styles['label-line-through'],
          styles['label'],
          uppercase && styles['label-uppercase'],
        )}
      >
        {children}
      </span>
      {endIcon && <span className={styles['end-icon']}>{endIcon}</span>}
      {deletable && (
        <IconButton
          ariaLabel={t('general.deleteButton.label', 'Delete', 'Delete button.')}
          className={cn(styles['chip-deletable-icon'], styles[`chip-deletable-icon-size-${size}`])}
          color={color}
          component='span'
          onClick={onDelete}
          size={size === 'sm' ? 'xs' : 'sm'}
          tabIndex={disabled ? -1 : 0}
          variant='text'
        >
          <XCloseLineIcon />
        </IconButton>
      )}
    </Component>
  );
};
