import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// types

import { SeverityPalette } from '@core/api/typesDesignSystem';

// components

import { Grid } from '@core/ui/components/Grid';
import { LegendMarker } from '@core/ui/components/LegendMarker';
import { Text } from '@core/ui/components/Text';

type Legend = {
  totalValue?: number | string;
  description?: string;
  alertStatus?: 'primary' | 'secondary' | SeverityPalette | string;
};

type Props = {
  className?: string;
  content?: Legend;
  variant?: 'standard' | 'large';
};

export const LegendStandard: React.FC<Props> = ({ className, content, variant = 'standard', ...props }) => {
  return (
    <Grid direction='column' className={className}>
      <Text className={styles[`title-${variant}`]}>{content?.totalValue}</Text>
      <Grid alignItems='center'>
        {content?.alertStatus && <LegendMarker color={content?.alertStatus} />}
        <Text className={styles['description']}>{content?.description}</Text>
      </Grid>
    </Grid>
  );
};
