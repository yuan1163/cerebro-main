import React from 'react';

// SCSS
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// COMPONENTS
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';
import { ProcessCircle } from '@core/ui/ems/Charts/ProcessCircleChart';

// ICONS
import ClockSolidIcon from '@assets/icons/solid/clock.svg?component';

export type Props = {
  title: string;
  color?: 'primary' | 'secondary' | 'typography-primary' | 'typography-secondary' | string;
  icon: React.ReactNode;
  variant?: 'active' | 'inactive' | string;
  currentValue?: number | string | null;
  contractValue?: number | boolean;
  isChart?: boolean;
  unit: string;
  updatedAt?: string | null;
};

export const CurrentInfoBox: React.FC<Props> = ({
  title,
  color = 'primary',
  icon,
  variant = 'inactive',
  currentValue = '-',
  contractValue = false,
  isChart = false,
  unit,
  updatedAt = '-',
  ...props
}) => {
  const currentValueText = contractValue
    ? `${currentValue} ${unit} / ${contractValue} ${unit}`
    : `${currentValue} ${unit}`;

  const contractPercent =
    currentValue !== '-' && contractValue ? Math.round((Number(currentValue) / Number(contractValue)) * 100) : 0;
  if (!contractPercent) isChart = false;

  return (
    <Card className={cn(styles['card'], styles[variant])} fullWidth>
      <CardContent size='sm'>
        <Grid container justifyContent='between'>
          <Grid container direction='column' spacing={3} justifyContent='between'>
            <Grid item alignItems='center' gap={3}>
              <Icon size='lg' variant={variant === 'active' ? 'soft' : 'tint'}>
                {icon}
              </Icon>
              <Text color={variant === 'active' ? 'typography-contrast' : undefined} weight='bold'>
                {title}
              </Text>
            </Grid>
            <Grid item>
              <Text
                color={variant === 'active' ? 'typography-contrast' : undefined}
                variant='lg'
                weight={'bold'}
                lineHeight='relaxed'
              >
                {currentValueText}
              </Text>
            </Grid>
            <Grid item gap={2} alignItems='center'>
              <Icon size='sm' variant={'plain'} color={variant === 'active' ? 'default' : 'secondary'} rounded>
                <ClockSolidIcon />
              </Icon>
              <Text className={cn(styles['subtext'], styles[variant])} variant='sm' lineHeight='relaxed'>
                Last updated: {updatedAt}
              </Text>
            </Grid>
          </Grid>
          {/* <Grid container direction='column' alignItems='end'>
            <Grid item>
              {isChart && (
                <ProcessCircle
                  value={[contractPercent]}
                  circleSize={180}
                  optionSetting={variant === 'active' ? ProcessCircleOptionSetting : undefined}
                />
              )}
            </Grid>
          </Grid> */}
          {/* TODO: while process circle chart finish */}
        </Grid>
      </CardContent>
    </Card>
  );
};

// Process Circle
const ProcessCircleOptionSetting = {
  colors: ['#ffffff'],
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          offsetY: -20,
          show: false,
        },
        value: {
          color: '#ffffff',
          offsetY: 7,
          fontSize: '18px',
          fontWeight: 'bold',
        },
      },
      track: {
        background: '#166bc6',
      },
    },
  },
};
