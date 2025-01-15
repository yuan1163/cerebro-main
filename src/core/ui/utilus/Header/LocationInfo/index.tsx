import React from 'react';
import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';

// utils

import { t } from '@core/utils/translate';

// storages
import { observer } from 'mobx-react';
import { useUI } from '@core/storages/ui';
//import { useRedirector } from '@core/storages/redirector';

// data

import { useFormation } from '@solutions/utilus/api/data/useFormation';
import { useRegions } from '@solutions/utilus/api/data/useRegions';

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

export const LocationInfo: React.FC = observer(() => {
  const ui = useUI();
  const regions = useRegions();
  const formation = useFormation(ui.currentFormation);
  const formations = useFormation();

  //const redirector = useRedirector();
  const url = useRouterLocation();
  const navigate = useNavigate();

  interface CloseProps {
    close: () => void;
  }

  return (
    <Menu
      button={
        <Button
          component='div'
          endIcon={<ChevronSelectorVerticalLineIcon />}
          iconColor='icon-secondary'
          variant='outlined'
        >
          {formation
            ? formation.name
            : `${t('location.selectLocationFromList.label', 'Select location', 'Select location from the list.')}:`}
        </Button>
      }
      placement='bottom-end'
    >
      {({ close }: CloseProps) => (
        <>
          <MenuList>
            {regions &&
              regions.map((region) => (
                <React.Fragment key={region.id}>
                  {region.formations.map((item) => (
                    <MenuItem key={item.id}>
                      <MenuItemButton
                        active={formation?.name === item.name ? true : false}
                        endIcon={formation?.name === item.name ? <CheckLineIcon /> : null}
                        onClick={() => {
                          ui.setCurrentFormation(item.id);
                          navigate(`dashboard/${item.id}`);
                          close();
                        }}
                      >
                        <MenuItemText title={item.name || t('general.notAvailable.label', 'n/a', 'Not Available.')} />
                      </MenuItemButton>
                    </MenuItem>
                  ))}
                </React.Fragment>
              ))}
            <ListDivider />
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
          </MenuList>
        </>
      )}
    </Menu>
  );
});
