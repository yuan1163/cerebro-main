import React from 'react';
import { useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// data

import { useUI } from '@core/storages/ui';
import { useSmartPolesFormation } from '@solutions/utilus/api/data/useSmartPolesFormation';
import { useFormation } from '@solutions/utilus/api/data/useFormation';
import { useZone } from '@solutions/utilus/api/data/useZone';

// components

import { Box } from '@core/ui/components/Box';
import { Legend } from './Legend';
import { Map } from '@core/ui/utilus/Map';
import { Text } from '@core/ui/components/Text';

type Props = {
  zoneId?: number;
};

const SMART_POLES_ZOOM = 18;

export const MapView: React.FC<Props> = ({ zoneId }) => {
  const ui = useUI();

  const smartPoles = useSmartPolesFormation(ui.currentFormation, zoneId);
  const formation = useFormation(ui.currentFormation);
  const zone = useZone(zoneId);
  const navigate = useNavigate();

  const alerts = smartPoles?.filter(
    (pole) => pole.devices.filter((device) => device.alerts.length > 0).length > 0,
  ).length;
  const total = smartPoles?.length;

  if (!smartPoles) return null;
  return (
    <Box className={styles.container}>
      <Map
        className={styles.map}
        onSelect={(pole) => navigate(`../details/${pole.id}`)}
        points={smartPoles}
        zoom={SMART_POLES_ZOOM}
      />
      <Box className={styles.location}>
        {formation && <Text weight='semibold'>{formation.name}</Text>}
        {zoneId && zone && (
          <Text color='typography-secondary' variant='sm'>
            {zone.name}
          </Text>
        )}
      </Box>
      <Legend
        alerts={alerts}
        className={styles.legend}
        name={t('solutions.smartPoles.label', 'Smart Poles', 'Smart Poles')}
        total={total}
      />
    </Box>
  );
};
