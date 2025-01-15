import React from 'react';

// utils

import { getCommandCenterSeverity } from '@core/utils/getCommandCenterSeverity';

// types

import { SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';

type Props = {
  className?: string;
  riskLevel?: number;
  title?: string;
} & React.HTMLAttributes<HTMLElement>;

export const ProcessCard: React.FC<Props> = ({ className, riskLevel = 0, title }) => {
  const severity: SeverityPalette = getCommandCenterSeverity(riskLevel);
  return (
    <Card className={cn(styles['card'], styles[`card-${severity}`], className)}>
      <CardContent size='xxxxs' className={styles['card-content']} fullHeight>
        <Grid direction='column' fullHeight>
          <div className={styles['title-container']}>
            <h4 className={styles['title']}>{title}</h4>
          </div>
          <div className={styles['count-container']}>
            <span className={styles['count-content']}>{`${Math.floor(riskLevel)}%`}</span>
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};
