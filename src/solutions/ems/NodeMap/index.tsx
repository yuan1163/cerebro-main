import React from 'react';

// utils
import { t } from '@core/utils/translate';

// components
// import { AlertsList } from './AlertsList';
// import { AttentionRequired } from './AttentionRequired';
// import { Card } from '@core/ui/components/Card';
// import { CardContent } from '@core/ui/components/CardContent';
// import { CardHeader } from '@core/ui/components/CardHeader';
// import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
// import { LocationSchema } from '@core/ui/cerebro/LocationSchema';
// import { Select } from '@core/ui/components/Select';
// import { Stack } from '@core/ui/components/Stack';
// import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// icons
import MapIcon from '@assets/icons/map.svg?component';

export const NodeMap = () => {
  return (
    <>
      <Header icon={<MapIcon />} title={t('map.nodeMap.label', 'Node Map', 'Node map title')} />
      <UnitContainer />
    </>
  );
};
