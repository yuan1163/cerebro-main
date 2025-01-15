import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { LegendMarker } from '@core/ui/components/LegendMarker';
import { Text } from '@core/ui/components/Text';

type Props = {
  caption?: number | string;
  className?: string;
  summary?: number | string;
  title?: string;
} & React.HTMLAttributes<HTMLElement>;

export const LocationSchemaDevices: React.FC<Props> = ({ caption, className, summary, title, ...props }) => {
  return (
    <Card elevation='xs' className={styles['cards-container']}>
      <CardContent size='xs'>
        <Grid container direction='column' spacing={1}>
          <Grid item>
            <Grid alignItems='center' justifyContent='between' fullWidth>
              <Text color='typography-secondary' component='span' variant='xs'>
                {title}
              </Text>
              <Text component='span' variant='xs' weight='semibold'>
                {summary}
              </Text>
            </Grid>
          </Grid>
          <Grid item>
            <Grid alignItems='center' justifyContent='between' fullWidth>
              <Text color='typography-secondary' component='span' variant='xs'>
                {t(
                  'events.criticalEvents.label',
                  'Critical events',
                  'Significant incidents that demand urgent attention.',
                )}
              </Text>
              <Grid alignItems='center'>
                <LegendMarker color='error' />
                <Text component='span' variant='xs' weight='semibold'>
                  {caption}
                </Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
