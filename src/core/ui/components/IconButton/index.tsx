import React from 'react';

// types

import { BrandPalette, ColorPalette, IconPalette, PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import buttonStyles from '@core/ui/components/Button/styles.module.scss';
import styles from './styles.module.scss';

// components

import { ButtonBase } from '@core/ui/components/ButtonBase';
import { CircularProgress } from '@core/ui/components/CircularProgress';
import { Decorator } from '@core/ui/components/Decorator';
import { Dot } from '@core/ui/components/Dot';

type ComponentProp<T extends React.ElementType> = {
  component?: T;
};

type PropsToOmit<T extends React.ElementType, P> = keyof (ComponentProp<T> & P);

type PolymorphicComponentProp<T extends React.ElementType, Props = {}> = React.PropsWithChildren<
  Props & ComponentProp<T>
> &
  Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

type PolymorphicComponentPropWithRef<T extends React.ElementType, Props = {}> = PolymorphicComponentProp<T, Props> & {
  ref?: PolymorphicRef<T>;
};

type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref'];

type IconButtonProps<T extends React.ElementType> = PolymorphicComponentPropWithRef<
  T,
  {
    ariaLabel?: string;
    badge?: boolean;
    className?: string;
    color?: 'default' | IconPalette | BrandPalette | ColorPalette | PaletteString | SeverityPalette;
    component?: T;
    decoratorSize?: 'xs' | 'sm' | 'md' | 'lg';
    disabled?: boolean;
    endIcon?: React.ReactNode;
    fullWidth?: boolean;
    loading?: boolean;
    loadingIndicator?: React.ReactNode;
    loadingPosition?: 'start' | 'center' | 'end';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    startIcon?: React.ReactNode;
    variant?: 'solid' | 'outlined' | 'ghost' | 'control' | 'tint' | 'text' | 'link';
  }
>;

type IconButtonComponent = <T extends React.ElementType = 'button'>(
  props: IconButtonProps<T>,
  ref?: PolymorphicRef<T>,
) => React.ReactElement | null;

function Loader({ color, size, variant }: any) {
  <Decorator loading position='center' size={size}>
    <CircularProgress color={color} size={size} variant={variant} />
  </Decorator>;
}

export const IconButton: IconButtonComponent = React.forwardRef(
  <T extends React.ElementType = 'button'>(
    {
      ariaLabel,
      badge,
      children,
      className,
      color = 'default',
      component,
      decoratorSize,
      disabled,
      loading = false,
      loadingIndicator,
      loadingPosition = 'start',
      size = 'md',
      variant = 'ghost',
      ...props
    }: IconButtonProps<T>,
    ref?: PolymorphicRef<T>,
  ) => {
    const Component = component || ButtonBase;
    return (
      <Component
        aria-label={ariaLabel}
        className={cn(
          buttonStyles['button-base'],
          buttonStyles[`button`],
          buttonStyles[`button-color-${variant}-${color}`],
          buttonStyles[`button-variant-${variant}`],
          buttonStyles[`button-size-${size}`],
          loading && buttonStyles['button-loading'],
          styles[`icon-button-size-${size}`],
          styles[`icon-button`],
          styles[`icon-button-variant-${variant}`],
          className,
        )}
        tabIndex={loading ? -1 : 0}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {loading && (
          <Decorator loading position='center' size={size}>
            <CircularProgress color={color as string} size={size} variant={variant} />
          </Decorator>
        )}
        <Decorator position='center' size={!decoratorSize ? size : decoratorSize}>
          {!loading && children}
        </Decorator>
        {badge && !disabled && <Dot className={styles['badge']} />}
      </Component>
    );
  },
) as IconButtonComponent;
