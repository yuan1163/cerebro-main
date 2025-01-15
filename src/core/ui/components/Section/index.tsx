import React from 'react';

// types

import { BrandPalette, ColorPalette, PaddingSize, SurfacePalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  color?: BrandPalette | ColorPalette | SurfacePalette;
  disablePaddingBottom?: boolean;
  disablePaddingTop?: boolean;
  padding?: PaddingSize;
  paddingBottom?: PaddingSize;
  paddingTop?: PaddingSize;
} & React.HTMLAttributes<HTMLElement>;

export const Section: React.FC<Props> = ({
  children,
  className,
  color,
  disablePaddingBottom,
  disablePaddingTop,
  padding,
  paddingBottom,
  paddingTop,
}) => {
  return (
    <section
      className={cn(
        disablePaddingBottom && styles[`section-disable-padding-bottom`],
        disablePaddingTop && styles[`section-disable-padding-top`],
        paddingBottom && styles[`section-padding-bottom-${paddingBottom}`],
        paddingTop && styles[`section-padding-top-${paddingTop}`],
        styles['section'],
        styles[`section-color-${color}`],
        styles[`section-padding-${padding}`],
        className,
      )}
    >
      {children}
    </section>
  );
};
