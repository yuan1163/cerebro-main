import { observer } from 'mobx-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// storages

import { useUI } from '@core/storages/ui';

//types

import { Location } from '@core/api/types';
import { Solutions } from '@core/ui/types';
import { Properties } from '@solutions/ems/api/entities/locations';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// data

import { useLocations } from '@core/storages/controllers/locations';
import { useLocationProperties } from '@solutions/ems/api/storages/controllers/locationProperties';

// components

import { Map } from '@core/ui/cerebro/Map';
import { ButtonGroup } from '@core/ui/components/ButtonGroup';
import { Card } from '@core/ui/components/Card';
import { IconButton } from '@core/ui/components/IconButton';
import { Dialog } from '@headlessui/react';

// icons

import Maximize02LineIcon from '@assets/icons/line/maximize-02.svg?component';
import Minimize02LineIcon from '@assets/icons/line/minimize-02.svg?component';
import MinusLineIcon from '@assets/icons/line/minus.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import { getAccessLocationsId } from '@solutions/ems/Analytics/data/getLocationBlackList';

type Props = {
  className?: string;
  expended?: boolean;
  expendIconButton?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

// map

type ToggledMapProps = {
  className?: string;
};

export const DomainMap: React.FC<Props> = observer(({ className, expended, expendIconButton = false, onClick }) => {
  const locations = useLocations();
  const ui = useUI();
  const navigate = useNavigate();

  const points: Location[] = locations.getFormations();

  const pointClick = (location: Location) => {
    ui.setCurrentFormation(location.locationId);
    if (ui.activeSolution == Solutions.ems) {
      // TODO discuss with Kim
      // const locationAccessList = getAccessLocationsId(location);
      // const emsCurrentLocationId = locationAccessList.includes(location.locationId)
      //   ? location.locationId
      //   : locationAccessList[0];
      const emsCurrentLocationId = location.locationId;
      ui.setEmsCurrentLocation(emsCurrentLocationId);
    }
    navigate(`dashboard/${location.locationId}`);
  };

  const company = locations.getCompany();
  const locationAccessList = getAccessLocationsId(company);
  const properties = useLocationProperties(locationAccessList.length ? locationAccessList[0] : 0);
  const domainMapZoomInSize: Partial<Properties> | undefined = properties?.getDomainMapZoomInSize();

  // dialog

  let [isOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // map

  const ToggledMap = ({ className }: ToggledMapProps) => {
    return (
      <Map
        className={className}
        controls={true}
        onSelect={pointClick}
        points={points}
        zoom={domainMapZoomInSize?.value ? Number(domainMapZoomInSize.value) : 1}
      />
    );
  };

  // const MapButtonsGroup = () => {
  //   return (
  //     <ButtonGroup className={styles['button-group']} orientation='vertical'>
  //       <IconButton size='lg' variant='control'>
  //         <PlusLineIcon />
  //       </IconButton>
  //       <IconButton size='lg' variant='control'>
  //         <MinusLineIcon />
  //       </IconButton>
  //     </ButtonGroup>
  //   );
  // };

  return (
    <>
      <Card fullWidth elevation='xs'>
        <ToggledMap className={styles['map']} />
        {/* {expendIconButton && ( */}
        {/* <IconButton className={styles['icon']} onClick={openModal} size='lg' variant='control'>
          <Maximize02LineIcon />
        </IconButton> */}
        {/* <MapButtonsGroup /> */}
        {/* )} */}
      </Card>
      <Dialog as='div' className={styles['dialog']} open={isOpen} onClose={closeModal}>
        <div className={styles['dialog-container']}>
          <Dialog.Panel>
            {/* <ToggledMap className={styles['map-expanded']} /> */}
            <IconButton className={styles['icon']} onClick={closeModal} size='lg' variant='control'>
              <Minimize02LineIcon />
            </IconButton>
            {/* <MapButtonsGroup /> */}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
});
