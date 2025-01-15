import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/Pin/styles.module.scss';
import buttonStyles from '@core/ui/components/Button/styles.module.scss';

// types

import { AlertPriority } from '@core/api/types';

// components

import { ButtonBase } from '@core/ui/components/ButtonBase';
import { Decorator } from '@core/ui/components/Decorator';
import { Text } from '@core/ui/components/Text';

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

type PinProps<T extends React.ElementType> = PolymorphicComponentPropWithRef<
  T,
  {
    className?: string;
    color?: number;
    component?: T;
    dot?: boolean;
    icon?: React.ReactNode;
    needle?: boolean;
    markerContent?: number;
    markerLabel?: string;
    selected?: boolean;
    shape?: 'square' | 'rounded';
    size?: 'sm';
  }
>;

type PinComponent = <T extends React.ElementType = 'button'>(props: PinProps<T>) => React.ReactElement | null;

const getIconColorByAlertPriority = (priority: AlertPriority): string => {
  switch (priority) {
    case AlertPriority.Critical:
      return 'error';
    case AlertPriority.Normal:
      return 'success';
    case AlertPriority.Warning:
      return 'warning';
    case AlertPriority.Trivial:
      return 'trivial';
  }
};

export const PinNeedle: PinComponent = React.forwardRef(
  <T extends React.ElementType = 'button'>(
    {
      children,
      className,
      color,
      component,
      dot,
      icon,
      needle,
      markerContent,
      markerLabel,
      selected,
      shape = 'rounded',
      size = 'sm',
      ...props
    }: PinProps<T>,
    ref?: PolymorphicRef<T>,
  ) => {
    const Component = component || ButtonBase;

    return (
      <Component
        className={cn(
          buttonStyles['button-base'],
          styles['pin-wrapper'],
          styles['pin-wrapper-dot'],
          selected && styles['pin-wrapper-selected'],
          styles[`pin-shape-${shape}`],
          styles[`pin-size-${size}`],
          styles[`pin-icon-wrapper-color-${color}`],
          // styles[`pin-icon-wrapper-color-${getIconColorByAlertPriority(color!)}`],
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className={styles['pin-container']}>
          {/* ICON */}

          <div className={cn(styles[`pin-icon-wrapper`], styles[`pin-icon-wrapper-${size}`])}>{icon}</div>

          {/* BORDER */}

          <div className={cn(styles['pin-border'], styles[`pin-border-size-${size}`])} />

          {/* NEEDLE */}

          <div className={styles['pin-needle-container']}>
            <div className={styles['pin-needle-wrapper']}>
              <div className={styles['pin-needle-button']}>
                <div
                  className={cn(
                    styles['pin-needle-icon-container'],
                    styles[`pin-needle-icon-container-color-${color}`],
                  )}
                >
                  {icon && <Decorator size='sm'>{icon}</Decorator>}
                  {markerContent && (
                    <Text color='inherit' component='span' variant='xs' weight='semibold'>
                      {markerContent > 100 ? '100+' : markerContent < 100 ? markerContent : 0}
                    </Text>
                  )}
                </div>
                <div className={styles['pin-needle-label-container']}>
                  <Text
                    component='span'
                    overflow='hidden'
                    textOverflow='ellipsis'
                    variant='xs'
                    weight='medium'
                    whiteSpace='nowrap'
                  >
                    {markerLabel}
                  </Text>
                </div>
              </div>
              <div className={styles['pin-needle']} />
            </div>
          </div>
        </div>
      </Component>
    );
  },
);
