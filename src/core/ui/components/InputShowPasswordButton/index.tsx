import React from 'react';

// types

import { SurfacePalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { IconButton } from '@core/ui/components/IconButton';

// icons

import EyeOffSolidIcon from '@assets/icons/solid/eye-off.svg?component';
import EyeSolidIcon from '@assets/icons/solid/eye.svg?component';

type Props = {
  className?: string;
  disabled?: boolean;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  toggleVisibility?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const InputShowPasswordButton: React.FC<Props> = ({
  className,
  disabled,
  onBlur,
  onClick,
  onFocus,
  toggleVisibility,
}) => {
  return (
    <IconButton
      ariaLabel='Toggle visibility'
      className={className}
      color='icon-tertiary'
      disabled={disabled}
      onBlur={onBlur}
      onClick={onClick}
      onFocus={onFocus}
      size='sm'
      tabIndex={disabled ? -1 : 0}
      variant='text'
    >
      {toggleVisibility ? <EyeOffSolidIcon /> : <EyeSolidIcon />}
    </IconButton>
  );
};
