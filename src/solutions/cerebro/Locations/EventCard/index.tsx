import React from 'react';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Divider } from '@core/ui/components/Divider';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { LegendMarker } from '@core/ui/components/LegendMarker';
import { Text } from '@core/ui/components/Text';

// icons

import ArrowRightLineIcon from '@assets/icons/line/arrow-right.svg?component';

type Props = {
  className?: string;
  eventTime?: string;
  severity?: string;
  subtitle?: string;
  title?: string;
} & React.HTMLAttributes<HTMLElement>;

export const EventCard: React.FC<Props> = ({ className, eventTime, title, severity, subtitle, ...props }) => {
  return (
    <Card className={cn(styles['card'], className)} color='surface-02' fullWidth severity={severity} {...props}>
      <CardContent>
        <Grid alignItems='baseline' justifyContent='between'>
          <Grid direction='column'>
            <Text variant='sm' weight='bold'>
              {title}
            </Text>
            <Text color='typography-secondary' variant='sm'>
              {subtitle}
            </Text>
          </Grid>
          <Grid item>
            <Text color='typography-secondary' variant='xs'>
              {eventTime}
            </Text>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
