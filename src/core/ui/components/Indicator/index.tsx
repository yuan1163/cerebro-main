import React from 'react';

// types

import { ColorPalette, PaletteString, SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  severity?: ColorPalette | SeverityPalette | PaletteString;
} & React.HTMLAttributes<HTMLElement>;

export const Indicator: React.FC<Props> = ({ className, severity = 'trivial' }) => (
  <div className={cn(styles['indicator'], styles[`indicator-color-${severity}`])} />
);
