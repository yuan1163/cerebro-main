import React from 'react';

// SCSS
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// COMPONENTS
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { IconBase } from '@core/ui/components/IconBase';
import { Text } from '@core/ui/components/Text';

type Props = {
  title: string;
  iconColor?: 'primary' | 'warning' | 'error' | string;
  icon: React.ReactNode;
  value?: number | string | null;
  unit?: string;
};

export const RealTimeInfoBox: React.FC<Props> = ({ title, iconColor = 'primary', icon, value = '-', unit }) => {
  return (
    <Card className={cn(styles['card'])} fullWidth>
      <CardContent className={styles['card-content']} size='sm'>
        <Grid container fullHeight>
          <Grid container direction='column' spacing={4} justifyContent='between'>
            <Grid item>
              <Text weight='bold'>
                {value} {unit}
              </Text>
            </Grid>
            <Grid item>
              <Text color='typography-tertiary' variant='sm'>
                {title}
              </Text>
            </Grid>
          </Grid>
          {/* ICON */}
          <Grid className={''}>
            <IconBase
              className={cn(
                styles[`icon-container`],
                styles[`icon-color-${iconColor}`],
                styles[`icon-bg-color-${iconColor}`],
              )}
            >
              {icon}
            </IconBase>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
