import React from 'react';

// types

import { AlignItems, GridDirection, JustifyContent } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  alignItems?: AlignItems;
  className?: string;
  component?: 'div' | 'header' | 'main' | 'aside' | string;
  container?: boolean;
  direction?: GridDirection;
  display?: 'flex' | 'grid';
  fullHeight?: boolean;
  fullWidth?: boolean;
  gap?: number;
  grow?: boolean;
  item?: boolean;
  justifyContent?: JustifyContent;
  lg?: 'auto' | number | boolean;
  spacing?: number;
  wrap?: 'nowrap' | 'wrap-reverse' | 'wrap';
} & React.HTMLAttributes<HTMLElement>;

export const Grid: React.FC<Props> = ({
  alignItems,
  children,
  className,
  component = 'div',
  container,
  direction = 'row',
  display = 'flex',
  fullHeight,
  fullWidth,
  gap,
  grow,
  item,
  justifyContent,
  lg,
  spacing = 0,
  wrap,
  ...props
}) => {
  const componentProps = {
    className: cn(
      direction === 'row' && styles[`grid-gap-row-${gap}`],
      direction === 'column' && styles[`grid-gap-column-${gap}`],
      styles[`grid-direction-${direction}`],
      alignItems && styles[`grid-align-items-${alignItems}`],
      justifyContent && styles[`grid-justify-content-${justifyContent}`],
      className,
      fullHeight && styles['grid-full-height'],
      fullWidth && styles['grid-full-width'],
      styles[`grid-display-${display}`],
      grow && styles['grid-grow'],
      container && styles['grid-container'],
      container && styles[`grid-spacing-${spacing}`],
      item && styles['grid-item'],
      styles[`grid-lg-${lg}`],
      wrap && styles[`grid-${wrap}`],
    ),
    ...props,
  };
  const componentChildren = [children];
  return React.createElement(component, componentProps, componentChildren);
};
