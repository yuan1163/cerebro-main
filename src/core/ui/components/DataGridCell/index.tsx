import React from 'react';

// types

import { PaletteString, TypographyPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from '@core/ui/components/DataGrid/styles.module.scss';

type Props = {
  className?: string;
  color?: TypographyPalette | PaletteString;
  disableGutters?: boolean;
  variant?: 'body' | 'button' | 'checkbox' | 'footer' | 'head' | 'icon';
  verticalBorder?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const DataGridCell: React.FC<Props> = ({
  children,
  className,
  color = 'typography-primary',
  disableGutters = false,
  variant,
  verticalBorder = false,
  ...props
}) => {
  return (
    <div
      role='cell'
      className={cn(
        disableGutters && styles['data-grid-cell-disable-gutters'],
        styles['data-grid-cell'],
        styles[`data-grid-cell-variant-${variant}`],
        styles[`data-grid-cell-color-${color}`],
        className,
      )}
    >
      {children}
    </div>
  );
};
