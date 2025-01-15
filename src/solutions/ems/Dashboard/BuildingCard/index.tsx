import React from 'react';

// storages

import { useLocations } from '@core/storages/controllers/locations';

// utils

import { t } from '@core/utils/translate';
import { getDeviceSeverity } from '@core/utils/getDeviceSeverity';

// types

import { BrandPalette, SeverityPalette } from '@core/api/typesDesignSystem';
import { IssuePriority, LocationType } from '@core/api/types';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Badge } from '@core/ui/components/Badge';
import { Button } from '@core/ui/components/Button';
import { CardContent } from '@core/ui/components/CardContent';
import { Dot } from '@core/ui/components/Dot';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { LinearProgress } from '@core/ui/components/LinearProgress';
import { Text } from '@core/ui/components/Text';

// icons

import AlertCircleSolidIcon from '@assets/icons/solid/alert-circle.svg?component';
import AlertTriangleSolidIcon from '@assets/icons/solid/alert-triangle.svg?component';
import Building01LineIcon from '@assets/icons/line/building-01.svg?component';
import Building07LineIcon from '@assets/icons/line/building-07.svg?component';
import CheckCircleSolidIcon from '@assets/icons/solid/check-circle.svg?component';
import FloorPlanLineIcon from '@assets/icons/line/floor-plan.svg?component';
import ZoneLineIcon from '@assets/icons/line/zone.svg?component';

type Props = {
  className?: string;
  deviceTotal: number;
  deviceCountCritical?: number;
  deviceCountWarning?: number;
  onClick?: () => void;
  riskLevel?: number;
  title?: string;
  type?: LocationType;
} & React.HTMLAttributes<HTMLElement>;

export const BuildingCard: React.FC<Props> = ({
  children,
  className,
  deviceTotal,
  deviceCountCritical = 0,
  deviceCountWarning = 0,
  onClick,
  riskLevel = 0,
  title,
  type,
  ...props
}) => {
  function getIconType(type?: LocationType): {
    icon: React.ReactNode;
  } {
    switch (type) {
      case LocationType.Formation:
        return { icon: <Building07LineIcon /> };
      case LocationType.Building:
        return { icon: <Building01LineIcon /> };
      case LocationType.Space:
        return { icon: <FloorPlanLineIcon /> };
      case LocationType.Zone:
        return { icon: <ZoneLineIcon /> };
      default:
        return { icon: <Building01LineIcon /> };
    }
  }

  return (
    <Button className={styles['button']} onClick={onClick} square variant='ghost' fullWidth>
      <CardContent size='xs' borderBottom fullWidth>
        <Grid direction='column' container spacing={2}>
          <Grid item>
            <Grid container alignItems='center' justifyContent='between'>
              <Grid item>
                <Grid gap={3}>
                  <Icon color={getDeviceSeverity(riskLevel).iconColor} size='lg' variant='tint'>
                    {getIconType(type).icon}
                  </Icon>
                  <Grid direction='column'>
                    <Text align='left' variant='sm' weight='medium'>
                      {title ?? `${t('general.notAvailable.label', 'n/a', 'Not Available.')}`}
                    </Text>
                    <Text align='left' color='typography-secondary' variant='sm' casing='lowercase'>
                      {`${deviceTotal ?? 0} ${t('asset.devices.label', 'Devices', 'Devices')}`}
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
              {(deviceCountCritical > 0 || deviceCountWarning > 0) && (
                <Grid item>
                  <Badge color='surface-02' size='xl'>
                    <Grid gap={2} alignItems='center'>
                      {deviceCountCritical > 0 && (
                        <Grid gap={1} alignItems='center'>
                          <Dot color='error' />
                          <Text variant='xs' weight='semibold'>
                            {deviceCountCritical}
                          </Text>
                        </Grid>
                      )}
                      {deviceCountWarning > 0 && (
                        <Grid gap={1} alignItems='center'>
                          <Dot color='warning' />
                          <Text variant='xs' weight='semibold'>
                            {deviceCountWarning}
                          </Text>
                        </Grid>
                      )}
                    </Grid>
                  </Badge>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Grid alignItems='center' justifyContent='center' fullWidth>
              <div className={styles['progress-label-container']}>
                <Text color='typography-secondary' variant='xs' weight='medium'>
                  {t('ems.riskLevel.label', 'Risk level', 'Severity level.')}:
                </Text>
              </div>
              <LinearProgress color={getDeviceSeverity(riskLevel).color} totalValue={100} value={riskLevel} size='sm' />
              <div className={styles['progress-count-container']}>
                <Text align='right' color='typography-primary' variant='xs' weight='semibold'>
                  {riskLevel}%
                </Text>
              </div>
              <Icon
                color={getDeviceSeverity(riskLevel).color}
                size='xs'
                variant='plain'
                className={styles['progress-icon-container']}
              >
                {getDeviceSeverity(riskLevel).icon}
              </Icon>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Button>
  );
};
