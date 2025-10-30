// utils
import { t } from '@core/utils/translate';

// types
import { Modules } from '@core/ui/types';

// components
import { Dashboard } from './Dashboard';
import { Users } from '@solutions/cerebro/Users';

// icons
import DashboardLineIcon from '@assets/icons/IvedaAI/sidebar/dashboard-line.svg?component';
import DashboardSolidIcon from '@assets/icons/IvedaAI/sidebar/dashboard-solid.svg?component';
import AlertsLineIcon from '@assets/icons/IvedaAI/sidebar/alerts-line.svg?component';
import AlertsSolidIcon from '@assets/icons/IvedaAI/sidebar/alerts-solid.svg?component';
import UsersLineIcon from '@assets/icons/LevelNOW/sidebar/users-line.svg?component';
import UsersSolidIcon from '@assets/icons/LevelNOW/sidebar/users-solid.svg?component';
import ConfigLineIcon from '@assets/icons/IvedaAI/sidebar/config-line.svg?component';
import ConfigSolidIcon from '@assets/icons/IvedaAI/sidebar/config-solid.svg?component';

export const modules: Modules = [
  {
    system: 'levelnow',
    url: '',
    title: 'solutions.dashboard.label',
    // title: t('solutions.dashboard.label', 'Dashboard', 'Dashboard page title.'),
    icon: <DashboardLineIcon />,
    iconSolid: <DashboardSolidIcon />,
    component: <Dashboard />,
  },
  {
    system: 'levelnow',
    url: 'dashboard1',
    title: 'solutions.dashboard.label',
    // title: t('solutions.dashboard.label', 'Dashboard', 'Dashboard page title.'),
    icon: <DashboardLineIcon />,
    iconSolid: <DashboardSolidIcon />,
    component: <Dashboard />,
  },
  {
    system: 'levelnow',
    url: 'alerts',
    title: 'modules.alerts.label',
    // title: t('modules.alerts.label', 'Alerts', 'Alerts page title.'),
    icon: <AlertsLineIcon />,
    iconSolid: <AlertsSolidIcon />,
    component: <Dashboard />,
  },
  {
    system: 'levelnow',

    url: 'users',
    title: 'modules.users.label',
    // title: t('modules.users.label', 'Users', 'Users page title.'),
    icon: <UsersLineIcon />,
    iconSolid: <UsersSolidIcon />,
    component: <Users />,
  },
  {
    system: 'levelnow',

    url: 'config',
    title: 'modules.config.label',
    // title: t('modules.config.label', 'Domain', 'Domain page title.'),
    icon: <ConfigLineIcon />,
    iconSolid: <ConfigSolidIcon />,
    component: <Dashboard />,
  },
];
