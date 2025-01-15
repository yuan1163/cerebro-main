import React from 'react';

// types

import { ButtonProps } from '@core/ui/components/Button/buttonProps';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Badge } from '@core/ui/components/Badge';
import { ButtonBase } from '@core/ui/components/ButtonBase';
import { CircularProgress } from '@core/ui/components/CircularProgress';
import { Decorator } from '@core/ui/components/Decorator';
import { Dot } from '@core/ui/components/Dot';

// components

export const Button = <T extends React.ElementType = 'button'>({
  align = 'center',
  badge,
  children,
  className,
  color = 'default',
  component,
  dot,
  endIcon,
  fontSize,
  fontWeight = 'semibold',
  fullWidth = false,
  iconColor,
  loading = false,
  square = false,
  size = 'md',
  startIcon,
  textColor,
  variant = 'solid',
  ...props
}: ButtonProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) => {
  const Component = component || ButtonBase;

  const hasNoChildren = children === undefined || children === null;

  return (
    <Component
      className={cn(
        endIcon === true && styles[`button-size-${size}-end-icon`],
        fullWidth && styles[`button-full-width`],
        loading && styles['button-loading'],
        square && styles['button-square'],
        startIcon === true && styles[`button-size-${size}-start-icon`],
        styles['button-base'],
        styles[`button-align-${align}`],
        styles[`button-color-${textColor}`],
        styles[`button-color-${variant}-${color}`],
        styles[`button-font-size-${fontSize}`],
        styles[`button-font-weight-${fontWeight}`],
        styles[`button-size-${size}`],
        styles[`button-variant-${variant}`],
        styles[`button`],
        className,
      )}
      tabIndex={loading ? -1 : 0}
      {...props}
    >
      {loading && (
        <Decorator loading position='center' size={size}>
          <CircularProgress color={color} size={size} variant={variant} />
        </Decorator>
      )}

      {startIcon && (
        <Decorator
          color={iconColor}
          className={cn(
            styles[`button-start-icon-size-${size}`],
            hasNoChildren && styles[`button-start-icon-no-margin`],
          )}
          position='start'
          size={size}
        >
          {startIcon}
        </Decorator>
      )}
      {children}
      {endIcon && (
        <Decorator
          color={iconColor}
          className={cn(
            styles['button-end-icon'],
            styles[`button-end-icon-size-${size}`],
            hasNoChildren && styles[`button-end-icon-no-margin`],
          )}
          position='end'
          size={size}
        >
          {endIcon}
        </Decorator>
      )}
      {(badge || dot) && (
        <div className={styles['badges-container']}>
          {badge && (
            <Badge color={color} variant='tint'>
              {badge}
            </Badge>
          )}
          {dot && <Dot />}
        </div>
      )}
    </Component>
  );
};
