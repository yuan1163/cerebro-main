import React from 'react';

// utils

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

export type JSXKeys = keyof JSX.IntrinsicElements;

export type BoxProps<T extends JSXKeys = 'div'> = {
  component?: T;
  variant?: string;
  className?: string;
} & JSX.IntrinsicElements[T];

export const Box = <T extends JSXKeys = 'div'>(props: BoxProps<T>) => {
  const { component = 'div', variant, className, ...rest } = props;

  const componentProps = {
    className: cn(variant && styles[variant], className),
    ...rest,
  };

  return React.createElement(component, componentProps);
};
