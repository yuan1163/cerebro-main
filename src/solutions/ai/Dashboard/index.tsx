import React from 'react';

// utils

import { t } from '@core/utils/translate';

// storages

import { useUI } from '@core/storages/ui';

// styles
import { cn } from '@core/utils/classnames';

// data
import { useLocations } from '@core/storages/controllers/locations';
import { useAlerts } from '@core/storages/controllers/alerts';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { Search } from '@core/ui/components/Search';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { Slider } from '@core/ui/components/Slider';
import { SwiperSlide } from 'swiper/react';

// icons

import ModuleIcon from '@assets/icons/line/dashboard.svg?component';

export const Dashboard = () => {
  const ui = useUI();

  const alerts = useAlerts({ locationId: ui.currentFormation });

  const locations = useLocations();
  const formation = locations.getElementById(ui.currentFormation);

  return (
    <>
      <Header
        icon={<ModuleIcon />}
        title={(formation && formation.name) || t('general.notAvailable.label', 'n/a', 'Not Available.')}
      />
      <UnitContainer>
        <Unit variant='sidebar'></Unit>
        <Unit>
          <Card>
            <Grid direction='column' grow>
              <CardHeader
                disablePaddingBottom
                title={t('location.locationSchema.label', 'Location Schema', 'Location schema title.')}
              />
              <CardContent></CardContent>
            </Grid>
            {/* <Grid display='grid' direction='column'>
              <CardHeader
                title={t(
                  'issue.attentionRequired.label',
                  'Attention Required',
                  'A title indicating that there are unresolved problems.',
                )}
              />
              <CardContent className={styles['card-container']}>
                {alerts.hasData() && (
                  <Slider scrollbar>
                    {alerts.getCamerasAlerts().map((alert, i) => (
                      <SwiperSlide className={styles['swiper-slide']} key={i}>
                        <AlertCard alert={alert} />
                      </SwiperSlide>
                    ))}
                  </Slider>
                )}
              </CardContent>
            </Grid> */}
          </Card>
        </Unit>
      </UnitContainer>
    </>
  );
};
