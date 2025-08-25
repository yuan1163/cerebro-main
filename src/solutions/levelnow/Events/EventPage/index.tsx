import { Link, useParams } from 'react-router-dom';
// components
import TankInfoDetails from '@solutions/levelnow/Tanks/TankInfoDetails';
import TankInfoCustomer from '@solutions/levelnow/Tanks/TankInfoCustomer';
import TankInfoGW from '@solutions/levelnow/Tanks/TankInfoGW';
import TankInfoLevel from '@solutions/levelnow/Tanks/TankInfoLevel';
// core ui components
import { Card } from '@core/ui/components/Card';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import { Header } from '@core/ui/cerebro/Header';
// icons
import EventsIcon from '@assets/icons/line/notification-text.svg?component';
import ChevronLeftIcon from '@assets/icons/LevelNOW/chevrons-left.svg?component';
// utils
import { t } from '@core/utils/translate';
import { Button } from '@core/ui/components/Button';
// hooks
import { useTank } from '@core/storages/controllers/levelnow/tank';
import { useClient } from '@core/storages/controllers/levelnow/client';
import { useEventsHistory } from '@core/storages/controllers/levelnow/event';
import { DataTable } from '@app/components/ui/data-table';

import { columns } from './eventsHistoryColumns';

export default function EventPage() {
  const { tankId } = useParams<{ tankId: string }>();
  if (!tankId) {
    return <div>{t('errors.tankNotFound', 'Tank not found', 'Error message when tank ID is not provided.')}</div>;
  }
  const tank = useTank(parseInt(tankId));
  const client = useClient(tank?.clientId || null);
  const eventsHistory = useEventsHistory(tank?.deviceReference || null);
  console.log('history', eventsHistory);

  return (
    <>
      <Header icon={<EventsIcon />} title={t('events.eventsTitle.label', 'Events', 'Issues title.')} widgets={false} />
      <Card className='flex flex-col rounded-[10px] shadow-card' fullHeight>
        <CardHeader justifyContent='between' borderBottom>
          <div className='flex items-center gap-3'>
            <Button variant='outlined' className='p-1.5'>
              <Link to={'/levelnow/events'}>
                <ChevronLeftIcon />
              </Link>
            </Button>
            <h1 className='text-lg font-medium tracking-36 text-neutral-900'>
              {t('solutions.events.label', 'Events', 'A list of events related to the solution.')}
            </h1>
          </div>
        </CardHeader>
        <CardContent className='flex grow'>
          {/* Tank Info */}
          <div className='flex-1 grid grid-flow-row grid-cols-2 grid-rows-[auto,auto,auto] gap-5'>
            {/* Info */}
            <TankInfoDetails tank={tank} />
            {/* Ievel & Location */}
            <TankInfoLevel tank={tank} />
            {/* Customer */}
            <TankInfoCustomer tank={tank} client={client} />
            {/* GW */}
            <TankInfoGW client={client} />
          </div>
          {/* Events History */}
          <div className='w-[400px] flex-shrink-0 ml-5'>
            <h1 className='mb-5 font-medium text-md tracking-32 text-neutral-900'>Events History</h1>
            <DataTable columns={columns} data={eventsHistory} fixHeight={258} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
