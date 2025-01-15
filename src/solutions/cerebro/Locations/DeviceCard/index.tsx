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
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
} & React.HTMLAttributes<HTMLElement>;

export const DeviceCard: React.FC<Props> = ({ className, icon, title, subtitle, ...props }) => {
  return (
    <Card className={cn(styles['card'], className)} color='surface-02' fullWidth {...props}>
      <CardContent>
        <Grid alignItems='start' justifyContent='between'>
          <Grid alignItems='center'>
            <Icon size='lg' variant='tint' className={styles['icon']}>
              {icon}
            </Icon>
            <Grid direction='column'>
              <Text variant='sm' weight='bold'>
                {title}
              </Text>
              <Text color='typography-secondary' variant='xs'>
                {subtitle}
              </Text>
            </Grid>
          </Grid>
          <IconButton disabled size='lg'>
            <ArrowRightLineIcon />
          </IconButton>
        </Grid>
        <Divider className={styles['divider']} />
        <Grid container alignItems='center' spacing={2}>
          <Grid item>
            <Grid alignItems='center'>
              <LegendMarker color='success' />
              <Text variant='xs'>1874 online</Text>
            </Grid>
          </Grid>
          <Grid item>
            <Grid alignItems='center'>
              <LegendMarker color='error' />
              <Text variant='xs'>267 offline</Text>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
