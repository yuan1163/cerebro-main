import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react';

// storages
import { useUI } from '@core/storages/ui';

// utils
import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Box } from '@core/ui/components/Box';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/utilus/Header';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// icons
import ModuleIcon from '@assets/icons/line/notification-text.svg?component';

//data
import { useEventsFormation } from '../api/data/useEventsFormation';

export const Events = observer(() => {
  const ui = useUI();
  const events = useEventsFormation(ui.currentFormation);
  return (
    <>
      <Header icon={<ModuleIcon />} title={t('events.events.label', 'Events', 'Events title.')} />
      <UnitContainer>{JSON.stringify(events)}</UnitContainer>
    </>
  );
});
