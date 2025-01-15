// utils

import { t } from '@core/utils/translate';

// types

import { Modules } from '@core/ui/types';

// components

//import { Users } from './Users';
import { Dashboard } from './Dashboard';
import { Domain } from './Domain'; // TODO const Domain = React.lazy(() => import('./Domain'));
import { Events } from './Events';
import { Overview } from './Overview';
import { SmartPoles } from './SmartPoles';
import { Users } from '@solutions/cerebro/Users';

// icons

import BarChartSquare01LineIcon from '@assets/icons/line/bar-chart-square-01.svg?component';
import BarChartSquare01SolidIcon from '@assets/icons/solid/bar-chart-square-01.svg?component';
import DashboardLineIcon from '@assets/icons/line/dashboard.svg?component';
import DashboardSolidIcon from '@assets/icons/solid/dashboard.svg?component';
import Home02LineIcon from '@assets/icons/line/home-02.svg?component';
import Home02SolidIcon from '@assets/icons/solid/home-02.svg?component';
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
    url: 'dashboard',
    title: t('solutions.dashboard.label', 'Dashboard', 'Dashboard page title.'),
    icon: <DashboardLineIcon />,
    iconSolid: <DashboardSolidIcon />,
    component: <Dashboard />,
  },
  {
    url: 'overview',
    title: t('solutions.overview.label', 'Overview', 'Overview title.'),
    icon: <BarChartSquare01LineIcon />,
    iconSolid: <BarChartSquare01SolidIcon />,
    component: <Overview />,
  },
  // {
  //   url: 'events',
  //   title: 'Events',
  //   icon: <NotificationTextLineIcon />,
  //   iconSolid: <NotificationTextSolidIcon />,
  //   component: <Events />,
  // },
  {
    url: 'poles',
    title: t('location.locations.label', 'Locations', 'Locations.'),
    icon: <Map02LineIcon />,
    iconSolid: <Map02SolidIcon />,
    component: <SmartPoles />,
  },
  {
    url: 'users',
    title: t('user.usersTitle.label', 'Users', 'Users Title.'),
    icon: <Users01LineIcon />,
    iconSolid: <Users01SolidIcon />,
    component: <Users />,
  },
];
