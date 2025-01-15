import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { BrandPalette, PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

// icons

import RadioDotSolidIcon from '@assets/icons/solid/radio-dot.svg?component';

type Props = {
  className?: string;
  color?: BrandPalette | SeverityPalette | PaletteString;
  disableGutters?: boolean;
  disableGutterLeft?: boolean;
};

export const LegendMarker: React.FC<Props> = ({
  className,
  color,
  disableGutters = false,
  disableGutterLeft = false,
}) => {
  return (
    <span
      className={cn(
        styles['legend-marker'],
        !disableGutters && styles['legend-marker-gutters'],
        disableGutterLeft && styles['legend-marker-disable-gutter-left'],
        className,
      )}
    >
      <RadioDotSolidIcon className={cn(styles['legend-mark-icon'], styles[`legend-marker-${color}`])} />
    </span>
  );
};
