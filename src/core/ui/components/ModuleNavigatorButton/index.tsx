import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';
import buttonStyles from '@core/ui/components/Button/styles.module.scss';

// components

import { Decorator } from '@core/ui/components/Decorator';
import { NavLink } from 'react-router-dom';

// components

type Props = {
  className?: string;
  endIcon?: React.ReactNode;
  hoverIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  to?: string;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLElement>;

interface ActiveProps {
  isActive: () => void;
}

export const ModuleNavigatorButton: React.FC<Props> = ({
  children,
  className,
  endIcon,
  hoverIcon,
  startIcon,
  to = '',
  disabled,
  ...props
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          buttonStyles[`button-base`],
          endIcon === true && buttonStyles[`button-end-icon`],
          startIcon === true && buttonStyles[`button-start-icon`],
          styles[`module-navigator-button`],
          styles[`module-navigator`],
          disabled && styles[`disabled`],
          isActive && styles[`module-navigator-button-active`],
          className,
        )
      }
      to={to}
      onClick={(e) => disabled && e.preventDefault()}
      {...props}
    >
      {startIcon && (
        <Decorator position='start' size='lg'>
          <span className={styles['icon']}>{startIcon}</span>
          <span className={styles['icon-hover']}>{hoverIcon}</span>
        </Decorator>
      )}
      {children}
      {endIcon && (
        <Decorator position='end' size='lg'>
          <span className={styles['icon']}>{endIcon}</span>
          <span className={styles['icon-hover']}>{hoverIcon}</span>
        </Decorator>
      )}
    </NavLink>
  );
};
