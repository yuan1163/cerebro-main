// utils

import { t } from '@core/utils/translate';

// types

import { Modules, ModuleSections } from '@core/ui/types';

// components

import { Domain } from '@solutions/ems/Domain';
import { Notifications } from '@solutions/cerebro/Notifications';
import { Users } from '@solutions/cerebro/Users';
import { Analytics } from '@solutions/ems/Analytics';
import { Dashboard } from '@solutions/ems/Dashboard';
import { ISOReport } from '@solutions/ems/ISOReport';
// import { Issues } from '@solutions/ems/Issues';
import { Issues } from '@solutions/cerebro/Issues';
import { MassConfiguration } from '@solutions/ems/MassConfiguration';
import { NodeMap } from '@solutions/ems/NodeMap';
import { Reporting } from '@solutions/ems/Reporting';
import { Assets } from '@solutions/cerebro/Assets';

// icons

import BarChartSquare01LineIcon from '@assets/icons/line/bar-chart-square-01.svg?component';
import DashboardLineIcon from '@assets/icons/line/dashboard.svg?component';
import BarChartSquare01SolidIcon from '@assets/icons/solid/bar-chart-square-01.svg?component';
import DashboardSolidIcon from '@assets/icons/solid/dashboard.svg?component';
import CheckDone01LineIcon from '@assets/icons/line/check-done-01.svg?component';
import CheckDone01SolidIcon from '@assets/icons/solid/check-done-01.svg?component';
import File05LineIcon from '@assets/icons/line/file-05.svg?component';
import Home02LineIcon from '@assets/icons/line/home-02.svg?component';
import NotificationTextLineIcon from '@assets/icons/line/notification-text.svg?component';
import SettingsLineIcon from '@assets/icons/line/settings-01.svg?component';
import Users01LineIcon from '@assets/icons/line/users-01.svg?component';
import File05SolidIcon from '@assets/icons/solid/file-05.svg?component';
import Home02SolidIcon from '@assets/icons/solid/home-02.svg?component';
import NotificationTextSolidIcon from '@assets/icons/solid/notification-text.svg?component';
import SettingsSolidIcon from '@assets/icons/solid/settings-01.svg?component';
import Users01SolidIcon from '@assets/icons/solid/users-01.svg?component';
import Analysis from './Analysis';
import LineChartUp04LineIcon from '@assets/icons/line/line-chart-up-04.svg?component';
import LineChartUp04SolidIcon from '@assets/icons/solid/line-chart-up-04.svg?component';

export const modules: Modules = [
  {
    url: '',
    title: t('solutions.domain.label', 'Domain', 'Domain page title.'),
    icon: <Home02LineIcon />,
    iconSolid: <Home02SolidIcon />,
    component: <Domain />,
  },
  {
    url: 'dashboard',
    title: t('solutions.dashboard.label', 'Dashboard', 'Dashboard page title.'),
    icon: <DashboardLineIcon />,
    iconSolid: <DashboardSolidIcon />,
    component: <Dashboard />,
  },
  {
    url: 'events',
    title: t('events.events.label', 'Events', 'Events title.'),
    icon: <NotificationTextLineIcon />,
    iconSolid: <NotificationTextSolidIcon />,
    component: <Notifications />,
  },
  {
    url: 'issues',
    title: t('issue.issuesTitle.label', 'Issues', 'Issues title.'),
    icon: <CheckDone01LineIcon />,
    iconSolid: <CheckDone01SolidIcon />,
    component: <Issues />,
  },
  {
    url: 'users',
    title: t('user.usersTitle.label', 'Users', 'Users Title.'),
    icon: <Users01LineIcon />,
    iconSolid: <Users01SolidIcon />,
    component: <Users />,
  },
  {
    url: 'assets',
    title: t('asset.assetsTitle.label', 'Assets', 'Collections of hardware tools and gadgets.'),
    icon: <LineChartUp04LineIcon />,
    iconSolid: <LineChartUp04SolidIcon />,
    component: <Assets />,
  },

  // UNIQUE

  {
    isGroup: true,
    title: t('solutions.analytics.label', 'Analytics', 'Analytics page title.'),
    icon: <BarChartSquare01LineIcon />,
    iconSolid: <BarChartSquare01SolidIcon />,
    items: [
      {
        title: t('solutions.energyOverview.label', 'Energy Overview', 'Energy Overview page title.'),
        url: 'analytics',
        component: <Analytics />,
      },
      {
        title: t('solutions.energyAnalysis.label', 'Energy Analysis', 'Energy Analysis title.'),
        url: 'energy_analysis',
        component: <Analysis />,
      },
    ],
    section: ModuleSections.Unique,
  },
  {
    url: 'reporting',
    title: t('solutions.reporting.label', 'Reports', 'Reports section title.'),
    icon: <File05LineIcon />,
    iconSolid: <File05SolidIcon />,
    component: <Reporting />,
    section: ModuleSections.Unique,
  },
  {
    url: 'mass_config',
    title: t('solutions.massConfiguration.label', 'Mass Configuration', 'Mass Configuration title.'),
    icon: <SettingsLineIcon />,
    iconSolid: <SettingsSolidIcon />,
    component: <MassConfiguration />,
    section: ModuleSections.Unique,
  },
  // {
  //   url: 'iso_report',
  //   title: 'ISO Report',
  //   icon: <ClipboardLineIcon />,
  //   iconSolid: <ClipboardSolidIcon />,
  //   component: null, // <ISOReport />,
  //   section: ModuleSections.Unique,
  // },
];
