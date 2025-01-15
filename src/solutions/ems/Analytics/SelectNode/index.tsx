import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';
import React, { useEffect, useRef, useState } from 'react';

// type

import { Location } from '@core/api/types';

// storage

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// Components

import { Grid } from '@core/ui/components/Grid';
import { SelectPopover } from './SelectPopover';

// Icons

import { getLocationBlackList } from '../data/getLocationBlackList';

export interface SelectOption<ValueType> {
  label: string;
  value: ValueType;
  selected?: boolean;
  isExpanded?: boolean;
  userAccess: boolean;
}

export const SelectNode = () => {
  const ui = useUI();
  const locations = useLocations();
  const current = ui.emsCurrentLocation?.toString();

  let campus = locations.getElementById(ui.currentFormation);
  const firstLoad = useRef<boolean>(false);

  const [currentPageIndex, setCurrentPageIndex] = useState<number | undefined>();
  const [locationOptions, setLocationOptions] = useState<SelectOption<Location>[][]>([]);

  let LocationOptionsArr: SelectOption<Location>[][];
  const locationBlackArr = getLocationBlackList();

  const getEelementByLocationOptions = (id: number): SelectOption<Location>[][] => {
    if (!campus) campus = locations.getFormations()[0];

    LocationOptionsArr = [
      [
        {
          label: campus.name,
          value: campus,
          selected: true,
          isExpanded: id === campus.locationId ? false : true,
          userAccess: locationBlackArr.includes(campus.locationId) ? false : true,
        },
      ],
    ];

    if (id === campus.locationId) return LocationOptionsArr;
    getElementByIdRecursive(campus, id);

    return LocationOptionsArr;
  };

  const getElementByIdRecursive = (parent: Location, id: number): Location | undefined => {
    const children = parent.children;

    const childrenLocationOptions: SelectOption<Location>[] = [];
    let currentIndex = LocationOptionsArr.length;

    if (!children) return undefined;
    for (const child of children) {
      childrenLocationOptions.push({
        label: child.name,
        value: child,
        selected: false,
        isExpanded: false,
        userAccess: locationBlackArr.includes(child.locationId) ? false : true,
      });
    }
    LocationOptionsArr.push(childrenLocationOptions);

    for (const [index, child] of children.entries()) {
      if (index) {
        LocationOptionsArr[currentIndex][index - 1].selected = false;
        LocationOptionsArr[currentIndex][index - 1].isExpanded = false;
      }

      LocationOptionsArr[currentIndex][index].selected = true;
      LocationOptionsArr[currentIndex][index].isExpanded = true;

      if (child.locationId === id) {
        LocationOptionsArr[currentIndex][index].isExpanded = false;
        return child;
      }

      const result = getElementByIdRecursive(child, id);
      if (result) return result;
    }

    // 0 ~ currentIndex
    LocationOptionsArr = LocationOptionsArr.splice(0, currentIndex);

    if (LocationOptionsArr.length === 1) {
      LocationOptionsArr[0][0].isExpanded = false;
    }

    return undefined;
  };

  const getChildrenLocationsOptions = (locationId: number): SelectOption<Location>[] => {
    const currentLocation = locations.getElementById(locationId);
    let childrenLocationOptions: SelectOption<Location>[] = [];
    const childrenLocation = currentLocation?.children;

    childrenLocation?.map((option) => {
      childrenLocationOptions.push({
        label: option.name,
        value: option,
        userAccess: locationBlackArr.includes(option.locationId) ? false : true,
      });
    });

    return childrenLocationOptions;
  };

  const handleChildrenExpandedClick = (locationId: number = 0, itemId: string, isExpanded: boolean): void => {
    const startIndex: number = Number(itemId.split('-')[1]);

    let new_locationOptions: SelectOption<Location>[][] = locationOptions.splice(0, startIndex + 1);

    if (!isExpanded) {
      const childrenLocationOptions = getChildrenLocationsOptions(locationId);
      new_locationOptions.push(childrenLocationOptions);
    }

    setLocationOptions(new_locationOptions);
  };

  useEffect(() => {
    setCurrentPageIndex(ui.emsCurrentLocation);
  }, [ui.emsCurrentLocation]);

  // reset dynamic selector when page refresh or into to this page.
  useEffect(() => {
    if (firstLoad.current === false) {
      firstLoad.current = true;
      const Init_LocationOptionsArr = getEelementByLocationOptions(Number(current));

      setLocationOptions(Init_LocationOptionsArr);
    }
  }, []);

  // reset dynamic selecotr when formation navigation switch by monitor current formation.
  useEffect(() => {
    firstLoad.current = true;
    const Init_LocationOptionsArr = getEelementByLocationOptions(Number(current));

    setLocationOptions(Init_LocationOptionsArr);
  }, [current]);

  return (
    <Grid container alignItems='center' spacing={3}>
      {/* {Object.entries(locationOptions).map(([key, item]) => {
        if (!isCurrent) {
          item.map((i) => {
            if (i.locationId == currentLocationId) isCurrent = true;
          });
          return (
            <Grid item id={key}>
              <SelectPopover2 id={`selectPopover-${key}`} options={item}></SelectPopover2>
            </Grid>
          );
        }
      })} */}

      {locationOptions.map((item, i) => {
        return (
          <Grid item key={`location-${i}`}>
            <SelectPopover
              id={`selectPopover-${i}`}
              options={item}
              currentPageIndex={currentPageIndex}
              setCurrentPageIndex={setCurrentPageIndex}
              setLocationOptions={setLocationOptions}
              getEelementByLocationOptions={getEelementByLocationOptions}
              handleChildrenExpandedClick={handleChildrenExpandedClick}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
