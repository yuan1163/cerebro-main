// utils

import { t } from '@core/utils/translate';

// types

import { Modules } from '@core/ui/types';

// components

import { Dashboard } from './Dashboard';
import { Domain } from './Domain'; // TODO const Domain = React.lazy(() => import('./Domain'));
import { Issues } from '@solutions/cerebro/Issues';
import { Notifications } from './Notifications';
import { Users } from '@solutions/cerebro/Users';

// icons

import CheckDone01LineIcon from '@assets/icons/line/check-done-01.svg?component';
import CheckDone01SolidIcon from '@assets/icons/solid/check-done-01.svg?component';
import DashboardLineIcon from '@assets/icons/line/dashboard.svg?component';
import DashboardSolidIcon from '@assets/icons/solid/dashboard.svg?component';
import Home02LineIcon from '@assets/icons/line/home-02.svg?component';
import Home02SolidIcon from '@assets/icons/solid/home-02.svg?component';
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
    url: 'events',
    title: 'Events',
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
];
