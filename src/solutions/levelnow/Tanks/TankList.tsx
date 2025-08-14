import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import { Card } from '@core/ui/components/Card';
import { getDeviceLevelIcon, getBatteryLevelIcon, getDeviceConnection } from '@core/utils/levelnow/deviceStatus';

import FilterButton from '@core/ui/levelnow/FilterButton';
import AddButton from '@core/ui/levelnow/AddButton';
import NumberBadge from '@core/ui/levelnow/NumberBadge';
import { TankListItem } from '@core/api/types';
import { Scrollbar } from '@core/ui/components/Scrollbar';

import React, { useState } from 'react';

import { cn } from '@core/utils/classnames';

import Select from '@core/ui/levelnow/Select';
import CheckSelect from '@core/ui/levelnow/CheckSelect';
import { DeviceLevelLabel } from '@core/api/types';

type TankListProps = {
  tanks: TankListItem[];
  selectedTankId: number | null;
  onTankSelect: (tankId: number) => void;
  searchQuery: string;
};
type TankItemProps = {
  tank: TankListItem;
  selectedTankId: number | null;
  onTankSelect: (tankId: number) => void;
};

const levelOptions: DeviceLevelLabel[] = ['<100L', '100~205L', '>205L'];

export default function TankList({ tanks, selectedTankId, onTankSelect, searchQuery }: TankListProps) {
  const [openFilter, setOpenFilter] = useState(false);
  const [deviceFilter, setDeviceFilter] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<DeviceLevelLabel[]>([]);

  const deviceReferences = Array.from(
    new Set(
      tanks
        .map((tank) => tank.deviceReference)
        .filter((ref) => ref)
        .sort((a, b) => a.localeCompare(b)),
    ),
  );
  const deviceOptions = [
    { label: 'Device Reference: All', value: 'all' },
    ...deviceReferences.map((ref) => ({ label: ref, value: ref })),
  ];

  const handleDeviceSelect = (selectedDevice: string) => {
    setDeviceFilter(selectedDevice === 'all' ? null : selectedDevice);
  };

  const handleLevelSelect = (selectedLevels: DeviceLevelLabel[]) => {
    setLevelFilter(selectedLevels);
  };

  const handleFilter = (tanks: TankListItem[]) => {
    let filteredTanks = tanks;
    if (deviceFilter) {
      filteredTanks = filteredTanks.filter((tank) => tank.deviceReference === deviceFilter);
    }
    if (levelFilter.length !== 0) {
      filteredTanks = filteredTanks.filter((tank) => levelFilter.includes(tank.deviceLevelLabel));
    }
    if (searchQuery) {
      filteredTanks = filteredTanks.filter((tank) => tank.deviceReference.includes(searchQuery));
    }
    return filteredTanks;
  };

  const filteredTanks = handleFilter(tanks);

  return (
    <Card className='grid grid-rows-[auto_1fr] h-full'>
      <CardHeader borderBottom>
        <div className='flex flex-col w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span>All</span>
              <NumberBadge number={tanks.length} />
              <AddButton label='Tank' />
            </div>
            <FilterButton onClick={() => setOpenFilter(!openFilter)} />
          </div>
          {openFilter && (
            <div className='flex flex-col gap-3 mt-5'>
              <Select options={deviceOptions} activedFilter={deviceFilter} handleSelect={handleDeviceSelect} />
              <CheckSelect options={levelOptions} activedFilter={levelFilter} handleSelect={handleLevelSelect} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent
        scrollable
        className={cn(openFilter ? 'h-[calc(100vh-360px)]' : 'h-[calc(100vh-244px)]', 'px-5 pb-5')}
        disablePaddingTop
      >
        <Scrollbar>
          <div className='flex flex-col pr-2.5'>
            {filteredTanks.map((tank) => (
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
