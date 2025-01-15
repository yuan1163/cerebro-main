import React from 'react';

// types

import { BrandPalette, ColorPalette, IconPalette, SeverityPalette, PaletteString } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

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

type IconProps<T extends React.ElementType> = PolymorphicComponentPropWithRef<
  T,
  {
    className?: string;
    color?: 'default' | BrandPalette | ColorPalette | IconPalette | PaletteString | SeverityPalette;
    component?: T;
    disabled?: boolean;
    rounded?: boolean;
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    variant?: 'solid' | 'soft' | 'tint' | 'plain';
  }
>;

type IconComponent = <T extends React.ElementType = 'span'>(props: IconProps<T>) => React.ReactElement | null;

export const Icon: IconComponent = React.forwardRef(
  <T extends React.ElementType = 'span'>(
    {
      children,
      className,
      color = 'default',
      component,
      disabled,
      rounded = false,
      size = 'md',
      variant = 'solid',
      ...props
    }: IconProps<T>,
    ref?: PolymorphicRef<T>,
  ) => {
    const Component = component || 'span';
    return (
      <Component
        className={cn(
          disabled && styles[`icon-disabled`],
          rounded && styles[`icon-rounded`],
          styles['icon'],
          styles[`icon-variant-${variant}-size-${size}`],
          styles[`icon-variant-${variant}-color-${color}`],
          styles[`icon-variant-${variant}`],
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
