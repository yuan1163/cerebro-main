import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';
import buttonStyles from '@core/ui/components/Button/styles.module.scss';

// types

import { AlertPriority } from '@core/api/types';

// components

import { Badge } from '@core/ui/components/Badge';
import { ButtonBase } from '@core/ui/components/ButtonBase';

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
    badgeContent?: number;
    className?: string;
    color?: number;
    component?: T;
    dot?: boolean;
    icon?: React.ReactNode;
    needle?: boolean;
    needleContent?: number;
    needleLabel?: string;
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

const getOffset = (content: number) => {
  let badgeOffset;
  if (content < 10) {
    return (badgeOffset = '0%');
  } else if (content >= 10) {
    return (badgeOffset = '10%');
  }
};

export const Pin: PinComponent = React.forwardRef(
  <T extends React.ElementType = 'button'>(
    {
      badgeContent,
      children,
      className,
      color,
      component,
      dot,
      icon,
      needle,
      needleContent = 0,
      needleLabel,
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
          dot && styles['pin-wrapper-dot'],
          selected && styles['pin-wrapper-selected'],
          styles[`pin-shape-${shape}`],
          styles[`pin-size-${size}`],
          styles[`pin-icon-wrapper-color-${getIconColorByAlertPriority(color!)}`],
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className={styles['pin-container']}>
          {/* BADGE */}

          {!dot && badgeContent && (
            <div
              className={styles['badge']}
              style={{
                top: getOffset(badgeContent),
                right: getOffset(badgeContent),
              }}
            >
              <Badge shape='circular' size='sm' variant='invariable'>
                {badgeContent}
              </Badge>
            </div>
          )}

          {/* ICON */}

          <div className={cn(styles[`pin-icon-wrapper`], styles[`pin-icon-wrapper-${size}`])}>{icon}</div>

          {/* BORDER */}

          <div className={cn(styles['pin-border'], styles[`pin-border-size-${size}`])} />
        </div>
      </Component>
    );
  },
);
