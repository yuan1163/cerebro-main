// utils

// icons
import BarChartSquare01LineIcon from '@assets/icons/line/bar-chart-square-01.svg?component';
import CheckDone01LineIcon from '@assets/icons/line/check-done-01.svg?component';
import DashboardLineIcon from '@assets/icons/line/dashboard.svg?component';
import Home02LineIcon from '@assets/icons/line/home-02.svg?component';
import LineChartUp04LineIcon from '@assets/icons/line/line-chart-up-04.svg?component';
import Map02LineIcon from '@assets/icons/line/map-02.svg?component';
import NotificationTextLineIcon from '@assets/icons/line/notification-text.svg?component';
import Users01LineIcon from '@assets/icons/line/users-01.svg?component';
import BarChartSquare01SolidIcon from '@assets/icons/solid/bar-chart-square-01.svg?component';
import CheckDone01SolidIcon from '@assets/icons/solid/check-done-01.svg?component';
import DashboardSolidIcon from '@assets/icons/solid/dashboard.svg?component';
import Home02SolidIcon from '@assets/icons/solid/home-02.svg?component';
import LineChartUp04SolidIcon from '@assets/icons/solid/line-chart-up-04.svg?component';
import Map02SolidIcon from '@assets/icons/solid/map-02.svg?component';
import NotificationTextSolidIcon from '@assets/icons/solid/notification-text.svg?component';
import Users01SolidIcon from '@assets/icons/solid/users-01.svg?component';

import TankLineIcon from '@assets/icons/line/tank-line.svg?component';
import TankSolidIcon from '@assets/icons/solid/tank-solid.svg?component';
import CustomerLineIcon from '@assets/icons/LevelNOW/sidebar/customer-line.svg?component';
import CustomerSolidIcon from '@assets/icons/LevelNOW/sidebar/customer-solid.svg?component';
// types
import { Modules, ModuleSections } from '@core/ui/types';
import { t } from '@core/utils/translate';
// components
import { Assets } from '@solutions/cerebro/Assets';
import { Dashboard } from '@solutions/cerebro/Dashboard';
import { Issues } from '@solutions/cerebro/Issues';
import { Locations } from '@solutions/cerebro/Locations';
import { Notifications } from '@solutions/cerebro/Notifications';
import { Users } from '@solutions/cerebro/Users';

import { Domain } from '@solutions/levelnow/Domain';
import { Tanks } from '@solutions/levelnow/Tanks';
import { Customers } from '@solutions/levelnow/Customers';
import { Events } from '@solutions/levelnow/Events';

import ResponsibleTanksPage from '@core/ui/pages/ResponsibleTanksPage';

export const modules: Modules = [
  {
    system: 'levelnow',
    url: '',
    title: t('solutions.domain.label', 'Domain', 'Domain page title.'),
    icon: <Home02LineIcon />,
    iconSolid: <Home02SolidIcon />,
    component: <Domain />,
    children: [
      {
        url: 'domain/responsibletanks',
        component: <ResponsibleTanksPage />,
      },
    ],
  },
  {
    system: 'levelnow',
    url: 'tanks',
    title: 'tanks.tanks.label',
    icon: <TankLineIcon />,
    iconSolid: <TankSolidIcon />,
    component: <Tanks />,
  },
  {
    system: 'levelnow',
    url: 'customers',
    title: 'customers.customers.label',
    icon: <CustomerLineIcon />,
    iconSolid: <CustomerSolidIcon />,
    component: <Customers />,
  },
  {
    system: 'levelnow',
    url: 'events',
    title: 'events.events.label',
    icon: <NotificationTextLineIcon />,
    iconSolid: <NotificationTextSolidIcon />,
    component: <Events />,
  },
  //   // {
  //   //   url: 'overview',
  //   //   title: 'Overview',
  //   //   icon: <BarChartSquare01LineIcon />,
  //   //   iconSolid: <BarChartSquare01SolidIcon />,
  //   //   component: null,
  //   // },
  //   {
  //   {
  //     url: 'issues',
  //     // title: t('issue.issuesTitle.label', 'Issues', 'Issues title.'),
  //     title: 'issue.issuesTitle.label',
  //     icon: <CheckDone01LineIcon />,
  //     iconSolid: <CheckDone01SolidIcon />,
  //     component: <Issues />,
  //   },
  //   {
  //     url: 'locations',
  //     // title: t('location.locations.label', 'Locations', 'Locations.'),
  //     title: 'location.locations.label',
  //     icon: <Map02LineIcon />,
  //     iconSolid: <Map02SolidIcon />,
  //     component: <Locations />,
  //   },
  //   {
  //     url: 'users',
  //     // title: t('user.usersTitle.label', 'Users', 'Users Title.'),
  //     title: 'user.usersTitle.label',
  //     icon: <Users01LineIcon />,
  //     iconSolid: <Users01SolidIcon />,
  //     component: <Users />,
  //   },
  //   {
  //     url: 'assets',
  //     // title: t('asset.assetsTitle.label', 'Assets', 'Collections of hardware tools and gadgets.'),
  //     title: 'asset.assetsTitle.label',
  //     icon: <LineChartUp04LineIcon />,
  //     iconSolid: <LineChartUp04SolidIcon />,
  //     component: <Assets />,
  //   },
];
