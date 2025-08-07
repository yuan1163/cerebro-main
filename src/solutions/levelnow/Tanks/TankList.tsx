import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import { Card } from '@core/ui/components/Card';
import { getDeviceLevelIcon, getBatteryLevelIcon, getDeviceConnection } from '@core/utils/levelnow/deviceStatus';

import FilterButton from '@core/ui/levelnow/FilterButton';
import AddButton from '@core/ui/levelnow/AddButton';
import NumberBadge from '@core/ui/levelnow/NumberBadge';
import { TankLisItem } from '@core/api/types';
import { Scrollbar } from '@core/ui/components/Scrollbar';

import { List } from '@core/ui/components/List';
import { ListItem } from '@core/ui/components/ListItem';
import { EventCard } from '@solutions/utilus/Dashboard/EventCard';

type TankListProps = {
  tanks: TankLisItem[];
};

export default function TankList({ tanks }: TankListProps) {
  const fakeTanks = [...tanks, ...tanks, ...tanks]; // For testing purposes, to simulate a longer list
  return (
    <Card className='grid grid-rows-[auto_1fr] h-full'>
      <CardHeader justifyContent='between' alignItems='center' borderBottom>
        <div className='flex items-center gap-3'>
          <span>All</span>
          <NumberBadge number={tanks.length} />
          <AddButton label='Tank' />
        </div>
        <FilterButton />
      </CardHeader>
      <CardContent scrollable className='px-5 pb-5 h-[calc(100vh-232px)]' disablePaddingTop>
        <Scrollbar>
          <div className='flex flex-col pr-2.5'>
            {tanks.map((tank) => (
              <TankItem key={tank.tankId} tank={tank} />
            ))}
          </div>
        </Scrollbar>
      </CardContent>
    </Card>
  );
}

function TankItem({ tank }: { tank: TankLisItem }) {
  return (
    <div className='grid items-center grid-cols-[2fr_auto_auto_auto] gap-5 border-b py-7 border-neutral-200'>
      {/* name */}
      <div className='flex flex-col gap-1'>
        <div className='font-medium text-16 tracking-32 text-neutral-900'>{tank.tankNo}</div>
        <div className='font-medium text-16 tracking-32 text-secondary-500'>{tank.deviceReference}</div>
      </div>
      {/* device level */}
      <div>{getDeviceLevelIcon(tank.deviceLevel)}</div>
      {/* battery level */}
      <div>{getBatteryLevelIcon(tank.deviceBattery)}</div>
      {/* connection */}
      <div>{getDeviceConnection(tank.deviceConnection)}</div>
    </div>
  );
}
