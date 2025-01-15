import React, { useState } from 'react';
import { ReactFlowProvider, Node } from 'reactflow';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

// storages

import { useUI } from '@core/storages/ui';
import { useLocations } from '@core/storages/controllers/locations';
import { useDevices } from '@core/storages/controllers/devices';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

import { Device, Location } from '@core/api/types';
import { DeviceParts } from '../api/entities/deviceParts';
import { useCurrentDeviceParts } from '../api/hook/useDeviceParts';

// components

import { BuildingCard } from './BuildingCard';
import { Card } from '@core/ui/components/Card';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
import { ReactFlowMap } from '@core/ui/components/ReactFlowMap';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons

import ModuleIcon from '@assets/icons/line/dashboard.svg?component';

// data interfaces

interface SchemeCircuit extends Partial<DeviceParts> {
  riskLevel: number; // TODO
}

interface SchemeDevice extends Partial<Device> {
  curcuits: SchemeCircuit[];
  riskLevel: number; // TODO
}

interface SchemeGateway extends Partial<Device> {
  devices: SchemeDevice[];
  riskLevel: number; // TODO
}

interface SchemeZone extends Partial<Location> {
  gateways: SchemeGateway[];
  devices: SchemeDevice[];
}

interface SchemeFloor extends Partial<Location> {
  zones: SchemeZone[];
  gateways: SchemeGateway[];
  devices: SchemeDevice[];
}

export const DashboardScheme = observer(() => {
  const locations = useLocations();
  const devices = useDevices({ locationId: locations.getAccessRoot().locationId });
  const deviceParts = useCurrentDeviceParts({ locationId: locations.getAccessRoot().locationId });
  const ui = useUI();
  const currentLocation = locations.getElementById(ui.emsCurrentLocation);
  const navigate = useNavigate();

  // getting data from the server to draw the scheme
  const getSchemeCicuits = (device: Device) =>
    deviceParts.getConnected(device).map((part) => ({
      index: part.index,
      description: part.description,
      //...part, all the rest properties
      riskLevel: Math.random() * 100,
    }));

  const getSchemeConnectedDevices = (gateway: Device) =>
    devices.getConnectedDevices(gateway).map((device) => ({
      deviceId: device.deviceId,
      name: device.name,
      //...device, all the rest properties
      curcuits: getSchemeCicuits(device),
      riskLevel: Math.random() * 100,
    }));

  const getSchemeGateways = (location: Location) =>
    devices.getGateways(location).map((gateway) => ({
      deviceId: gateway.deviceId,
      name: gateway.name,
      //...gateway, all the rest properties
      devices: getSchemeConnectedDevices(gateway),
      riskLevel: Math.random() * 100,
    }));

  const getSchemeIndependetDevices = (location: Location) =>
    devices.getIndependentDevices(location).map((device) => ({
      deviceId: device.deviceId,
      name: device.name,
      //...device, all the rest properties
      curcuits: getSchemeCicuits(device),
      riskLevel: Math.random() * 100,
    }));

  const getSchemeZones = (floor: Location) =>
    locations.getZones(floor).map((zone) => ({
      type: zone.type,
      locationId: zone.locationId,
      name: zone.name,
      riskLevel: floor.riskLevel,
      //...zone, all the rest properties
      gateways: getSchemeGateways(zone),
      devices: getSchemeIndependetDevices(floor),
    }));

  const getSchemeFloors = () =>
    locations.getSpaces(currentLocation).map((floor) => ({
      type: floor.type,
      locationId: floor.locationId,
      name: floor.name,
      riskLevel: floor.riskLevel,
      // ...floor, all the rest properties
      zones: getSchemeZones(floor),
      gateways: getSchemeGateways(floor),
      devices: getSchemeIndependetDevices(floor),
    }));

  const scheme: SchemeFloor[] = getSchemeFloors();
  console.log(scheme); // TODO fix the scheme drawing with new "independent devices" property

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const activeFormation = locations.getElementById(ui.currentFormation);
  const [selectedLocations, setSelectedLocations] = useState(currentLocation);

  const buildings = locations.getBuildings(activeFormation);
  const buildingsListOptions = [{ name: 'All locations' }, ...buildings.map((location) => location)];

  const handleSelectChange = (newOption: any) => {
    setSelectedLocations(newOption);
    if (newOption.name === 'All locations') {
      navigate('../map');
    } else {
      ui.setEmsCurrentLocation(newOption.locationId);
      navigate('../scheme');
    }
  };

  return (
    <>
      <Header icon={<ModuleIcon />} title={t('solutions.dashboard.label', 'Dashboard', 'Dashboard page title.')} />
      <UnitContainer>
        <Unit variant='sidebar'>
          <Grid display='grid' className={styles['unit-sidebar-grid']}>
            <Grid className={styles['unit-sidebar-widget']}>
              <DataSelect
                onChange={setSelectedOption}
                options={options}
                placeholder={options[0].name}
                present={(item) => item?.name}
                value={selectedOption}
                variant='control'
              />
            </Grid>
            <Grid className={styles['unit-sidebar-body']}>
              <Card className={cn(styles['card'])} scrollable fullWidth fullHeight>
                <Scrollbar>
                  {currentLocation?.children?.map((floor) => (
                    <BuildingCard
                      key={floor.locationId}
                      deviceTotal={devices.getTotal(floor)}
                      deviceCountCritical={0}
                      deviceCountWarning={0}
                      riskLevel={floor.riskLevel}
                      title={floor.name}
                      type={floor.type}
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
                options={buildingsListOptions}
                placeholder='All locations'
                present={(item) => item?.name}
                value={selectedLocations}
                variant='control'
                size='md'
              />
            </div>
            <ReactFlowProvider>
              <ReactFlowMap initialNodes={scheme as any} initialEdges={[]} />
            </ReactFlowProvider>
          </Grid>
        </Unit>
      </UnitContainer>
    </>
  );
});

// title={activeFormation && activeFormation.name}
// Current formation: {activeFormation?.name}
//  Current ems location: {ui.emsCurrentLocation}
// {currentLocation?.name}

const options = [{ name: 'Device Overview' }, { name: 'Event Monitoring' }];
