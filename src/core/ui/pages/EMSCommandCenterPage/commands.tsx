import { Command } from '@core/ui/types';
import { EMSCommandCenterPage } from '.';

// utils

import { t } from '@core/utils/translate';

// icons

import Building07LineIcon from '@assets/icons/line/building-07.svg?component';
import SmartPoleLineIcon from '@assets/icons/line/smart-pole.svg?component';
import SmartPoleSolidIcon from '@assets/icons/solid/smart-pole.svg?component';

export const commands: Command[] = [
  {
    id: '1',
    icon: <Building07LineIcon />,
    iconSolid: <Building07LineIcon />,
    title: t(
      'solutions.ems.commands.monitoring.label',
      'Factory Monitoring',
      'EMS Command Center Factory Monitoring label',
    ),
    subtitle: t(
      'solutions.ems.commands.monitoring.caption',
      'Explore production lines & machines',
      'EMS Command Center Factory Monitoring caption',
    ),
    url: 'factory',
    element: <EMSCommandCenterPage />,
  },
];
