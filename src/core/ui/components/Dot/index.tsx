import React from 'react';

// types

import { SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// icons

import Bull01SolidIcon from '@assets/icons/solid/bull-01.svg?component';

type Props = {
  className?: string;
  color?: SeverityPalette;
} & React.HTMLAttributes<HTMLElement>;

export const Dot: React.FC<Props> = ({ className, color }) => {
  return (
    <div className={cn(styles['dot-container'], styles[`dot-color-${color}`], className)}>
      <Bull01SolidIcon />
    </div>
  );
};
