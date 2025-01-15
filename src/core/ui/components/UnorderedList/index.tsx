import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import {
  BrandPalette,
  PaletteString,
  ColorPalette,
  SeverityPalette,
  TypographyPalette,
} from '@core/api/typesDesignSystem';

// components

import { Text } from '@core/ui/components/Text';

// icons

import DiskMarkerIcon from '@assets/icons/solid/disk-marker.svg?component';

type Props = {
  className?: string;
  color?: TypographyPalette | PaletteString;
  listMarker?: React.ReactNode;
  listMarkerColor?: BrandPalette | ColorPalette | PaletteString | SeverityPalette | TypographyPalette;
  options?: Array<string | number>;
  size?: '7xl' | '6xl' | '5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'base' | 'sm' | 'xs';
  weight?:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black'
    | (string & {});
} & React.HTMLAttributes<HTMLUListElement>;

export const UnorderedList: React.FC<Props> = ({
  className,
  color,
  listMarker = <DiskMarkerIcon />,
  listMarkerColor,
  options = [],
  size,
  weight,
  ...props
}) => {
  return (
    <ul className={cn(styles['list'], className)}>
      {options?.map((option) => (
        <li key={option} className={cn(styles['list-item'], styles[`list-item-size-${size}`])}>
          <span
            role='presentation'
            className={cn(
              styles['marker-container'],
              styles[`marker-container-color-${listMarkerColor}`],
              styles[`marker-container-size-${size}`],
            )}
          >
            {listMarker}
          </span>
          <Text color={color} variant={size} weight='weight'>
            {option}
          </Text>
        </li>
      ))}
    </ul>
  );
};
