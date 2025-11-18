// icons
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
import UsersLineIcon from '@assets/icons/LevelNOW/sidebar/users-line.svg?component';
import UsersSolidIcon from '@assets/icons/LevelNOW/sidebar/users-solid.svg?component';

// types
import { Modules } from '@core/ui/types';
import { t } from '@core/utils/translate';
// components
import { Domain } from '@solutions/levelnow/Domain';
import { Tanks } from '@solutions/levelnow/Tanks';
import { Customers } from '@solutions/levelnow/Customers';
import { Events } from '@solutions/levelnow/Events';
import { Snapshot } from '@solutions/levelnow/Snapshot';
import { Users } from '@solutions/cerebro/Users';

export const modules: Modules = [
  {
    system: 'levelnow',
    url: 'domain',
    title: t('modules.domain.label', 'Domain', 'Domain page title.'),
    icon: <DomainLineIcon />,
    iconSolid: <DomainSolidIcon />,
    component: <Domain />,
  },
  {
    system: 'levelnow',
    url: 'tanks',
    title: t('modules.tanks.label', 'Tanks', 'Tanks page title.'),
    icon: <TankLineIcon />,
    iconSolid: <TankSolidIcon />,
    component: <Tanks />,
  },
  {
    system: 'levelnow',
    url: 'customers',
    title: t('modules.customers.label', 'Customers', 'Customers page title.'),
    icon: <CustomerLineIcon />,
    iconSolid: <CustomerSolidIcon />,
    component: <Customers />,
  },
  {
    system: 'levelnow',
    url: 'events',
    title: t('modules.events.label', 'Events', 'Events page title.'),
    icon: <EventsLineIcon />,
    iconSolid: <EventsSolidIcon />,
    component: <Events />,
  },
  {
    system: 'levelnow',
    url: 'snapshot',
    title: t('modules.snapshot.label', 'Snapshot', 'Snapshot page title.'),
    icon: <SnapshotLineIcon />,
    iconSolid: <SnapshotSolidIcon />,
    component: <Snapshot />,
  },
  {
    url: 'users',
    title: t('modules.users.label', 'Users', 'Users page title.'),
    icon: <UsersLineIcon />,
    iconSolid: <UsersSolidIcon />,
    component: <Users />,
  },
];
