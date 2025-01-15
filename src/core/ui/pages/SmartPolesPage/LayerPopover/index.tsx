import React from 'react';

// utils

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { SpeedDial } from '@core/ui/components/SpeedDial';

// icons

import Bell01LineIcon from '@assets/icons/line/bell-01.svg?component';
import LayersThree01LineIcon from '@assets/icons/line/layers-three-01.svg?component';
import CpuChip01LineIcon from '@assets/icons/line/cpu-chip-01.svg?component';
import LineChartUp04LineIcon from '@assets/icons/line/line-chart-up-04.svg?component';
import SmartPoleIcon from '@assets/icons/line/smart-pole.svg?component';

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const LayerPopover: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <Box className={className}>
      <SpeedDial icon={<LayersThree01LineIcon />} listItems={listItems} />
    </Box>
  );
};

const listItems = [
  {
    id: 1,
    listItemicon: <Bell01LineIcon />,
    title: t('events.events.label', 'Events', 'Events title.'),
  },
  {
    id: 2,
    listItemicon: <SmartPoleIcon />,
    title: t('solutions.poles.label', 'Poles', 'Poles.'),
  },
  {
    id: 3,
    listItemicon: <CpuChip01LineIcon />,
    title: `${t('asset.devices.label', 'Devices', 'Devices')}.`,
  },
  {
    id: 4,
    listItemicon: <LineChartUp04LineIcon />,
    title: t('solutions.health.label', 'Health', 'Health.'),
  },
];
