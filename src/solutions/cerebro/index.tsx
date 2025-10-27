// utils

import { t } from '@core/utils/translate';

// types

import { Modules, ModuleSections } from '@core/ui/types';

// components

import { Assets } from '@solutions/cerebro/Assets';
import { Dashboard } from '@solutions/cerebro/Dashboard';
import { Domain } from '@solutions/cerebro/Domain';
import { Issues } from '@solutions/cerebro/Issues';
import { Locations } from '@solutions/cerebro/Locations';
import { Notifications } from '@solutions/cerebro/Notifications';
import { Users } from '@solutions/cerebro/Users';

// icons

import BarChartSquare01LineIcon from '@assets/icons/line/bar-chart-square-01.svg?component';
import BarChartSquare01SolidIcon from '@assets/icons/solid/bar-chart-square-01.svg?component';
import CheckDone01LineIcon from '@assets/icons/line/check-done-01.svg?component';
import CheckDone01SolidIcon from '@assets/icons/solid/check-done-01.svg?component';
import DashboardLineIcon from '@assets/icons/line/dashboard.svg?component';
import DashboardSolidIcon from '@assets/icons/solid/dashboard.svg?component';
import Home02LineIcon from '@assets/icons/line/home-02.svg?component';
import Home02SolidIcon from '@assets/icons/solid/home-02.svg?component';
import LineChartUp04LineIcon from '@assets/icons/line/line-chart-up-04.svg?component';
import LineChartUp04SolidIcon from '@assets/icons/solid/line-chart-up-04.svg?component';
import Map02LineIcon from '@assets/icons/line/map-02.svg?component';
import Map02SolidIcon from '@assets/icons/solid/map-02.svg?component';
import NotificationTextLineIcon from '@assets/icons/line/notification-text.svg?component';
import NotificationTextSolidIcon from '@assets/icons/solid/notification-text.svg?component';
import Users01LineIcon from '@assets/icons/line/users-01.svg?component';
import Users01SolidIcon from '@assets/icons/solid/users-01.svg?component';

export const modules: Modules = [
  {
    url: '',
    title: t('solutions.domain.label', 'Domain', 'Domain page title.'),
    icon: <Home02LineIcon />,
    iconSolid: <Home02SolidIcon />,
    component: <Domain />,
  },
  {
    url: 'domain',
    title: t('solutions.domain.label', 'Domain', 'Domain page title.'),
    icon: <Home02LineIcon />,
    iconSolid: <Home02SolidIcon />,
    component: <Domain />,
  },
  {
    url: 'dashboard',
    // title: t('solutions.dashboard.label', 'Dashboard', 'Dashboard page title.'),
    title: 'solutions.dashboard.label',
    icon: <DashboardLineIcon />,
    iconSolid: <DashboardSolidIcon />,
    component: <Dashboard />,
  },
  // {
  //   url: 'overview',
  //   title: 'Overview',
  //   icon: <BarChartSquare01LineIcon />,
  //   iconSolid: <BarChartSquare01SolidIcon />,
  //   component: null,
  // },
  {
    url: 'events',
    // title: t('events.events.label', 'Events', 'Events title.'),
    title: 'events.events.label',
    icon: <NotificationTextLineIcon />,
    iconSolid: <NotificationTextSolidIcon />,
    component: <Notifications />,
  },
  {
    url: 'issues',
    // title: t('issue.issuesTitle.label', 'Issues', 'Issues title.'),
    title: 'issue.issuesTitle.label',
    icon: <CheckDone01LineIcon />,
    iconSolid: <CheckDone01SolidIcon />,
    component: <Issues />,
  },
  {
    url: 'locations',
    // title: t('location.locations.label', 'Locations', 'Locations.'),
    title: 'location.locations.label',
    icon: <Map02LineIcon />,
    iconSolid: <Map02SolidIcon />,
    component: <Locations />,
  },
  {
    url: 'users',
    // title: t('user.usersTitle.label', 'Users', 'Users Title.'),
    title: 'user.usersTitle.label',
    icon: <Users01LineIcon />,
    iconSolid: <Users01SolidIcon />,
    component: <Users />,
  },
  {
    url: 'assets',
    // title: t('asset.assetsTitle.label', 'Assets', 'Collections of hardware tools and gadgets.'),
    title: 'asset.assetsTitle.label',
    icon: <LineChartUp04LineIcon />,
    iconSolid: <LineChartUp04SolidIcon />,
    component: <Assets />,
  },
];
