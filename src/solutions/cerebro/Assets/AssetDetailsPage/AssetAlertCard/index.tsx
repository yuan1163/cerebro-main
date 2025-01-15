import React from 'react';
import moment from 'moment';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

type Props = {
  className?: string;
};

export const AssetAlertCard: React.FC<Props> = ({ className }) => {
  return (
    <Card color='surface-02' severity='error'>
      <CardContent>
        <Grid className={styles['notification-card-content']}>
          <Grid direction='column'>
            <Text color='typography-primary' component='h5' variant='sm' weight='bold'>
              {t('location.zone.label', 'Zone', 'Specific area that is defined for a particular purpose.')} C Alert
            </Text>
            <Text className={styles['subtitle']} color='typography-secondary' variant='sm'>
              {t('asset.leavingDesignatedZone.label', 'Leaving designated zone', 'Moving out of a specified area.')}
            </Text>
          </Grid>
          <time className={styles['notification-data']}>02/23/2022 12:50 AM</time>
        </Grid>
      </CardContent>
    </Card>
  );
};
