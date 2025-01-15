import React from 'react';
import { useNavigate } from 'react-router';
import { useLocation as useURL } from 'react-router-dom';

// utils

import { t } from '@core/utils/translate';

// types

import { Location } from '@core/api/types';
import { Solutions, SolutionsMasks } from '@core/ui/types';

// storages

import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';
import { observer } from 'mobx-react';

// components

import { Button } from '@core/ui/components/Button';
import { ListDivider } from '@core/ui/components/ListDivider';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';

// icons

import ArrowRightLineIcon from '@assets/icons/line/arrow-right.svg?component';
import CheckLineIcon from '@assets/icons/line/check.svg?component';
import ChevronSelectorVerticalLineIcon from '@assets/icons/line/chevron-selector-vertical.svg?component';
import { getAccessLocationsId, getLocationBlackList } from '@solutions/ems/Analytics/data/getLocationBlackList';

interface CloseProps {
  close: () => void;
}

export const LocationInfo: React.FC = observer(() => {
  const ui = useUI();
  const url = useURL();
  const navigate = useNavigate();

  const locations = useLocations();
  const activeFormation = locations.getElementById(ui.currentFormation);

  const blackLocationsId = getLocationBlackList();
  return (
    <Menu
      button={
        <Button
          component='div'
          endIcon={<ChevronSelectorVerticalLineIcon />}
          iconColor='icon-secondary'
          variant='outlined'
        >
          {activeFormation
            ? activeFormation.name
            : `${t('location.selectLocationFromList.label', 'Select location', 'Select location from the list.')}:`}
        </Button>
      }
      placement='bottom-end'
    >
      {({ close }: CloseProps) => (
        <>
          <MenuList width={64}>
            {locations.getRegions().map((region) => (
              <React.Fragment key={`region.${region.locationId}`}>
                <>
                  {locations.getFormations(region).map((item) => (
                    <MenuItem key={`formation.${item.locationId}`}>
                      <MenuItemButton
                        active={activeFormation?.locationId === item.locationId ? true : false}
                        endIcon={activeFormation?.locationId === item.locationId ? <CheckLineIcon /> : null}
                        onClick={() => {
                          ui.setCurrentFormation(item.locationId);
                          if (ui.activeSolution == Solutions.ems) {
                            const accessLocationsId = getAccessLocationsId(item);
                            const blackLocation = !blackLocationsId.includes(item.locationId);

                            ui.setEmsCurrentLocation(blackLocation ? item.locationId : accessLocationsId[0]);
                          }

                          ui.gotoTheSamePage();
                          close();
                        }}
                      >
                        <MenuItemText title={item.name} />
                      </MenuItemButton>
                    </MenuItem>
                  ))}
                </>
              </React.Fragment>
            ))}
            <ListDivider />
            <MenuItem>
              <MenuItemButton component='div' variant='action'>
                <Button
                  endIcon={<ArrowRightLineIcon />}
                  onClick={() => {
                    navigate(`/${ui.activeSolution}`);
                    close();
                  }}
                  variant='text'
                >
                  {t('location.moreLocations.label', 'More locations', 'Show More Locations button.')}
                </Button>
              </MenuItemButton>
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
});

// onClick={() => {
//   if (url.pathname.substring(1) === ui.activeSolution && activeFormation) {
//     ui.gotoDashboard();
//   } else {
//     ui.gotoWorkspace();
//   }
// }}
