// utils
import { useIvedaAIGroups } from '@core/storages/controllers/ivedaAI/groups';

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
import { t } from '@core/utils/translate';

// Hook to generate dynamic modules based on AI groups
export const useAIModules = (): Modules => {
  const ivedaAIGroups = useIvedaAIGroups();

  // Generate dashboard modules based on groups
  const groupModules = ivedaAIGroups.map((group, index) => ({
    system: 'iveda' as const,
    url: `dashboard${index + 1}`,
    title: t(`solutions.dashboard.label`, `Dashboard`, `Module label for dashboard`) + ` ${index + 1}`,
    icon: <DashboardLineIcon />,
    iconSolid: <DashboardSolidIcon />,
    component: <Dashboard group={group} />,
  }));

  // Default modules (alerts, users, config)
  const staticModules = [
    {
      system: 'iveda' as const,
      url: 'alerts',
      title: t('modules.alerts.label', 'Alerts', 'Module label for alerts'),
      icon: <AlertsLineIcon />,
      iconSolid: <AlertsSolidIcon />,
      component: null,
    },
    {
      system: 'iveda' as const,
      url: 'users',
      title: t('modules.users.label', 'Users', 'Module label for users'),
      icon: <UsersLineIcon />,
      iconSolid: <UsersSolidIcon />,
      component: <Users />,
    },
    {
      system: 'iveda' as const,
      url: 'config',
      title: t('modules.config.label', 'Config', 'Module label for config'),
      icon: <ConfigLineIcon />,
      iconSolid: <ConfigSolidIcon />,
      component: null,
    },
  ];

  return [...groupModules, ...staticModules];
};

// Fallback static modules for when hook cannot be used
export const modules: Modules = [
  {
    system: 'iveda',
    url: 'alerts',
    title: t('modules.alerts.label', 'Alerts', 'Module label for alerts'),
    icon: <AlertsLineIcon />,
    iconSolid: <AlertsSolidIcon />,
    component: null,
  },
  {
    system: 'iveda',
    url: 'users',

    title: t('modules.users.label', 'Users', 'Module label for users'),
    icon: <UsersLineIcon />,
    iconSolid: <UsersSolidIcon />,
    component: <Users />,
  },
  {
    system: 'iveda',
    url: 'config',
    title: t('modules.config.label', 'Config', 'Module label for config'),
    icon: <ConfigLineIcon />,
    iconSolid: <ConfigSolidIcon />,
    component: null,
  },
];
