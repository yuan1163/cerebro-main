import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

import { Location, LocationType } from '@core/api/types';
import { useLocations } from '@core/storages/controllers/locations';
import { Button } from '@core/ui/components/Button';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { MultiSelect } from '@core/ui/components/MultiSelect';
import MonthNodeConsumptionChart from '../MonthNodeConsumptionChart';
import MonthNodeConsumptionData from '../MonthNodeConsumptionData';
import { useUI } from '@core/storages/ui';
import { useUserProperty } from '@core/storages/controllers/userProperities';
import { analysisNodeLocations } from '@solutions/ems/storages/analysisLocation';

type SearchLocationInput = {
  locationsArray: Location[];
  name: string;
  lastMonthConsumption?: number;
  thisMonthConsumption?: number;
  lastMonthCO2e?: number;
  thisMonthCO2e?: number;
};

const flat = (hierarchy: Location[] | undefined): Location[] => {
  if (!hierarchy) {
    return [];
  }
  const result = [...hierarchy];
  for (const item of hierarchy) {
    result.push(...flat(item.children));
  }
  return result;
};

const getType = (item: Location): string => {
  switch (item.type) {
    case LocationType.Company:
      return t('location.company.label', 'Company', 'Company.');
    case LocationType.Region:
      return t('location.region.label', 'Region', 'Region.');
    case LocationType.Formation:
      return t('location.formation.label', 'Formation', 'Organization.');
    case LocationType.Building:
      return t('location.building.label', 'Building', 'Building.');
    case LocationType.Space:
      return t('location.space.label', 'Space', 'Interior or enclosed areas within a building.');
    default:
      return t('location.unknown.label', 'Unknown', 'Unknown location.');
  }
};

const MonthNodeConsumption = () => {
  const locations = useLocations();
  const ui = useUI();

  const currentFormation = locations.getFormations()?.find((formation) => {
    return formation.locationId === ui.currentFormation;
  });

  // LOCATIONS LIST

  const locationsList = React.useMemo(() => flat(currentFormation?.children), [currentFormation?.children]);

  const controller = analysisNodeLocations();

  const nodeLocationProperty = controller.analysisLocations.getNodeLocation(ui.currentFormation);

  const searchLocations: Location[] = nodeLocationProperty
    ? nodeLocationProperty.value?.split(',').map((locationId: number) => {
        return locations.getElementById(Number(locationId));
      })
    : [];

  controller.analysisLocations.buildSearchNodeLocations(searchLocations);

  const property = useUserProperty({
    name: 'analysisNode_' + controller.analysisLocations.currentFormationNode,
    value: controller.analysisLocations.searchNodeLocations,
  });

  const handleSearchLocation = () => {
    const searchLocationIdArray = controller.analysisLocations.searchNodeLocations?.map(
      (location) => location.locationId,
    );
    if (searchLocationIdArray && searchLocationIdArray.length > 0) {
      property.update({
        name: 'analysisNode_' + controller.analysisLocations.currentFormationNode,
        value: searchLocationIdArray,
      });
    }
    // console.log(controller.analysisLocations.searchNodeLocations);
  };

  return (
    <Card fullWidth className={styles['card']}>
      <CardHeader
        // action={
        //   <Grid className='w-36'>
        //     <DataSelect options={yearOptions} present={(item) => item?.label} value={yearOptions[0]}></DataSelect>
        //   </Grid>
        // }
        borderBottom
        title={t(
          'ems.currentMonthNodeConsumptin.label',
          'Current Month Node Consumption',
          'Current Month Node Consumption title',
        )}
      />
      <CardContent>
        <Grid direction={'column'}>
          <Grid alignItems='baseline'>
            <Grid className={styles['select-locations']}>
              <MultiSelect
                equals={(item1: Location, item2: Location) => item1.locationId === item2.locationId}
                id={'selectLocation'}
                onAppend={(location) => controller.addLocation(location)}
                onRemove={(location) => controller.removeLocation(location)}
                onClear={controller.clearLocation}
                placeholder={t('ems.selectLocations.label', 'Select Locations', 'Select locations.')}
                present={(item: Location) => `${item.name} (${getType(item)})`}
                source={locationsList}
                value={searchLocations}
                size={'sm'}
              />
            </Grid>
            <Grid>
              <Button size='md' onClick={handleSearchLocation}>
                {t('general.search.label', 'Search', 'Exploration of a specific item.')}
              </Button>
            </Grid>
          </Grid>

          <MonthNodeConsumptionData searchLocations={searchLocations} />
          <MonthNodeConsumptionChart searchLocations={searchLocations} />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonthNodeConsumption;
