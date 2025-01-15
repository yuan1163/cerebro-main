import React from 'react';

// types

import { SeverityPalette } from '@core/api/typesDesignSystem';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Badge } from '@core/ui/components/Badge';
import { Dot } from '@core/ui/components/Dot';
import { Grid } from '@core/ui/components/Grid';
import { Text } from '@core/ui/components/Text';

type Props = {
  alerts?: AlertItem[];
  className?: string;
  label?: string;
} & React.HTMLAttributes<HTMLElement>;

type AlertItem = {
  riskLevel?: number;
};

function countRiskLevels(alerts: AlertItem[]) {
  let countError = 0;
  let countWarning = 0;
  let countSuccess = 0;
  alerts = alerts || [];
  alerts.forEach((item: AlertItem) => {
    if (item.riskLevel !== undefined) {
      if (item.riskLevel > 80) {
        countError++;
      } else if (item.riskLevel > 70 && item.riskLevel <= 80) {
        countWarning++;
      } else {
        countSuccess++;
      }
    }
  });

  return [
    { color: 'error', label: t('events.criticalEvent.label', 'Critical', 'Critical event.'), count: countError },
    { color: 'warning', label: t('events.warning.label', 'Warning', 'Warning notification.'), count: countWarning },
    { color: 'success', label: t('events.success.label', 'Success', 'Success notification.'), count: countSuccess },
  ];
}

export const AlertsLegendMap: React.FC<Props> = ({ alerts = [], children, className, label, ...props }) => {
  return (
    <Badge color='translucent' className={styles['map-legend']}>
      <Grid gap={3} alignItems='center'>
        {alerts.length > 0 && (
          <Grid gap={1} alignItems='center'>
            <Text color='typography-secondary' variant='xs'>
              {label}
            </Text>
            <Text color='typography-primary' variant='xs' weight='bold'>
              {alerts?.length}
            </Text>
          </Grid>
        )}
        {countRiskLevels(alerts).map((item, index) => (
          <React.Fragment key={index}>
            {item.count > 0 && (
              <Grid gap={1} alignItems='center'>
                <Dot color={item.color as SeverityPalette} />
                <Text color='typography-secondary' variant='xs'>
                  {item.label}
                </Text>
                <Text color='typography-primary' variant='xs' weight='bold'>
                  {item.count}
                </Text>
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Badge>
  );
};
