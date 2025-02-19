import { useState, useEffect } from 'react';

// utils

import { t } from '@core/utils/translate';

// types
import { Location } from '@core/api/types';
import { SelectOption } from '@core/ui/components/Select';

// storages
import { useUI } from '@core/storages/ui';
import { useLocations } from '@core/storages/controllers/locations';
//import { useRedirector } from '@core/storages/redirector';
import { useTranslation } from '@core/storages/translation';


const translation = useTranslation();

export const useFilters = () => {
  const ui = useUI();
  const locations = useLocations();
  const translation = useTranslation();

  //const redirector = useRedirector();
  const deviceTypes = [
    { label: t('asset.allCategories.label', 'All categories', 'All categories of devices.'), value: undefined },
    {
      label: t('asset.stations.label', 'Stations', 'Centralized locations or setup for managing and accessing devices.'),
      value: 101,
    },
    {
      label: t('asset.trackers.label', 'Trackers', 'Tools or systems used to monitor and follow activities.'),
      value: 102,
    },
  ];

  const noBuildingsOption = {
    label: t('location.buildingsWarning.label', 'There are no buildings', 'Buildings warning.'),
    value: locations.getCompany(),
  };

  const noSpacesOption = {
    label: t('location.spacesWarning.label', 'There are no spaces', 'Spaces warning.'),
    value: locations.getCompany(),
  };

  const [buildings, setBuildings] = useState<SelectOption<Location>[]>();
  const [filterBuilding, setFilterBuilding] = useState<SelectOption<Location>>();

  const [spaces, setSpaces] = useState<SelectOption<Location>[]>();
  const [filterSpace, setFilterSpace] = useState<SelectOption<Location>>();

  const [filterDeviceType, setFilterDeviceType] = useState(ui.activeDeviceType || deviceTypes[0]);

  useEffect(() => {
    const activeFormation = locations.getElementById(ui.currentFormation);
    const buildings =
      activeFormation &&
      locations.getBuildings(activeFormation).map((building) => ({
        label: building.name,
        value: building,
      }));
    setBuildings(buildings?.length ? buildings : undefined);
  }, [ui.currentFormation]);

  useEffect(() => {
    setFilterBuilding(ui.activeBuilding || buildings?.[0] || noBuildingsOption);
  }, [buildings]);

  // 選擇建築後 取得該建築的樓層, 組出樓層選單 label, value
  useEffect(() => {
    const spaces =
      buildings &&
      filterBuilding &&
      locations.getSpaces(filterBuilding.value).map((space) => ({
        label: space.name,
        value: space,
      }));
    setSpaces(spaces?.length ? spaces : undefined);
  }, [filterBuilding]);

  useEffect(() => {
    setFilterSpace(ui.activeSpace || spaces?.[0] || noSpacesOption);
  }, [spaces]);

  useEffect(() => {
    setFilterDeviceType(ui.activeDeviceType || deviceTypes[0]);
  }, [translation.language]);

  return {
    buildings,
    filterBuilding,
    setFilterBuilding: (option: SelectOption<Location>) => {
      setFilterBuilding(option);
      ui.setActiveBuilding(option);
    },
    spaces,
    filterSpace,
    setFilterSpace: (option: SelectOption<Location>) => {
      setFilterSpace(option);
      ui.setActiveSpace(option);
    },
    deviceTypes,
    filterDeviceType,
    setFilterDeviceType: (option: SelectOption<number | undefined>) => {
      setFilterDeviceType(option);
      ui.setActiveDeviceType(option);
    },
  };
};
