import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

// storages

import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AlertsLegendMap } from '@core/ui/components/AlertsLegendMap';
import { BuildingCard } from './BuildingCard';
import { BuildingsMap } from './BuildingsMap';
import { Card } from '@core/ui/components/Card';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons

import ModuleIcon from '@assets/icons/line/dashboard.svg?component';
import { useDevices } from '@core/storages/controllers/devices';

//const countDevices;

export const DashboardMap = observer(() => {
  const locations = useLocations();
  const ui = useUI();
  const activeFormation = locations.getElementById(ui.currentFormation);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedLocations, setSelectedLocations] = useState(null);

  const devices = useDevices({ locationId: ui.currentFormation });

  const handleSelectChange = (newOption: any) => {
    setSelectedOption(newOption);
    ui.setEmsCurrentLocation(newOption.locationId);
    navigate('../scheme');
  };

  // console.log('Buildings data:', locations.getBuildings(activeFormation));

  return (
    <>
      <Header icon={<ModuleIcon />} title={t('solutions.dashboard.label', 'Dashboard', 'Dashboard page title.')} />
      <UnitContainer>
        <Unit variant='sidebar'>
          <Grid display='grid' className={styles['unit-sidebar-grid']}>
            <Grid className={styles['unit-sidebar-widget']}>
              {/* <DataSelect
                onChange={setSelectedOption}
                options={options}
                placeholder={options[0].name}
                present={(item) => item?.name}
                value={selectedOption}
                variant='control'
              /> */}
            </Grid>
            <Grid className={styles['unit-sidebar-body']}>
              <Card className={cn(styles['card'])} scrollable fullWidth fullHeight>
                <Scrollbar>
                  {locations.getBuildings(activeFormation).map((building) => (
                    <BuildingCard
                      key={building.locationId}
                      deviceTotal={devices.getTotal(building)}
                      deviceCountCritical={0}
                      deviceCountWarning={0}
                      riskLevel={building.riskLevel}
                      title={building.name}
                      onClick={() => {
                        ui.setEmsCurrentLocation(building.locationId);
                        navigate('../scheme');
                      }}
                    />
                  ))}
                </Scrollbar>
              </Card>
            </Grid>
          </Grid>
        </Unit>
        <Unit height='full'>
          <Grid className={styles['container']} display='grid' fullHeight>
            <div className={styles['map-selector-container']}>
              <DataSelect
                onChange={handleSelectChange}
                options={locations.getBuildings(activeFormation)}
                placeholder={t('label.allLocations.label', 'All locations', 'All locations.')}
                present={(value) => value?.name}
                size='md'
                value={selectedLocations}
                variant='control'
              />
            </div>
            <BuildingsMap className={styles['map']} marker='needle' points={locations.getBuildings(activeFormation)} />
            <AlertsLegendMap
              alerts={locations.getBuildings(activeFormation)}
              label={t('location.buildings.label', 'Buildings', 'Buildings')}
            />
          </Grid>
        </Unit>
      </UnitContainer>
    </>
  );
});

const options = [{ name: 'Device Overview' }, { name: 'Event Monitoring' }];
