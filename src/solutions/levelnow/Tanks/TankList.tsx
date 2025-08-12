import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import { Card } from '@core/ui/components/Card';
import { getDeviceLevelIcon, getBatteryLevelIcon, getDeviceConnection } from '@core/utils/levelnow/deviceStatus';

import FilterButton from '@core/ui/levelnow/FilterButton';
import AddButton from '@core/ui/levelnow/AddButton';
import NumberBadge from '@core/ui/levelnow/NumberBadge';
import { TankListItem } from '@core/api/types';
import { Scrollbar } from '@core/ui/components/Scrollbar';

import { cn } from '@core/utils/classnames';

type TankListProps = {
  tanks: TankListItem[];
  selectedTankId: number | null;
  onTankSelect: (tankId: number) => void;
};
type TankItemProps = {
  tank: TankListItem;
  selectedTankId: number | null;
  onTankSelect: (tankId: number) => void;
};

export default function TankList({ tanks, selectedTankId, onTankSelect }: TankListProps) {
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
      <CardContent scrollable className='px-5 pb-5 h-[calc(100vh-244px)]' disablePaddingTop>
        <Scrollbar>
          <div className='flex flex-col pr-2.5'>
            {tanks.map((tank) => (
              <TankItem key={tank.tankId} tank={tank} selectedTankId={selectedTankId} onTankSelect={onTankSelect} />
            ))}
          </div>
        </Scrollbar>
      </CardContent>
    </Card>
  );
}

function TankItem({ tank, selectedTankId, onTankSelect }: TankItemProps) {
  const isSelected = selectedTankId === tank.tankId;
  const itemClass = isSelected ? 'bg-primary-50' : 'hover:bg-hover';
  return (
    <div
      onClick={() => {
        onTankSelect(tank.tankId);
      }}
      className={cn(
        itemClass,
        'grid items-center grid-cols-[2fr_auto_auto_auto] gap-5 border-b py-7 border-neutral-200',
      )}
    >
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
