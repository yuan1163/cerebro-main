import React from 'react';

// utils

import { t } from '@core/utils/translate';

// types

import { SurfacePalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { IconButton } from '@core/ui/components/IconButton';

// icons

import XCircleSolidIcon from '@assets/icons/solid/x-circle.svg?component';

type Props = {
  className?: string;
  component?: 'button' | 'div';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => void;
} & React.HTMLAttributes<HTMLElement>;

export const InputClearButton: React.FC<Props> = ({
  className,
  component = 'button',
  disabled,
  onClick,
  onKeyDown,
}) => {
  return (
    <IconButton
      ariaLabel={t('general.clearButton.label', 'Clear', 'Clear button.')}
      className={cn(styles['icon-button'], className)}
      color='icon-quaternary'
      component={component}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      size='sm'
      tabIndex={disabled ? -1 : 0}
      variant='text'
    >
      <XCircleSolidIcon />
    </IconButton>
  );
};
