import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react';

// storages
import { useUI } from '@core/storages/ui';

// utils
import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { DeviceTypeCard } from './DeviceTypeCard';
import { FormationMap } from './FormationMap';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/utilus/Header';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons
import LayersThree01Icon from '@assets/icons/line/layers-three-01.svg?component';
import ZoneLineIcon from '@assets/icons/line/zone.svg?component';

// data
import { useFormation } from '../api/data/useFormation';
import { useDeviceTypes } from '../api/data/useDeviceTypes';
import { useZones } from '../api/data/useZones';

export const Overview = observer(() => {
  const ui = useUI();
  const formation = useFormation(ui.currentFormation);
  const zones = useZones(ui.currentFormation);
  const deviceTypes = useDeviceTypes();
  return (
    <>
      <Header
        icon={<LayersThree01Icon />}
        title={(formation && formation.name) || t('general.notAvailable.label', 'n/a', 'Not Available.')}
      />
      <UnitContainer>
        <Unit variant='sidebar'>
          <Card>
            <CardContent>
              <Grid container spacing={3} direction='column'>
                <Grid item>
                  <Box className={styles['formation-map-container']}>
                    <FormationMap className={styles['formation-map']} formationId={ui.currentFormation} />
                  </Box>
                </Grid>
                <Grid item>
                  <Grid container direction='column' spacing={1}>
                    {zones?.map((zone) => (
                      <Grid key={zone.id} item>
                        <Card color='surface-02' fullWidth key={zone.id}>
                          <CardContent size='xs'>
                            <Text variant='sm' weight='bold' color='typography-primary'>
                              {zone.name}
                            </Text>
                            <Grid className={styles['zone-container']}>
                              <Icon className={styles['icon']} color='surface-02' size='xl' variant='soft'>
                                <ZoneLineIcon />
                              </Icon>
                              <Grid container spacing={2} wrap='wrap'>
                                {deviceTypes?.map((type) => (
                                  <DeviceTypeCard key={type.id} zoneId={zone.id} type={type} />
                                ))}
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Unit>
        <Unit className={styles['unit']}>
          <Grid className={styles['map-container']}></Grid>
          <Grid />
        </Unit>
      </UnitContainer>
    </>
  );
});
