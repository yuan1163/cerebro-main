import React from 'react';

// types

import { SurfacePalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { IconButton } from '@core/ui/components/IconButton';

// icons

import ChevronSelectorVerticalLineIcon from '@assets/icons/line/chevron-selector-vertical.svg?component';

type Props = {
  className?: string;
  component?: 'button' | 'div';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => void;
} & React.HTMLAttributes<HTMLElement>;

export const SelectorToggleButton: React.FC<Props> = ({
  className,
  component = 'button',
  disabled,
  onClick,
  onKeyDown,
}) => {
  return (
    <IconButton
      ariaLabel='Toggle options list'
      className={cn(styles['icon-button'], className)}
      color={!disabled ? 'icon-secondary' : 'icon-disabled'}
      component={component}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      size='sm'
      tabIndex={disabled ? -1 : 0}
      variant='text'
    >
      <ChevronSelectorVerticalLineIcon aria-hidden='true' />
    </IconButton>
  );
};
