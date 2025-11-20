import { Link } from 'react-router-dom';
// core ui components
import { Card } from '@core/ui/components/Card';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import { Header } from '@core/ui/cerebro/Header';
import NumberBadge from '@core/ui/levelnow/NumberBadge';
import { DataTable } from '@app/components/ui/data-table';
// icons
import SnapshotLineIcon from '@assets/icons/LevelNOW/sidebar/snapshot-line.svg?component';
import ChevronLeftIcon from '@assets/icons/LevelNOW/chevrons-left.svg?component';
// utils
import { t } from '@core/utils/translate';
import { Button } from '@core/ui/components/Button';
// hooks
import { useEventsSnapshot } from '@core/storages/controllers/levelnow/event';
// types
import { EventType } from '@core/api/types';
// definitions
import { columns } from '@solutions/levelnow/Snapshot/snapshotEventsColumns';

export default function SensorErrorPage() {
  const params = {
    eventType: EventType.SensorError,
  };
  const events = useEventsSnapshot(params);

  return (
    <>
      <Header
        icon={<SnapshotLineIcon />}
        title={t('snapshot.snapshot.label', 'Snapshot', 'Snapshot title.')}
        widgets={false}
      />
      <Card className='flex flex-col rounded-[10px] shadow-card' fullHeight>
        <CardHeader justifyContent='between'>
          <div className='flex items-center gap-3'>
            <Button variant='outlined' className='p-1.5'>
              <Link to={'/levelnow/snapshot'}>
                <ChevronLeftIcon />
              </Link>
            </Button>
            <h1 className='text-lg font-medium tracking-36 text-neutral-900 dark:text-typography-primary'>
              {t('snapshot.sensorerror.label', 'Sensor Error', 'Sensor Error card title.')}
            </h1>
            <NumberBadge variant='gray' number={events.length} />
          </div>
        </CardHeader>
        <CardContent className='flex p-0 grow'>
          <div className='w-full'>
            <DataTable columns={columns} data={events} fixHeight={174} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
