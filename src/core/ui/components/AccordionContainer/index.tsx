import React from 'react';

// types

import { SurfacePalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  color?: SurfacePalette;
  rounded?: boolean;
  shadow?: boolean;
  variant?: 'solid';
} & React.HTMLAttributes<HTMLElement>;

export const AccordionContainer: React.FC<Props> = ({
  children,
  className,
  color,
  rounded,
  shadow = false,
  variant,
}) => {
  return (
    <div
      className={cn(
        rounded && styles['accordion-rounded'],
        shadow && styles['accordion-shadow'],
        styles['accordion'],
        styles[`accordion-color-${color}`],
        styles[`accordion-variant-${variant}`],
        className,
      )}
    >
      {children}
    </div>
  );
};
