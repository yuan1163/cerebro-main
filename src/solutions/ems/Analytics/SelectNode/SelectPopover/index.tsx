import React, { Dispatch, Fragment, MouseEventHandler, SetStateAction, useEffect, useState } from 'react';

// ui
import { useUI } from '@core/storages/ui';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// Components

import { Button } from '@core/ui/components/Button';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { List } from '@core/ui/components/List';
import { ListItemButton } from '@core/ui/components/ListItemButton';
import { ListItemText } from '@core/ui/components/ListItemText';
import { Text } from '@core/ui/components/Text';
import { Popover, Transition } from '@headlessui/react';
import { SelectOption } from '..';

// icons

import CheckRightLineIcon from '@assets/icons/line/chevron-right.svg?component';
import ChevronSelectorVerticalLineIcon from '@assets/icons/line/chevron-selector-vertical.svg?component';
import NavigationPointer01LineIcon from '@assets/icons/line/navigation-pointer-01.svg?component';
import { Location } from '@core/api/types';
import { useLocations } from '@core/storages/controllers/locations';
import { useParams } from 'react-router';
import { getLocationBlackList } from '../../data/getLocationBlackList';

type SelectProps<ValueType> = {
  className?: string;
  id: string;
  options?: SelectOption<Location>[];
  currentPageIndex: number | undefined;
  setCurrentPageIndex: Dispatch<SetStateAction<number | undefined>>;
  setLocationOptions: Dispatch<SetStateAction<SelectOption<Location>[][]>>;
  getEelementByLocationOptions: (id: number) => SelectOption<Location>[][];
  handleChildrenExpandedClick: (locationId: number, itemId: string, isExpanded: boolean) => void;
} & React.HTMLAttributes<HTMLElement>;

export const SelectPopover: React.FC<SelectProps<any>> = ({
  id,
  className,
  options = [],
  currentPageIndex,
  setCurrentPageIndex,
  setLocationOptions,
  getEelementByLocationOptions,
  handleChildrenExpandedClick,
}) => {
  const ui = useUI();
  const url = useParams();
  const locations = useLocations();

  const [buttonText, setButtonText] = useState<string | undefined>();

  useEffect(() => {
    let hasSelected = false;
    options.map((option) => {
      if (option.selected) {
        hasSelected = true;
        setButtonText(option.label);
      }
    });

    if (!hasSelected) setButtonText(options[0].label);
  }, [options]);

  useEffect(() => {
    for (const option of options) if (option.selected) setButtonText(option.label);
  }, []);

  const goToLocation = (location: Location): void => {
    const locationId = location.locationId;
    const Init_LocationOptionsArr = getEelementByLocationOptions(Number(locationId));
    setLocationOptions(Init_LocationOptionsArr);

    setCurrentPageIndex(locationId);
    setButtonText(location.name);
    // FIXME: Change to formation
    // ui.setCurrentFormation(locationId);
    ui.setEmsCurrentLocation(locationId);

    // FIXME: Change to formation
    if (locationId === ui.currentFormation)
      ui.goto(`${ui.activeSolution}/analytics/${ui.currentFormation}/${url['*']}`);
    else {
      if (url['*'] === 'demand') ui.goto(`${ui.activeSolution}/analytics/${ui.currentFormation}/consumption`);
      else ui.goto(`${ui.activeSolution}/analytics/${ui.currentFormation}/${url['*']}`);
    }
  };

  const handleSelectedClcick = (itemIndex: number, locationId: number, itemId: string): void => {
    const currentOption = options[itemIndex];

    if (currentOption.isExpanded) {
      options[itemIndex].isExpanded = false;

      handleChildrenExpandedClick(locationId, itemId, true);
    } else {
      for (const option of options) option.isExpanded = false;
      currentOption.isExpanded = true;
      setButtonText(currentOption.label);
      handleChildrenExpandedClick(locationId, itemId, false);
    }
  };

  return (
    <div className={cn(styles['container'], className)}>
      <Popover className={cn(styles['popover'], className)}>
        {({ open, close }) => (
          <>
            <Popover.Button className={cn(styles['button'])}>
              <Button
                component='div'
                endIcon={<ChevronSelectorVerticalLineIcon />}
                iconColor='icon-secondary'
                variant='outlined'
              >
                {buttonText}
              </Button>
            </Popover.Button>
            <Transition
              as={Fragment}
              leave='transition ease-out-standard duration-shorter'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Popover.Panel className={styles['popover-panel']}>
                <Grid container direction='column'>
                  <Grid item>
                    <List dense>
                      {options?.map((item, i) => (
                        <ListItemButton dense className={cn(styles['item'])} key={`listItemButton-${i}`}>
                          <Grid container spacing={3} alignItems='center' justifyContent='between'>
                            <Grid item>
                              <ListItemText>
                                <Text className={styles['item-label']}>{item.label}</Text>
                              </ListItemText>
                            </Grid>
                            <Grid item>
                              {item.userAccess && (
                                <Icon
                                  color={'primary'}
                                  variant={'tint'}
                                  className={cn(
                                    styles['icon-container'],
                                    currentPageIndex === item.value.locationId && styles['selected'],
                                  )}
                                  onClick={() => {
                                    goToLocation(item.value);
                                    close();
                                  }}
                                >
                                  <NavigationPointer01LineIcon />
                                </Icon>
                              )}

                              {item.value.children?.length && (
                                <Icon
                                  color={'secondary'}
                                  variant={'tint'}
                                  className={cn(
                                    styles['icon-container'],
                                    item.isExpanded &&
                                      // item.value.locationId == selectedIndex &&
                                      styles['selected'],
                                    styles['expanded'],
                                  )}
                                  onClick={() => {
                                    handleSelectedClcick(i, item.value.locationId, id);
                                    close();
                                  }}
                                >
                                  <CheckRightLineIcon />
                                </Icon>
                              )}
                            </Grid>
                          </Grid>
                        </ListItemButton>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
