import React, { useState, useEffect, useRef, useMemo } from 'react';
import { observer } from 'mobx-react';

// data
import { Location } from '@core/api/types';
import { DeviceParts } from '@solutions/ems/api/entities/deviceParts';
import { useLocations } from '@core/storages/controllers/locations';
import { useCurrentDeviceParts } from '@solutions/ems/api/hook/useDeviceParts';
import { useCurrentDeviceParameters } from '@solutions/ems/api/hook/useDeviceParameters';

import { useUI } from '@core/storages/ui';

// utils

import { t } from '@core/utils/translate';

// styles

import styles from './styles.module.scss';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);
const spacing = fullConfig.theme?.spacing as { [key: string]: any };

// components

import { Backdrop } from '@core/ui/components/Backdrop';
import { Breadcrumbs } from '@core/ui/components/Breadcrumbs';
import { Crumb } from '@core/ui/components/Crumb';
import { DataNotFound } from '@core/ui/components/Feedback/DataNotFound';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Dialog } from '@headlessui/react';
import { DrawerMobile } from '@core/ui/components/DrawerMobile';
import { Grid } from '@core/ui/components/Grid';
import { IconButton } from '@core/ui/components/IconButton';
import { LineCards } from './lineCards';
import { MultiSelect } from '@core/ui/components/MultiSelect';
import { Navigation } from 'swiper';
import { Pagination } from '@core/ui/components/Pagination';
import { PaginationCard } from '@core/ui/components/PaginationCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Text } from '@core/ui/components/Text';
import { TimeInfo } from '@core/ui/components/TimeInfo';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { WeatherInfo } from '@core/ui/components/WeatherInfo';
import SwiperCore from 'swiper';

// pages

import { WaitingPage } from '../WaitingPage';

// icons

import Menu01LineIcon from '@assets/icons/line/menu-01.svg?component';
import SearchMdLineIcon from '@assets/icons/line/search-md.svg?component';

// types

interface SchemeMachine extends Partial<DeviceParts> {
  id?: string | number;
  name?: string;
  riskLevel: number;
}

interface SchemeProcess extends Partial<Location> {
  machines: SchemeMachine[];
}

interface SchemeProductionLine extends Partial<Location> {
  processes: SchemeProcess[];
}

type ProcessItem = {
  name?: string;
  count?: number;
};

type Process = {
  type: string;
  name?: string;
  process?: ProcessItem[];
  machines?: SchemeMachine[];
  riskLevel: number | undefined;
  locationId: number;
};

type LineData = {
  name?: string;
  risklevel?: number;
  processes?: Process[];
};

interface MultiSelectOption {
  id: string | number;
  name: string;
  riskLevel?: number;
  checked?: boolean;
}

// SWIPER

const useSwiperRef = <T extends HTMLElement>(): [T | null, React.Ref<T>] => {
  const [wrapper, setWrapper] = useState<T | null>(null);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      setWrapper(ref.current);
    }
  }, []);
  return [wrapper, ref];
};

const otherProps = {};

export const EMSCommandCenterPage: React.FC = observer(() => {
  // HAMBURGER

  const [isDrawerMobileOpen, setIsDrawerMobileOpen] = useState(false);

  const handleToggleDrawerMobile = () => {
    setIsDrawerMobileOpen(!isDrawerMobileOpen);
  };

  // HEIGHT

  const [height, setHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const widgetRef = useRef<HTMLDivElement>(null);

  function remToPixels(remString: string) {
    const remValue = parseFloat(remString);
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return remValue * rootFontSize;
  }

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // REAL DATA

  const locations = useLocations();

  const deviceParts = useCurrentDeviceParts({
    locationId: locations.hasData() ? locations.getAccessRoot().locationId : undefined,
  });

  const partLocationIds = deviceParts.getPartLocationIds();

  const deviceParameters = useCurrentDeviceParameters({
    partLocationId: partLocationIds,
    paramName: ['current', 'maxCurrent'],
  });
  const ui = useUI();

  // FORMATION

  const currentFormation = locations.hasData() ? locations.getElementById(ui.currentFormation) : undefined;

  // LOCATION

  const currentLocation = locations.getElementById(ui.emsCurrentLocation);

  // RISK LEVEL

  interface DeviceParameters {
    getDeviceParameter(deviceId: string, partIndex: string, parameterName: string): string | null | undefined;
  }

  const getRiskLevel = (deviceId: string, partIndex: string, deviceParameters: DeviceParameters) => {
    const currentStr = deviceParameters.getDeviceParameter(deviceId, partIndex, 'current');
    const maxCurrentStr = deviceParameters.getDeviceParameter(deviceId, partIndex, 'maxCurrent');
    const current = currentStr ? parseFloat(currentStr) : null;
    const maxCurrent = maxCurrentStr ? parseFloat(maxCurrentStr) : null;

    if (current === null || maxCurrent === null || isNaN(current) || isNaN(maxCurrent)) {
      return 0;
    }
    return Math.min((current / maxCurrent) * 100, 100);
  };

  const getSchemeMachines = (process: Location) =>
    deviceParts.getTargeted(process).map((machine) => {
      const riskLevel = getRiskLevel(machine.deviceId!, machine.index!, deviceParameters);
      const safeRiskLevel = riskLevel !== null ? riskLevel : 0;
      const cleanDescription = (machine.description || '').replace(/\s+/g, '');
      const deviceId = `${machine.deviceId}${cleanDescription}`;
      return {
        deviceId: deviceId,
        index: machine.index,
        description: machine.description,
        // ...machine, all the rest properties of DevicePart
        riskLevel: safeRiskLevel,
      };
    });

  const getSchemeProcesses = (productionLine: Location) =>
    locations.getProcesses(productionLine).map((process) => ({
      type: process.type,
      locationId: process.locationId,
      name: process.name,
      riskLevel: process.riskLevel,
      // ...process, all the rest properties of Location
      machines: getSchemeMachines(process),
    }));

  const getSchemeProductionLines = () =>
    locations.getProductionLines(currentFormation).map((productionLine) => ({
      type: productionLine.type,
      locationId: productionLine.locationId,
      name: productionLine.name,
      riskLevel: productionLine.riskLevel,
      // ...productionLine, all the rest properties of Location
      processes: getSchemeProcesses(productionLine),
    }));

  // PAGINATION

  function truncateToOneDecimalPlace(num: number) {
    return Math.trunc(num * 10) / 10;
  }

  const aspectRatio = useMemo(() => truncateToOneDecimalPlace(windowWidth / height), [windowWidth, height]);
  const targetAspectRatio = useMemo(() => truncateToOneDecimalPlace(16 / 9), []);
  const maxItems = useMemo(() => {
    if (windowWidth === 1970 && height === 984) {
      return 3;
    } else if (aspectRatio >= targetAspectRatio * 0.9 && aspectRatio <= targetAspectRatio * 1.1) {
      return height >= 1081 ? 4 : 3;
    } else {
      if (height < 500) {
        return 2;
      } else if (height < 1081) {
        return 4;
      } else {
        return 3;
      }
    }
  }, [aspectRatio, height, windowWidth]);

  // FORMATIONS

  let formations:any = [];
  if (locations.hasData()) {
    formations = locations.getFormations();
  }

  // const formations = locations.getFormations() || [];
  
  const [selectedFormation, setSelectedFormation] = useState<Location | null>(formations && formations.length ? formations[0] : null);
  // const [selectedFormation, setSelectedFormation] = useState<Location | null>(currentFormation ?? null);
  
  // 測試 工廠的值預設使用第一個選項
  useEffect(() => {
    try {
      if (!selectedFormation && formations && formations.length){
        setSelectedFormation(formations[0]);
      }
    } catch (err) {
      console.error(err)
    }
  }, [formations])

  // DataSelect without Multiselect functionality
  // const getProductionLinesByFormation = (selectedFormation: Location | null): SchemeProductionLine[] => {
  //   if (!selectedFormation) return [];
  //   const buildings = locations.getBuildings(selectedFormation);
  //   let productionLines: SchemeProductionLine[] = [];
  //   buildings.forEach((building) => {
  //     const spaces = locations.getSpaces(building);
  //     spaces.forEach((space) => {
  //       const zones = locations.getZones(space);
  //       zones.forEach((zone) => {
  //         const lines = locations.getProductionLines(zone);
  //         lines.forEach((line) => {
  //           productionLines.push({
  //             ...line,
  //             processes: getSchemeProcesses(line),
  //           });
  //         });
  //       });
  //     });
  //   });

  //   return productionLines;
  // };

  const clearFormation = () => {
    if (selectedFormation !== null) setSelectedFormation(null);
    setSelectedBuilding(null);
    setSelectedSpace(null);
    setSelectedZone(null);
    setSelectedProductionLine(null);
  };

  // BUILDINGS

  // const buildings = locations.hasData() ? locations.getBuildings(currentFormation) : [];
  const [buildingsOptions, setBuildingsOptions] = useState<Location[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Location | null>(null);

  // DataSelect without Multiselect functionality
  // const getProductionLinesForSelectedBuilding = () => {
  //   if (!selectedBuilding) return [];
  //   const spaces = locations.getSpaces(selectedBuilding);
  //   let productionLines: SchemeProductionLine[] = [];
  //   spaces.forEach((space) => {
  //     const zones = locations.getZones(space);
  //     zones.forEach((zone) => {
  //       const lines = locations.getProductionLines(zone);
  //       lines.forEach((line) => {
  //         productionLines.push({
  //           type: line.type,
  //           locationId: line.locationId,
  //           name: line.name,
  //           riskLevel: line.riskLevel,
  //           processes: getSchemeProcesses(line),
  //         });
  //       });
  //     });
  //   });
  //   return productionLines;
  // };

  const clearBuilding = () => {
    setSelectedBuilding(null);
    setSelectedSpace(null);
    setSelectedZone(null);
    setMachinesOptions(null);
    setSelectedProductionLine(null);
  };

  useEffect(() => {
    if (selectedFormation) {
      const newBuildings = locations.getBuildings(selectedFormation ?? undefined);
      setBuildingsOptions(newBuildings);
      setSelectedBuilding(null);
    } else {
      setBuildingsOptions([]);
    }
  }, [selectedFormation]);

  // SPACES

  // const spaces = locations.hasData() ? locations.getSpaces(currentFormation) : [];
  const [spacesOptions, setSpacesOptions] = useState<Location[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<Location | null>(null);

  // DataSelect without Multiselect functionality
  // const getProductionLinesForSelectedSpace = () => {
  //   if (!selectedSpace) return [];
  //   let productionLines: SchemeProductionLine[] = [];
  //   const zones = locations.getZones(selectedSpace);
  //   zones.forEach((zone) => {
  //     const lines = locations.getProductionLines(zone);
  //     lines.forEach((line) => {
  //       productionLines.push({
  //         type: line.type,
  //         locationId: line.locationId,
  //         name: line.name,
  //         riskLevel: line.riskLevel,
  //         processes: getSchemeProcesses(line),
  //       });
  //     });
  //   });
  //   return productionLines;
  // };

  const clearSpace = () => {
    setSelectedSpace(null);
    setSelectedZone(null);
    setSelectedProductionLine(null);
    setMachinesOptions(null);
  };

  useEffect(() => {
    if (selectedBuilding) {
      const newSpaces = locations.getSpaces(selectedBuilding);
      setSpacesOptions(newSpaces);
      setSelectedSpace(null);
    } else {
      setSpacesOptions([]);
    }
  }, [selectedBuilding]);

  // ZONES FLOOR

  // const zones = locations.hasData() ? locations.getZones(currentFormation) : [];
  const [zonesOptions, setZonesOptions] = useState<Location[]>([]);
  const [selectedZone, setSelectedZone] = useState<Location | null>(null);

  // DataSelect without Multiselect functionality
  // const getProductionLinesForSelectedZone = () => {
  //   if (!selectedZone) return [];
  //   let productionLines: SchemeProductionLine[] = [];
  //   const lines = locations.getProductionLines(selectedZone);
  //   lines.forEach((line) => {
  //     productionLines.push({
  //       type: line.type,
  //       locationId: line.locationId,
  //       name: line.name,
  //       riskLevel: line.riskLevel,
  //       processes: getSchemeProcesses(line),
  //     });
  //   });
  //   return productionLines;
  // };

  const clearZone = () => {
    setSelectedZone(null);
    setSelectedProductionLine(null);
    setMachinesOptions(null);
  };

  useEffect(() => {
    if (selectedSpace) {
      const newZones = locations.getZones(selectedSpace);
      setZonesOptions(newZones);
      setSelectedZone(null);
    } else {
      setZonesOptions([]);
    }
  }, [selectedSpace]);

  // PRODUCTION LINES

  // const productionLines: LineData[] = locations.hasData() ? locations.getProductionLines(currentFormation) : [];

  const [productionLinesOptions, setProductionLinesOptions] = useState<Location[]>([]);
  const [selectedProductionLine, setSelectedProductionLine] = useState<Location | null>(null);

  const clearProductionLine = () => {
    setSelectedProductionLine(null);
    setMachinesOptions(null);
  };

  useEffect(() => {
    if (selectedZone) {
      const newProductionLines = locations.getProductionLines(selectedZone);
      setProductionLinesOptions(newProductionLines);
      setSelectedProductionLine(null);
    } else {
      setProductionLinesOptions([]);
    }
  }, [selectedZone]);

  // MACHINES

  const [machinesOptions, setMachinesOptions] = useState<SchemeMachine[] | null>([]);

  useEffect(() => {
    if (selectedProductionLine) {
      const processes = getSchemeProcesses(selectedProductionLine);
      const allMachines = processes.reduce<SchemeMachine[]>((machinesAccumulator, process) => {
        const machinesForProcess = getSchemeMachines(process as unknown as Location);
        return [...machinesAccumulator, ...machinesForProcess];
      }, []);
      const formattedMachines = allMachines.map((machine) => ({
        id: machine.deviceId || 'unknown-id',
        name: machine.description || 'No Description',
        riskLevel: machine.riskLevel || 0,
      }));
      setMachinesOptions(formattedMachines);
      setMultiSelectSelectedItems(formattedMachines);
    } else {
      setMachinesOptions([]);
      setMultiSelectSelectedItems([]);
    }
  }, [selectedProductionLine]);

  // MULTISELECT

  const [multiSelectOptions, setMultiSelectOptions] = useState<MultiSelectOption[]>([]);
  const [multiSelectSelectedItems, setMultiSelectSelectedItems] = useState<MultiSelectOption[]>([]);

  const notAvailableCaption = t('general.notAvailable.label', 'n/a', 'Not Available.');

  useEffect(() => {
    // BUILDINGS

    if (selectedFormation && !selectedBuilding) {
      const buildingsOptions = locations.getBuildings(selectedFormation).map((building) => ({
        id: building.locationId,
        name: building.name || notAvailableCaption,
        checked: true,
      }));
      setMultiSelectOptions(buildingsOptions);
      setMultiSelectSelectedItems(buildingsOptions);
    }

    // SPACES
    else if (selectedBuilding && !selectedSpace) {
      const spacesOptions = locations.getSpaces(selectedBuilding).map((space) => ({
        id: space.locationId,
        name: space.name || notAvailableCaption,
        checked: true,
      }));
      setMultiSelectOptions(spacesOptions);
      setMultiSelectSelectedItems(spacesOptions);
    }

    // ZONES
    else if (selectedSpace && !selectedZone) {
      const zonesOptions = locations.getZones(selectedSpace).map((zone) => ({
        id: zone.locationId,
        name: zone.name || notAvailableCaption,
        checked: true,
      }));
      setMultiSelectOptions(zonesOptions);
      setMultiSelectSelectedItems(zonesOptions);
    }

    // PRODUCTION LINES
    else if (selectedZone && !selectedProductionLine) {
      const linesOptions = locations.getProductionLines(selectedZone).map((line) => ({
        id: line.locationId,
        name: line.name || notAvailableCaption,
        checked: true,
      }));
      setMultiSelectOptions(linesOptions);
      setMultiSelectSelectedItems(linesOptions);
    }

    // MACHINES
    else if (selectedProductionLine) {
      const processes = getSchemeProcesses(selectedProductionLine);
      const allMachines = processes.reduce<SchemeMachine[]>((machinesAccumulator, process) => {
        const machinesForProcess = getSchemeMachines(process as unknown as Location);
        return [...machinesAccumulator, ...machinesForProcess];
      }, []);
      const machinesOptions = allMachines.map((machine) => ({
        id: machine.deviceId,
        name: machine.description || notAvailableCaption,
        checked: true,
      }));
      setMultiSelectOptions(machinesOptions as MultiSelectOption[]);
      setMultiSelectSelectedItems(machinesOptions as MultiSelectOption[]);
    } else {
      setMultiSelectOptions([]);
      setMultiSelectSelectedItems([]);
    }
  }, [selectedFormation, selectedBuilding, selectedSpace, selectedZone, selectedProductionLine]);

  // EQUALITY

  const equals = (item1: MultiSelectOption, item2: MultiSelectOption) => {
    return item1.id === item2.id && item1.checked === item2.checked;
  };

  // ON REMOVE

  const [selectedBuildings, setSelectedBuildings] = useState<Location[]>([]);
  const [selectedSpaces, setSelectedSpaces] = useState<Location[]>([]);
  const [selectedZones, setSelectedZones] = useState<Location[]>([]);
  const [selectedProductionLines, setSelectedProductionLines] = useState<SchemeProductionLine[]>([]);
  const [selectedMachines, setSelectedMachines] = useState<SchemeMachine[]>([]);

  useEffect(() => {
    if (selectedFormation) {
      const buildings = locations.getBuildings(selectedFormation);
      setSelectedBuildings(buildings);
    } else {
      setSelectedBuildings([]);
    }
  }, [selectedFormation]);

  useEffect(() => {
    if (selectedBuilding) {
      const spaces = locations.getSpaces(selectedBuilding);
      setSelectedSpaces(spaces);
    } else {
      setSelectedSpaces([]);
    }
  }, [selectedBuilding]);

  useEffect(() => {
    if (selectedSpace) {
      const zones = locations.getZones(selectedSpace);
      setSelectedZones(zones);
    } else {
      setSelectedZones([]);
    }
  }, [selectedSpace]);

  useEffect(() => {
    if (selectedZone) {
      const productionLines = locations.getProductionLines(selectedZone).map((productionLine) => ({
        ...productionLine,
        processes: getSchemeProcesses(productionLine),
      }));
      setSelectedProductionLines(productionLines);
    } else {
      setSelectedProductionLines([]);
    }
  }, [selectedZone]);

  useEffect(() => {
    if (selectedProductionLine) {
      const processes = getSchemeProcesses(selectedProductionLine);
      const allMachines = processes.reduce<SchemeMachine[]>((machinesAccumulator, process) => {
        const machinesForProcess = getSchemeMachines(process as unknown as Location);
        return [...machinesAccumulator, ...machinesForProcess];
      }, []);
      const formattedMachines = allMachines.map((machine) => ({
        id: machine.deviceId,
        name: machine.description,
        riskLevel: machine.riskLevel || 0,
      }));
      setSelectedMachines(formattedMachines);
    } else {
      setSelectedMachines([]);
    }
  }, [selectedProductionLine]);

  // ON REMOVE

  const handleMultiSelectRemove = (removedOptionId: MultiSelectOption) => {
    const idToRemoveString = removedOptionId.id;
    const idToRemoveNumber = Number(idToRemoveString);

    if (selectedFormation && !selectedBuilding) {
      const updatedSelectedBuildings = selectedBuildings.filter((building) => building.locationId !== idToRemoveNumber);
      setSelectedBuildings(updatedSelectedBuildings);
      const newSelectedItems = multiSelectSelectedItems.filter((item) => item.id !== removedOptionId.id);
      setMultiSelectSelectedItems(newSelectedItems);
      const newOptions = multiSelectOptions.map((option) => {
        if (option.id === removedOptionId.id) {
          return { ...option, checked: false };
        }
        return option;
      });
      setMultiSelectOptions(newOptions);
    } else if (selectedBuilding && !selectedSpace) {
      const updatedSelectedSpaces = selectedSpaces.filter((space) => space.locationId !== idToRemoveNumber);
      setSelectedSpaces(updatedSelectedSpaces);
      const newSelectedItems = multiSelectSelectedItems.filter((item) => item.id !== removedOptionId.id);
      setMultiSelectSelectedItems(newSelectedItems);
      const newOptions = multiSelectOptions.map((option) => {
        if (option.id === removedOptionId.id) {
          return { ...option, checked: false };
        }
        return option;
      });
      setMultiSelectOptions(newOptions);
    } else if (selectedSpace && !selectedZone) {
      const updatedSelectedZones = selectedZones.filter((zone) => zone.locationId !== idToRemoveNumber);
      setSelectedZones(updatedSelectedZones);
      const newSelectedItems = multiSelectSelectedItems.filter((item) => item.id !== removedOptionId.id);
      setMultiSelectSelectedItems(newSelectedItems);
      const newOptions = multiSelectOptions.map((option) => {
        if (option.id === removedOptionId.id) {
          return { ...option, checked: false };
        }
        return option;
      });
      setMultiSelectOptions(newOptions);
    } else if (selectedZone && !selectedProductionLine) {
      const updatedSelectedProductionLines = selectedProductionLines.filter(
        (line) => line.locationId !== idToRemoveNumber,
      );
      setSelectedProductionLines(updatedSelectedProductionLines);
      const newSelectedItems = multiSelectSelectedItems.filter((item) => item.id !== removedOptionId.id);
      setMultiSelectSelectedItems(newSelectedItems);
      const newOptions = multiSelectOptions.map((option) => {
        if (option.id === removedOptionId.id) {
          return { ...option, checked: false };
        }
        return option;
      });
      setMultiSelectOptions(newOptions);
    } else if (selectedProductionLine) {
      const updatedSelectedMachines = selectedMachines.filter((machine) => machine.id !== idToRemoveString);
      setSelectedMachines(updatedSelectedMachines);
      const newSelectedItems = multiSelectSelectedItems.filter((item) => item.id !== removedOptionId.id);
      setMultiSelectSelectedItems(newSelectedItems);
      const newOptions = multiSelectOptions.map((option) => {
        if (option.id === removedOptionId.id) {
          return { ...option, checked: false };
        }
        return option;
      });
      setMultiSelectOptions(newOptions);
    }
  };

  const handleMultiSelectAppend = (appendedOptionId: MultiSelectOption) => {
    const idToAppendString = appendedOptionId.id;
    const idToAppendNumber = Number(appendedOptionId.id);
    // BUILDINGS
    if (selectedFormation && !selectedBuilding) {
      const isBuildingAlreadySelected = selectedBuildings.some((building) => building.locationId === idToAppendNumber);
      if (!isBuildingAlreadySelected) {
        const buildingToAdd = buildingsOptions.find((building) => building.locationId === idToAppendNumber);
        if (buildingToAdd) {
          setSelectedBuildings((prev) => [...prev, buildingToAdd]);
          const itemToAdd = { id: buildingToAdd.locationId, name: buildingToAdd.name, checked: true };
          setMultiSelectSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemToAdd]);
          setMultiSelectOptions((prevOptions) =>
            prevOptions.map((option) => {
              return option.id === idToAppendString ? { ...option, checked: true } : option;
            }),
          );
        }
      }
    }
    // SPACES
    if (selectedBuilding && !selectedSpace) {
      const isSpaceAlreadySelected = selectedSpaces.some((space) => space.locationId === idToAppendNumber);
      if (!isSpaceAlreadySelected) {
        const spaceToAdd = spacesOptions.find((space) => space.locationId === idToAppendNumber);
        if (spaceToAdd) {
          setSelectedSpaces((prevSpaces) => [...prevSpaces, spaceToAdd]);
          const itemToAdd = { id: spaceToAdd.locationId, name: spaceToAdd.name, checked: true };
          setMultiSelectSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemToAdd]);
          setMultiSelectOptions((prevOptions) =>
            prevOptions.map((option) => {
              return option.id === idToAppendString ? { ...option, checked: true } : option;
            }),
          );
        }
      }
    }

    // ZONES

    if (selectedSpace && !selectedZone) {
      const isZoneAlreadySelected = selectedZones.some((zone) => zone.locationId === idToAppendNumber);
      if (!isZoneAlreadySelected) {
        const zoneToAdd = zonesOptions.find((zone) => zone.locationId === idToAppendNumber);
        if (zoneToAdd) {
          setSelectedZones((prevZones) => [...prevZones, zoneToAdd]);
          const itemToAdd = { id: zoneToAdd.locationId, name: zoneToAdd.name, checked: true };
          setMultiSelectSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemToAdd]);
          setMultiSelectOptions((prevOptions) =>
            prevOptions.map((option) => {
              return option.id === idToAppendString ? { ...option, checked: true } : option;
            }),
          );
        }
      }
    }

    // PRODUCTION LINES

    if (selectedZone && !selectedProductionLine) {
      const isProductionLineAlreadySelected = selectedProductionLines.some(
        (line) => line.locationId === idToAppendNumber,
      );
      if (!isProductionLineAlreadySelected) {
        const productionLineToAdd = productionLinesOptions.find((line) => line.locationId === idToAppendNumber);
        if (productionLineToAdd) {
          const productionLineAsScheme = {
            ...productionLineToAdd,
            processes: getSchemeProcesses(productionLineToAdd),
          };
          setSelectedProductionLines((prevLines) => [...prevLines, productionLineAsScheme]);
          const itemToAdd = { id: productionLineToAdd.locationId, name: productionLineToAdd.name, checked: true };
          setMultiSelectSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemToAdd]);
          setMultiSelectOptions((prevOptions) =>
            prevOptions.map((option) => {
              return option.id === idToAppendString ? { ...option, checked: true } : option;
            }),
          );
        }
      }
    }

    // MACHINES

    if (selectedProductionLine && machinesOptions) {
      const isMachineAlreadySelected = selectedMachines.some((machine) => machine.id === idToAppendString);
      if (!isMachineAlreadySelected) {
        const machineToAdd = machinesOptions.find((machine) => machine.id === idToAppendString);
        if (machineToAdd && machineToAdd.id !== undefined && machineToAdd.name) {
          setSelectedMachines((prevMachines) => [...prevMachines, machineToAdd]);
          const itemToAdd = { id: machineToAdd.id, name: machineToAdd.name, checked: true };
          setMultiSelectSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemToAdd]);
          setMultiSelectOptions((prevOptions) =>
            prevOptions.map((option) => {
              return option.id === idToAppendString ? { ...option, checked: true } : option;
            }),
          );
        }
      }
    }
  };

  // SELECT ALL CHECKBOX

  const [selectAllChecked, setSelectAllChecked] = useState(true);

  const toggleSelectAll = () => {
    setSelectAllChecked(!selectAllChecked);
    const updatedOptions = multiSelectOptions.map((option) => ({
      ...option,
      checked: !selectAllChecked,
    }));
    setMultiSelectOptions(updatedOptions);
    if (!selectAllChecked) {
      setMultiSelectSelectedItems(updatedOptions);
      const productionLinesWithProcesses = productionLinesOptions.map((line) => ({
        ...line,
        processes: getSchemeProcesses(line),
      }));
      setSelectedProductionLines(productionLinesWithProcesses);
      if (machinesOptions) {
        setSelectedMachines(machinesOptions);
      }
      setSelectedBuildings(buildingsOptions);
      setSelectedSpaces(spacesOptions);
      setSelectedZones(zonesOptions);
    } else {
      setMultiSelectSelectedItems([]);
      if (selectedBuilding && !selectedSpace) {
        setSelectedSpaces([]);
      } else if (selectedFormation && !selectedBuilding) {
        setSelectedBuildings([]);
      } else if (selectedSpace && !selectedZone) {
        setSelectedZones([]);
      } else if (selectedZone && !selectedProductionLine) {
        setSelectedProductionLines([]);
      } else if (selectedProductionLine) {
        setSelectedMachines([]);
      }
    }
  };

  // FILTERS

  const getFilteredProductionLinesBySelectedBuildings = (): SchemeProductionLine[] => {
    let productionLines: SchemeProductionLine[] = [];
    selectedBuildings.forEach((building) => {
      const spaces = locations.getSpaces(building);
      spaces.forEach((space) => {
        const zones = locations.getZones(space);
        zones.forEach((zone) => {
          const lines = locations.getProductionLines(zone);
          lines.forEach((line) => {
            productionLines.push({
              ...line,
              processes: getSchemeProcesses(line),
            });
          });
        });
      });
    });
    return productionLines;
  };

  const getFilteredProductionLinesBySelectedSpaces = (): SchemeProductionLine[] => {
    let productionLines: SchemeProductionLine[] = [];
    selectedSpaces.forEach((space) => {
      const zones = locations.getZones(space);
      zones.forEach((zone) => {
        const lines = locations.getProductionLines(zone);
        lines.forEach((line) => {
          productionLines.push({
            ...line,
            processes: getSchemeProcesses(line),
          });
        });
      });
    });
    return productionLines;
  };

  const getFilteredProductionLinesBySelectedZones = (): SchemeProductionLine[] => {
    let productionLines: SchemeProductionLine[] = [];
    selectedZones.forEach((zone) => {
      const lines = locations.getProductionLines(zone);
      lines.forEach((line) => {
        productionLines.push({
          ...line,
          processes: getSchemeProcesses(line),
        });
      });
    });
    return productionLines;
  };

  function getFilteredProductionLinesBySelectedProductionLine() {
    if (!selectedProductionLine) return [];
    const processes = getSchemeProcesses(selectedProductionLine);
    const updatedProcesses = processes.map((process) => {
      const filteredMachines = getSchemeMachines(process as unknown as Location).filter((machine) =>
        selectedMachines.some((selectedMachine) => selectedMachine.id === machine.deviceId),
      );

      return { ...process, machines: filteredMachines };
    });
    return [{ ...selectedProductionLine, processes: updatedProcesses }];
  }

  // FILTER

  const [filteredLines, setFilteredLines] = useState<SchemeProductionLine[]>([]);

  useEffect(() => {
    let newFilteredLines: SchemeProductionLine[] = [];

    if (selectedProductionLine) {
      newFilteredLines = getFilteredProductionLinesBySelectedProductionLine();
    } else if (selectedZone) {
      newFilteredLines = selectedProductionLines;
    } else if (selectedSpace) {
      newFilteredLines = getFilteredProductionLinesBySelectedZones();
    } else if (selectedBuilding) {
      newFilteredLines = getFilteredProductionLinesBySelectedSpaces();
    } else if (selectedFormation) {
      newFilteredLines = getFilteredProductionLinesBySelectedBuildings();
    } else {
      newFilteredLines = [];
    }
    if (JSON.stringify(newFilteredLines) !== JSON.stringify(filteredLines)) {
      setFilteredLines(newFilteredLines);
    }

    // It's crucial to include locations in the dependency array of useEffect
  }, [selectedFormation, selectedBuilding, selectedSpace, selectedZone, selectedProductionLine, locations]);

  // CHUNK

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 1;
  const [chunkedData, setChunkedData] = useState<SchemeProductionLine[][]>([]);

  function chunkData(dataArray: any[], chunkSize: number) {
    let result = [];
    for (let i = 0; i < dataArray.length; i += chunkSize) {
      let chunk = dataArray.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  }

  useEffect(() => {
    const nonEmptyLines = filteredLines.filter((line) => line.processes.length > 0);
    const chunks = chunkData(nonEmptyLines, itemsPerPage);

    if (JSON.stringify(chunks) !== JSON.stringify(chunkedData)) {
      setChunkedData(chunks);
    }
    const newTotalPages = Math.ceil(chunks.length / itemsPerPage);
    setTotalPages(newTotalPages);
  }, [filteredLines, itemsPerPage, chunkedData]);

  // PAGINATION CONTROLS

  const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
  const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const onSwiper = (swiper: SwiperCore) => {
    setSwiperInstance(swiper);
  };

  const handlePaginationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      if (swiperInstance) {
        swiperInstance.slideTo(page - 1);
      }
    }
  };

  const handlePrevClick = () => {
    if (swiperInstance && currentPage >= 1) {
      setCurrentPage((current) => Math.max(current - 1, 0));
      swiperInstance.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperInstance && currentPage < totalPages) {
      setCurrentPage((current) => Math.max(current + 1, chunkedData.length));
      swiperInstance.slideNext();
    }
  };

  const onSlideChange = () => {
    if (swiperInstance) {
      const newPage = swiperInstance.activeIndex + 1;
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.on('slideChange', onSlideChange);
    }
    return () => {
      if (swiperInstance) {
        swiperInstance.off('slideChange', onSlideChange);
      }
    };
  }, [swiperInstance]);

  // LOADING

  if (!locations.hasData()) return <WaitingPage />;

  return (
    <>
      <UnitContainer className={styles['unit-container']}>
        {chunkedData.length !== 0 ? (
          <PaginationCard>
            <Pagination
              currentPage={currentPage}
              handleInputChange={handlePaginationInputChange}
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
              nextElRef={nextElRef}
              prevElRef={prevElRef}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </PaginationCard>
        ) : null}
        <Unit className={styles['unit']}>
          {/* WIDGET */}
          <Grid>
            <div ref={widgetRef} className={styles['widget-container']}>
              <Grid alignItems='center' gap={3}>
                <IconButton ariaLabel='Menu' size='lg' onClick={handleToggleDrawerMobile} variant='text'>
                  <Menu01LineIcon />
                </IconButton>
                <Breadcrumbs aria-label='breadcrumbs'>
                  {selectedFormation && <Crumb onClick={clearBuilding} title={selectedFormation.name} />}
                  {selectedFormation && selectedBuilding && (
                    <Crumb onClick={clearSpace} title={selectedBuilding?.name} />
                  )}
                  {selectedFormation && selectedBuilding && selectedSpace && (
                    <Crumb onClick={clearZone} title={selectedSpace?.name} />
                  )}
                  {selectedFormation && selectedBuilding && selectedSpace && selectedZone && (
                    <Crumb onClick={clearProductionLine} title={selectedZone?.name} />
                  )}
                  {selectedFormation && selectedBuilding && selectedSpace && selectedZone && selectedProductionLine && (
                    <Crumb title={selectedProductionLine?.name} />
                  )}
                </Breadcrumbs>
              </Grid>
              {locations.getElementById(ui.currentFormation)?.timezone && (
                <Grid>
                  {/* <WeatherInfo /> */}
                  <TimeInfo timezone={locations.getElementById(ui.currentFormation)?.timezone} />
                </Grid>
              )}
            </div>
          </Grid>

          {/* SWIPER */}

          {chunkedData.length === 0 ? (
            <Grid alignItems='center' justifyContent='center' fullHeight fullWidth>
              <DataNotFound
                icon={<SearchMdLineIcon />}
                title={t(
                  'general.itemsNotFound.label',
                  'Items not found',
                  'The text notifies the user that no items are available for display.',
                )}
                subtitle={t(
                  'ems.commandCenterItemsNotFound.label',
                  'Oops, there are no displayed items. Please select at least one item or try to release the filters',
                  'The text notifies the user that no items are available for display, potentially due to overly strict filters or no selections made. It suggests adjusting filters or making a selection to see results.',
                )}
              />
            </Grid>
          ) : (
            <Swiper
              autoHeight={true}
              className={styles['swiper']}
              modules={[Navigation]}
              mousewheel={{ forceToAxis: true }}
              navigation={{ prevEl, nextEl }}
              onSlideChange={onSlideChange}
              onSwiper={onSwiper}
              slidesPerView={1}
              spaceBetween={50}
              touchEventsTarget='container'
              {...(otherProps as any)}
            >
              {chunkedData.map((lineItems: SchemeProductionLine[], lineIndex: number) => {
                const singleRow = lineItems.length === 1;
                return (
                  <SwiperSlide key={lineIndex} style={{ height: '100%' }}>
                    <Grid
                      display='grid'
                      fullHeight
                      fullWidth
                      direction='column'
                      className={styles['container']}
                      style={{
                        gridTemplateRows: singleRow
                          ? '1fr'
                          : `repeat(${height <= 1080 || (windowWidth === 1970 && height === 984) ? 3 : 4}, 1fr)`,
                      }}
                    >
                      {lineItems.map(
                        (lineItem: SchemeProductionLine, index: number) =>
                          lineItem.processes.length > 0 && (
                            <LineCards key={index} lineItem={lineItem} singleRow={singleRow} />
                          ),
                      )}
                    </Grid>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </Unit>
      </UnitContainer>

      {/* MOBILE DRAWER */}

      {isDrawerMobileOpen && (
        <Dialog as='div' className={styles['dialog']} onClose={handleToggleDrawerMobile} open={isDrawerMobileOpen}>
          <Backdrop onClick={handleToggleDrawerMobile} />
          <DrawerMobile
            onClose={handleToggleDrawerMobile}
            title={t(
              'solutions.commandCenter.label',
              'Command Center',
              'A hub for overseeing and controlling operations.',
            )}
            onBackNavigate={() => ui.gotoDashboard()}
            backLabel={t('solutions.backToDashboard.label', 'Back to Dashboard', 'Back to Dashboard button or link.')}
          >
            <Grid container direction='column' spacing={1} fullWidth>
              {/* FORMATIONS */}
              <Grid item>
                <DataSelect
                  id='formations-data-select'
                  clearButton
                  label={t('ems.factory.label', 'Factory', 'Factory.')}
                  onChange={(selectedOption) => setSelectedFormation(selectedOption)}
                  onClear={clearFormation}
                  options={formations}
                  placeholder={t('ems.factory.label', 'Factory', 'Factory')}
                  present={(value) => value.name}
                  value={selectedFormation}
                />
              </Grid>
              {/* BUILDINGS */}
              {selectedFormation && (
                <Grid item>
                  <DataSelect
                    id='buildings-data-select'
                    label={t('location.building.label', 'Building', 'Building.')}
                    clearButton
                    onChange={(selectedOption) => setSelectedBuilding(selectedOption)}
                    onClear={clearBuilding}
                    options={buildingsOptions}
                    placeholder={t('ems.selectBuilding.label', 'Select building', 'Select building placeholder')}
                    present={(value) => value?.name}
                    value={selectedBuilding || ''}
                  />
                </Grid>
              )}
              {/* SPACES */}
              {selectedFormation && selectedBuilding && (
                <Grid item>
                  <DataSelect
                    id='spaces-data-select'
                    label={t('location.floor.label', 'Floor', 'Floor.')}
                    clearButton
                    onChange={(selectedOption) => setSelectedSpace(selectedOption)}
                    onClear={clearSpace}
                    options={spacesOptions}
                    placeholder={t('ems.selectFloor.label', 'Select floor', 'Select floor placeholder')}
                    present={(value) => value?.name}
                    value={selectedSpace}
                  />
                </Grid>
              )}
              {/* ZONES */}
              {selectedFormation && selectedBuilding && selectedSpace && (
                <Grid item>
                  <DataSelect
                    id='zones-data-select'
                    label={t('location.zone.label', 'Zone', 'Specific area that is defined for a particular purpose.')}
                    clearButton
                    onChange={(selectedOption) => setSelectedZone(selectedOption)}
                    onClear={clearZone}
                    options={zonesOptions}
                    placeholder={t('ems.selectZone.label', 'Select zone', 'Select zone placeholder')}
                    present={(value) => value?.name}
                    value={selectedZone}
                  />
                </Grid>
              )}
              {/* PRODUCTION LINES */}
              {selectedFormation && selectedBuilding && selectedSpace && selectedZone && (
                <Grid item>
                  <DataSelect
                    id='production-lines-data-select'
                    label={t('ems.productionLine.label', 'Production line', 'Production line placeholder')}
                    clearButton
                    onChange={(selectedOption) => setSelectedProductionLine(selectedOption)}
                    onClear={clearProductionLine}
                    options={productionLinesOptions}
                    placeholder={t(
                      'location.selectProductionLine.label',
                      'Select production line',
                      'Select production line.',
                    )}
                    present={(value) => value?.name}
                    value={selectedProductionLine}
                  />
                </Grid>
              )}
              {/* FILTER */}
              <Grid item>
                <Text component='h3' weight='bold' className='mt-3'>
                  {t(
                    'general.filters.label',
                    'Filters',
                    'Various options hat users can apply to refine the displayed content.',
                  )}
                </Text>
              </Grid>
              <Grid item>
                <MultiSelect
                  disabled={multiSelectOptions.length === 0}
                  equals={equals}
                  label={t('location.displayedItems.label', 'Displayed items', 'Displayed items.')}
                  onAppend={handleMultiSelectAppend}
                  onRemove={handleMultiSelectRemove}
                  showSelectAll
                  onSelectAllToggle={toggleSelectAll}
                  placeholder={t('location.displayedItems.label', 'Displayed items', 'Displayed items.')}
                  present={(item: MultiSelectOption) => item?.name}
                  source={multiSelectOptions}
                  value={multiSelectSelectedItems}
                />
              </Grid>
            </Grid>
          </DrawerMobile>
        </Dialog>
      )}
    </>
  );
});
