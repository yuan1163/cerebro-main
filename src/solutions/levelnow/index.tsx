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

import DomainLineIcon from '@assets/icons/LevelNOW/sidebar/domain-line.svg?component';
import DomainSolidIcon from '@assets/icons/LevelNOW/sidebar/domain-solid.svg?component';
import TankLineIcon from '@assets/icons/LevelNOW/sidebar/tank-line.svg?component';
import TankSolidIcon from '@assets/icons/LevelNOW/sidebar/tank-solid.svg?component';
import CustomerLineIcon from '@assets/icons/LevelNOW/sidebar/customer-line.svg?component';
import CustomerSolidIcon from '@assets/icons/LevelNOW/sidebar/customer-solid.svg?component';
import EventsLineIcon from '@assets/icons/LevelNOW/sidebar/events-line.svg?component';
import EventsSolidIcon from '@assets/icons/LevelNOW/sidebar/events-solid.svg?component';
import SnapshotLineIcon from '@assets/icons/LevelNOW/sidebar/snapshot-line.svg?component';
import SnapshotSolidIcon from '@assets/icons/LevelNOW/sidebar/snapshot-solid.svg?component';

// types
import { Modules, ModuleSections } from '@core/ui/types';
import { t } from '@core/utils/translate';
// components
import { Domain } from '@solutions/levelnow/Domain';
import { Tanks } from '@solutions/levelnow/Tanks';
import { Customers } from '@solutions/levelnow/Customers';
import { Events } from '@solutions/levelnow/Events';
import { Snapshot } from '@solutions/levelnow/Snapshot';
import { Users } from '@solutions/cerebro/Users';

import ResponsibleTanksPage from '@core/ui/pages/ResponsibleTanksPage';

export const modules: Modules = [
  {
    system: 'levelnow',
    url: '',
    title: t('solutions.domain.label', 'Domain', 'Domain page title.'),
    icon: <DomainLineIcon />,
    iconSolid: <DomainSolidIcon />,
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
    title: 'modules.tanks.label',
    icon: <TankLineIcon />,
    iconSolid: <TankSolidIcon />,
    component: <Tanks />,
  },
  {
    system: 'levelnow',
    url: 'customers',
    title: 'modules.customers.label',
    icon: <CustomerLineIcon />,
    iconSolid: <CustomerSolidIcon />,
    component: <Customers />,
  },
  {
    system: 'levelnow',
    url: 'events',
    title: 'events.events.label',
    icon: <EventsLineIcon />,
    iconSolid: <EventsSolidIcon />,
    component: <Events />,
  },
  {
    system: 'levelnow',
    url: 'snapshot',
    title: 'snapshot.snapshot.label',
    icon: <SnapshotLineIcon />,
    iconSolid: <SnapshotSolidIcon />,
    component: <Snapshot />,
  },
  {
    url: 'users',
    title: 'user.usersTitle.label',
    icon: <Users01LineIcon />,
    iconSolid: <Users01SolidIcon />,
    component: <Users />,
  },
];
