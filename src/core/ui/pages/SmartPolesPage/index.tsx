import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router';

// data
import { Solutions } from '@core/ui/types';
import { useSmartPoles } from '@solutions/utilus/api/data/useSmartPoles';
import { useRegions } from '@solutions/utilus/api/data/useRegions';

// storage
import { useUI } from '@core/storages/ui';

// utils
import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { Button } from '@core/ui/components/Button';
import { ButtonGroup } from '@core/ui/components/ButtonGroup';
import { ButtonsWidget } from './ButtonsWidget';
import { Divider } from '@core/ui/components/Divider';
import { Drawer } from '@core/ui/components/Drawer';
import { DrawerMenu } from './DrawerMenu';
import { Grid } from '@core/ui/components/Grid';
import { GridDrawer } from './GridDrawer';
import { HybridDrawer } from './HybridDrawer';
import { LayerPopover } from './LayerPopover';
import { Map } from '@core/ui/utilus/Map';
import { MapNav } from './MapNav';
import { UtilusMap } from '@core/ui/utilus/UtilusMap';

const SMART_POLE_ZOOM = 13;

export const SmartPolesPage: React.FC = observer(() => {
  const smartPoles = useSmartPoles();
  const ui = useUI();
  const navigate = useNavigate();

  const regions = useRegions();
  const region = regions?.[0]; // current region ???

  // drawer

  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // tabs

  const [index, setIndex] = React.useState(0);

  // zoom
  const [zoom, setZoom] = React.useState(SMART_POLE_ZOOM);

  return (
    <main className={styles['main']} role='main'>
      <Box className={cn(styles['header-widget'])}>
        <Grid alignItems='center' justifyContent='between' className={cn(index === 2 && styles['drawer-menu-grid'])}>
          <DrawerMenu
            onClick={openModal}
            className={cn(index === 0 ? styles['drawer-menu-hybrid'] : styles['drawer-menu'])}
          >
            {region?.name}
          </DrawerMenu>
          <Drawer open={isOpen}>
            <MapNav close={closeModal} solution={Solutions.utilus} />
          </Drawer>
          <ButtonGroup>
            <Button
              onClick={() => {
                setIndex(1);
                setIsOpen(false);
              }}
              variant={index === 0 ? 'solid' : 'ghost'}
            >
              {t('location.map.label', 'Map', 'Map.')}
            </Button>
            <Divider flexItem orientation='vertical' className={styles['tab-divider']} />
            <Button
              onClick={() => {
                setIndex(0);
                setIsOpen(false);
              }}
              variant={index === 0 ? 'solid' : 'ghost'}
            >
              {t(
                'general.hybrid.label',
                'Hybrid',
                'A hybrid layout blends design elements to optimize content display.',
              )}
            </Button>
            <Divider flexItem orientation='vertical' className={styles['tab-divider']} />
            <Button
              onClick={() => {
                setIndex(2);
                setIsOpen(false);
              }}
              variant={index === 0 ? 'solid' : 'ghost'}
            >
              {t('general.grid.label', 'Grid', 'Organizes content into columns and rows.')}
            </Button>
          </ButtonGroup>
        </Grid>
      </Box>

      {index === 1 && <LayerPopover className={cn(styles['layer-popover'])} />}

      {index === 0 && <HybridDrawer />}

      {index === 2 && <GridDrawer />}

      {index !== 2 && (
        <>
          {/* <ButtonsWidget onPlus={() => setZoom(zoom + 1)} onMinus={() => setZoom(zoom - 1)} /> */}
          <Box className={styles['map-container']}>
            {smartPoles && (
              <UtilusMap
                controls={true}
                points={smartPoles}
                zoom={zoom}
                className='h-full'
                onSelect={(pole) => {
                  const currentFormation = pole.zone.formation.id;
                  ui.setCurrentFormation(currentFormation);
                  navigate(`/${ui.activeSolution}/poles/${currentFormation}/list/${pole.id}`);
                }}
              />
            )}
          </Box>
        </>
      )}
    </main>
  );
});
