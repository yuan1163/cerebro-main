import React from 'react';
import { observer } from 'mobx-react';
import { Navigate, Route, Routes } from 'react-router-dom';

// storages
import { useUI } from '@core/storages/ui';

// utils
import { t } from '@core/utils/translate';

// styles
import styles from './styles.module.scss';

// components

import { DataSelect } from '@core/ui/components/DataSelect';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/utilus/Header';
import { ListView } from '../ListView';
import { MapView } from '../MapView';
import { ViewSwitcher } from '../ViewSwitcher';

// icons
import ModuleIcon from '@assets/icons/line/map-02.svg?component';

//data
import { useZones } from '../../api/data/useZones';

export const MapListView = observer(() => {
  const ui = useUI();

  const zones = useZones(ui.currentFormation);
  const zoneOptions = zones && [
    { name: t('location.allZones.label', 'All zones', 'Inclusion of every available zone.'), id: undefined },
    ...zones,
  ];

  const [currentZone, setCurrentZone] = React.useState(zoneOptions?.[0]);

  return (
    <>
      <Header icon={<ModuleIcon />} title={t('solutions.smartPoles.label', 'Smart Poles', 'Smart Poles')} />
      <Grid justifyContent='between' className={styles['toolbar']}>
        <ViewSwitcher />
        <DataSelect
          className={styles['select']}
          onChange={(zone) => setCurrentZone(zone)}
          options={zoneOptions}
          placeholder={t('location.allZones.label', 'All zones', 'Inclusion of every available zone.')}
          present={(item) => item?.name}
          value={currentZone}
        />
      </Grid>
      <Routes>
        <Route path='map' element={<MapView zoneId={currentZone?.id} />} />
        <Route path='list/*' element={<ListView zoneId={currentZone?.id} />} />
        <Route path='' element={<Navigate to='map' />} />
      </Routes>
    </>
  );
});
