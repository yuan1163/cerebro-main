import React from 'react';
import { useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// types

import { Location } from '@core/api/types';
import { Solutions } from '@core/ui/types';

// utils

import { getLocationType } from '@core/utils/getLocationType';

// storages

import { useDevices } from '@core/storages/controllers/devices';
import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Accordion } from '@core/ui/components/Accordion';
import { AccordionGroup } from '@core/ui/components/AccordionGroup';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { Text } from '@core/ui/components/Text';

// icons

import ArrowRightLineIcon from '@assets/icons/line/arrow-right.svg?component';

type Props = {
  className?: string;
  items?: Location[];
  locationId?: number;
  locationType?: string;
} & React.HTMLAttributes<HTMLElement>;

export const DomainLocationAccordion: React.FC<Props> = ({ items, locationId, locationType }) => {
  const navigate = useNavigate();
  const firstItemType = items?.[0]?.type;
  const pluralName = firstItemType ? getLocationType(firstItemType).pluralName : '';

  const ui = useUI();
  const useCamerasTotal = ui.activeSolution === Solutions.ai;

  return (
    <AccordionGroup variant='solid'>
      <Accordion disableGutters color='surface-02' rounded size='sm' title={pluralName} variant='solid'>
        {items?.map((item, index) => {
          const devices = useDevices({ locationId: item.locationId });
          const count = useCamerasTotal ? devices.getCameras(item) : devices.getTotal(item);
          const label = useCamerasTotal
            ? t('asset.cameras.label', 'Cameras', 'Cameras')
            : t('asset.devices.label', 'Devices', 'Devices');
          return (
            <Grid key={index} alignItems='center' className={styles['accordion-item']} justifyContent='between'>
              <Grid gap={3}>
                <Icon color='secondary' variant='soft' size='lg'>
                  {getLocationType(item.type).icon}
                </Icon>
                <Grid direction='column'>
                  <Text variant='sm' weight='medium'>
                    {item.name}
                  </Text>
                  <Text color='typography-secondary' variant='sm'>
                    {`${count ?? t('general.notAvailable.label', 'n/a', 'Not Available.')}
                    ${label}`}
                  </Text>
                </Grid>
              </Grid>
              <IconButton
                aria-label=''
                variant='text'
                size='lg'
                disabled={locationType === 'areas'}
                onClick={() => {
                  ui.setEmsCurrentLocation(item.locationId);
                  navigate(`dashboard/${locationId}/scheme`);
                }}
              >
                <ArrowRightLineIcon />
              </IconButton>
            </Grid>
          );
        })}
      </Accordion>
    </AccordionGroup>
  );
};
