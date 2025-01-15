import React from 'react';

// utils

import { t } from '@core/utils/translate';

// storages

import { useUI } from '@core/storages/ui';

// data
import { useAlertsFormation } from '@solutions/utilus/api/data/useAlertsFormation';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AlertsList } from './AlertsList';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { DataSelect } from '@core/ui/components/DataSelect';
import { EventsList } from './EventsList';
import { FormationMap } from './FormationMap';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/utilus/Header';
import { Search } from '@core/ui/components/Search';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons

import ModuleIcon from '@assets/icons/line/dashboard.svg?component';

// data
import { useZones } from '../api/data/useZones';
import { useFormation } from '../api/data/useFormation';

export const Dashboard = () => {
  const ui = useUI();
  const zones = useZones(ui.currentFormation);
  const zoneOptions = zones && [
    {
      name: t('location.allZones.label', 'All zones', 'Inclusion of every available zone.'),
      id: undefined,
    },
    ...zones,
  ];

  const alerts = useAlertsFormation(ui.currentFormation);

  const formation = useFormation(ui.currentFormation);

  const [currentText, setCurrentText] = React.useState<string | undefined>();
  const [currentZone, setCurrentZone] = React.useState(zoneOptions?.[0]);

  return (
    <>
      <Header
        icon={<ModuleIcon />}
        title={(formation && formation.name) || t('general.notAvailable.label', 'n/a', 'Not Available.')}
      />
      <UnitContainer>
        <Unit variant='sidebar'>
          <EventsList />
        </Unit>
        <Unit>
          <Card className={styles['card']}>
            <CardHeader
              disablePaddingBottom
              title={t('location.locationSchema.label', 'Location Schema', 'Location schema title.')}
            />
            <CardContent className={cn(styles['card-content'])}>
              <Grid direction='column' className={styles['location-container']}>
                <Stack direction='row'>
                  <Search
                    placeholder={t(
                      'general.searchByName.label',
                      'Search by name',
                      'Feature allowing users to locate specific items using their names as the query.',
                    )}
                    value={currentText}
                    onChange={(text) => setCurrentText(text)}
                  />
                  <DataSelect
                    className='w-[33%]'
                    onChange={(zone) => setCurrentZone(zone)}
                    options={zoneOptions}
                    placeholder={t('location.allZones.label', 'All zones', 'Inclusion of every available zone.')}
                    present={(item) => item?.name}
                    value={currentZone}
                  />
                </Stack>
                <FormationMap formationId={ui.currentFormation} zoneId={currentZone?.id} />
              </Grid>
            </CardContent>
            {alerts && alerts.length > 0 && <AlertsList />}
          </Card>
        </Unit>
      </UnitContainer>
    </>
  );
};
