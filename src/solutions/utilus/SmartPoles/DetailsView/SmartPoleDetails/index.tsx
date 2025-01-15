import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { DeviceTab } from './DeviceTab';
import { Grid } from '@core/ui/components/Grid';
import { SmartPoleCardHeader } from '../../SmartPoleCardHeader';
import { SmartPoleQuery } from '@solutions/utilus/api/generated';
import { SummaryTab } from './SummaryTab';
import { Tabs } from './Tabs';

type Props = {
  pole: SmartPoleQuery['smartPole'];
};

export const SmartPoleDetails: React.FC<Props> = ({ pole }) => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const devices =
    pole?.devices.map((device) => ({
      title: device.name,
      component: <DeviceTab device={device} />,
    })) ?? [];

  const tabs = [
    { title: t('general.summary.label', 'Summary', 'Brief overview.'), component: <SummaryTab pole={pole} /> },
    ...devices,
  ];

  return (
    <Card fullHeight fullWidth scrollable className={styles['card']}>
      <Grid direction='column'>
        <SmartPoleCardHeader className={styles['card-header']} pole={pole} />
        {/* TODO */}
        {/* <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} tabs={tabs} /> */}
      </Grid>
      <CardContent className={styles['card-content']} scrollable>
        {tabs[currentTab].component}
      </CardContent>
    </Card>
  );
};
