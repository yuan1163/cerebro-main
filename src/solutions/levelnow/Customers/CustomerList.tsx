import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import { Card } from '@core/ui/components/Card';
import { getDeviceLevelIcon, getBatteryLevelIcon, getDeviceConnection } from '@core/utils/levelnow/deviceStatus';

import FilterButton from '@core/ui/levelnow/FilterButton';
import AddButton from '@core/ui/levelnow/AddButton';
import NumberBadge from '@core/ui/levelnow/NumberBadge';
import { ClientData } from '@core/api/types';
import { Scrollbar } from '@core/ui/components/Scrollbar';

import React, { useState } from 'react';

import { cn } from '@core/utils/classnames';

import Select from '@core/ui/levelnow/Select';
import CheckSelect from '@core/ui/levelnow/CheckSelect';
import { DeviceLevelLabel } from '@core/api/types';

type CustomerListProps = {
  customers: ClientData[];
  selectedClientId: number | null;
  onCustomerSelect: (clientId: number) => void;
  searchQuery: string;
};
type CustomerItemProps = {
  customer: ClientData;
  selectedClientId: number | null;
  onCustomerSelect: (clientId: number) => void;
};

const levelOptions: DeviceLevelLabel[] = ['<100L', '100~205L', '>205L'];

export default function CustomerList({
  customers,
  selectedClientId,
  onCustomerSelect,
  searchQuery,
}: CustomerListProps) {
  //   const [openFilter, setOpenFilter] = useState(false);
  //   const [deviceFilter, setDeviceFilter] = useState<string | null>(null);
  //   const [levelFilter, setLevelFilter] = useState<DeviceLevelLabel[]>([]);

  //   const deviceReferences = Array.from(
  //     new Set(
  //       tanks
  //         .map((tank) => tank.deviceReference)
  //         .filter((ref) => ref)
  //         .sort((a, b) => a.localeCompare(b)),
  //     ),
  //   );
  //   const deviceOptions = [
  //     { label: 'Device Reference: All', value: 'all' },
  //     ...deviceReferences.map((ref) => ({ label: ref, value: ref })),
  //   ];

  //   const handleDeviceSelect = (selectedDevice: string) => {
  //     setDeviceFilter(selectedDevice === 'all' ? null : selectedDevice);
  //   };

  //   const handleLevelSelect = (selectedLevels: DeviceLevelLabel[]) => {
  //     setLevelFilter(selectedLevels);
  //   };

  //   const handleFilter = (tanks: TankListItem[]) => {
  //     let filteredTanks = tanks;
  //     if (deviceFilter) {
  //       filteredTanks = filteredTanks.filter((tank) => tank.deviceReference === deviceFilter);
  //     }
  //     if (levelFilter.length !== 0) {
  //       filteredTanks = filteredTanks.filter((tank) => levelFilter.includes(tank.deviceLevelLabel));
  //     }
  //     if (searchQuery) {
  //       filteredTanks = filteredTanks.filter((tank) => tank.deviceReference.includes(searchQuery));
  //     }
  //     return filteredTanks;
  //   };

  //   const filteredTanks = handleFilter(tanks);

  //   const filterCounts = (() => {
  //     let counts = 0;
  //     if (deviceFilter) {
  //       counts++;
  //     }
  //     if (levelFilter.length > 0) {
  //       counts++;
  //     }
  //     return counts;
  //   })();

  //   const handleClearFilters = () => {
  //     setDeviceFilter(null);
  //     setLevelFilter([]);
  //     setOpenFilter(false);
  //   };

  return (
    <Card className='grid grid-rows-[auto_1fr] h-full'>
      <CardHeader borderBottom>
        <div className='flex flex-col w-full'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span>All</span>
              <NumberBadge variant='gray' number={customers.length} />
              <AddButton label='Customer' />
            </div>
            {/* <FilterButton
              onClick={() => setOpenFilter(!openFilter)}
              counts={filterCounts}
              onClear={handleClearFilters}
            /> */}
          </div>
          {/* {openFilter && (
            <div className='flex flex-col gap-3 mt-5'>
              <Select options={deviceOptions} activedFilter={deviceFilter} handleSelect={handleDeviceSelect} />
              <CheckSelect options={levelOptions} activedFilter={levelFilter} handleSelect={handleLevelSelect} />
            </div>
          )} */}
        </div>
      </CardHeader>
      <CardContent
        scrollable
        className={cn('h-[calc(100vh-244px)]', 'p-0')}
        // className={cn(openFilter ? 'h-[calc(100vh-360px)]' : 'h-[calc(100vh-244px)]', 'px-5 pb-5')}
        disablePaddingTop
      >
        <Scrollbar>
          <div className='flex flex-col'>
            {customers.map((customer) => (
              <CustomerItem
                key={customer.clientId}
                selectedClientId={selectedClientId}
                onCustomerSelect={onCustomerSelect}
                customer={customer}
              />
              //   <TankItem key={customer.clientId} customer={customer} selectedTankId={selectedTankId} onTankSelect={onTankSelect} />
            ))}
          </div>
        </Scrollbar>
      </CardContent>
    </Card>
  );
}

function CustomerItem({ customer, selectedClientId, onCustomerSelect }: CustomerItemProps) {
  const isSelected = selectedClientId === customer.clientId;
  const itemClass = isSelected ? 'bg-primary-50' : 'hover:bg-hover';

  const customerAddress = `${customer.clientAddress}, ${customer.clientCity}, ${customer.clientState}, ${customer.clientCountry}`;
  return (
    <div
      onClick={() => {
        onCustomerSelect(customer.clientId);
      }}
      className={cn(itemClass, 'flex flex-col gap-1 border-b px-10 py-7 border-neutral-200 cursor-pointer')}
    >
      <div className='text-sm font-medium tracking-28 text-neutral-900'>{customer.clientNo}</div>
      <div className='font-medium text-md tracking-32 text-neutral-900'>{customer.clientName}</div>
      <div className='font-medium text-md tracking-32 text-secondary-500'>{customerAddress}</div>
    </div>
  );
}
