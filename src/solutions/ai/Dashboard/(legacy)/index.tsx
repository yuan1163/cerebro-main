import React from 'react';

// utils

import { t } from '@core/utils/translate';

// storages

import { useUI } from '@core/storages/ui';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// data
import { useLocations } from '@core/storages/controllers/locations';
import { useAlerts } from '@core/storages/controllers/alerts';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { DataSelect } from '@core/ui/components/DataSelect';
import { EventsList } from './EventsList';
import { FormationMap } from './FormationMap';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { Search } from '@core/ui/components/Search';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { Slider } from '@core/ui/components/Slider';
import { SwiperSlide } from 'swiper/react';
import { AlertCard } from './AlertCard';

// icons
import DashboardLineIcon from '@assets/icons/IvedaAI/dashboard-line-28.svg?component';

import ModuleIcon from '@assets/icons/line/dashboard.svg?component';
import { useAuth } from '@core/storages/auth';
import { useParams } from '@nodemodules/react-router/dist';
import { log } from 'console';

type DashboardProps = {
  groupId: number;
  index: number;
};

export const Dashboard = ({ groupId, index }: DashboardProps) => {
  const ui = useUI();

  const alerts = useAlerts({ locationId: ui.currentFormation });

  return (
    <>
      <Header
        icon={<DashboardLineIcon />}
        title={t('solutions.dashboard.label', 'Dashboard', 'Dashboard page title.') + ` ${index}`}
        widgets={false}
      />
      <UnitContainer>
        <Unit variant='sidebar'>
          <EventsList />
        </Unit>
        <Unit>
          <Card className={styles['unit-card']}>
            <Grid direction='column' grow>
              <CardHeader
                disablePaddingBottom
                title={t('location.locationSchema.label', 'Location Schema', 'Location schema title.')}
              />
              <CardContent className={cn(styles['location-container'])}>
                <FormationMap formationId={ui.currentFormation} />
              </CardContent>
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
