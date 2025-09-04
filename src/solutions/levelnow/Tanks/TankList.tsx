import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import { Card } from '@core/ui/components/Card';
import { getDeviceLevelIcon, getBatteryLevelIcon, getDeviceConnection } from '@core/utils/levelnow/deviceStatus';

import FilterButton from '@core/ui/levelnow/FilterButton';
import AddButton from '@solutions/levelnow/Tanks/AddButton';
import NumberBadge from '@core/ui/levelnow/NumberBadge';
import { TankListItem } from '@core/api/types';
import { Scrollbar } from '@core/ui/components/Scrollbar';

import React, { useState } from 'react';

import { cn } from '@core/utils/classnames';

import Select from '@core/ui/levelnow/Select';
import CheckSelect from '@core/ui/levelnow/CheckSelect';
import { DeviceLevelLabel } from '@core/api/types';
import { Link } from '@core/ui/components/Link';

// utils
import { t } from '@core/utils/translate';

type TankListProps = {
  tanks: TankListItem[];
  selectedTankId: number | null;
  searchQuery: string;
};
type TankItemProps = {
  tank: TankListItem;
  selectedTankId: number | null;
};

const levelOptions: DeviceLevelLabel[] = ['<100L', '100~205L', '>205L'];

export default function TankList({ tanks, selectedTankId, searchQuery }: TankListProps) {
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
    { label: t('filter.deviceAll.label', 'Device Reference: All', 'Filter option to show all devices'), value: 'all' },
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
  const filterCounts = (() => {
    let counts = 0;
    if (deviceFilter) {
      counts++;
    }
    if (levelFilter.length > 0) {
      counts++;
    }
    return counts;
  })();

  const handleClearFilters = () => {
    setDeviceFilter(null);
    setLevelFilter([]);
    setOpenFilter(false);
  };

  return (
    <Card className='grid grid-rows-[auto_1fr] h-full'>
      <CardHeader borderBottom>
        <div className='flex flex-col w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span>{t('general.all.label', 'All', 'Entirety of something.')}</span>
              <NumberBadge variant='gray' number={tanks.length} />
              <AddButton label={t('tanks.addTank.label', 'Add Tank', 'Add Tank Title.')} />
            </div>
            <FilterButton
              onClick={() => setOpenFilter(!openFilter)}
              counts={filterCounts}
              onClear={handleClearFilters}
            />
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
        className={cn(openFilter ? 'h-[calc(100vh-360px)]' : 'h-[calc(100vh-244px)]', 'px-0 pb-5')}
        disablePaddingTop
      >
        <Scrollbar>
          <div className='flex flex-col'>
            {filteredTanks.map((tank) => (
              <TankItem key={tank.tankId} tank={tank} selectedTankId={selectedTankId} />
            ))}
          </div>
        </Scrollbar>
      </CardContent>
    </Card>
  );
}

function TankItem({ tank, selectedTankId }: TankItemProps) {
  const isSelected = selectedTankId === tank.tankId;
  const itemClass = isSelected ? 'bg-primary-50' : 'hover:bg-hover';
  return (
    <Link
      to={`/levelnow/tanks/tank/${tank.tankId}`}
      className={cn(
        itemClass,
        'grid items-center grid-cols-[2fr_auto_auto_auto] gap-5 border-b py-7 border-neutral-200 px-5',
      )}
    >
      {/* name */}
      <div className='flex flex-col gap-1'>
        <div className='font-medium text-16 tracking-32 text-neutral-900'>{tank.tankNo}</div>
        <div className='font-medium text-16 tracking-32 text-secondary-500'>{tank.deviceReference}</div>
      </div>
      {/* device level */}
      <div>{getDeviceLevelIcon(tank.deviceLevel, 'sm')}</div>
      {/* battery level */}
      <div>{getBatteryLevelIcon(tank.deviceBattery)}</div>
      {/* connection */}
      <div>{getDeviceConnection(tank.deviceConnection)}</div>
    </Link>
  );
}
