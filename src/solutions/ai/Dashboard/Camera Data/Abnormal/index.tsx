import React, { useState } from 'react';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Dropdown, DropdownOption } from '@core/ui/IvedaAI/Dropdown';
import { imgIntrusion04 } from './svg';

// Mock data for Abnormal events
const abnormalData = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  image: imgIntrusion04,
  date: '2025-02-28',
  time: '19:20:06',
  cameraName: 'Weapon Detection Outdoor 1',
  detectionType: 'Gun Detection',
}));

type AbnormalCardProps = {
  image: string;
  date: string;
  time: string;
  cameraName: string;
  detectionType: string;
};

const AbnormalCard: React.FC<AbnormalCardProps> = ({ image, date, time, cameraName, detectionType }) => {
  return (
    <div className='flex flex-col gap-2 overflow-hidden'>
      {/* Image Container */}
      <div className='relative w-full h-[150px] rounded-[10px] border-[3px] border-[#ff4545] overflow-hidden'>
        <div className='absolute inset-0'>
          <img src={image} alt='Intrusion Detection' className='object-cover w-full h-full' />
        </div>
      </div>

      {/* Info Container */}
      <div className='w-full p-3 rounded bg-hover'>
        <div className='flex flex-col gap-1'>
          {/* Date and Time */}
          <div className='flex justify-between gap-2 text-sm font-medium text-neutral-900'>
            <span>{date} </span>
            <span>{time}</span>
          </div>

          {/* Camera Name */}
          <p className='text-sm font-medium truncate text-neutral-900'>{cameraName}</p>

          {/* Detection Type */}
          <p className='text-sm font-medium truncate text-secondary-500'>{detectionType}</p>
        </div>
      </div>
    </div>
  );
};

const filterOptions: DropdownOption<string>[] = [
  { label: 'All', value: 'all' },
  { label: 'Weapon Detection', value: 'weapon' },
  { label: 'Weapon Detection Outdoor 1', value: 'weapon-outdoor-1' },
  { label: 'Demo Fire', value: 'demo-fire' },
];

export default function Abnormal() {
  const [selectedFilter, setSelectedFilter] = useState<DropdownOption<string>>(filterOptions[0]);

  return (
    <div className='flex flex-col w-full gap-4 overflow-hidden'>
      {/* Dropdown Filter */}
      <Dropdown value={selectedFilter} onChange={setSelectedFilter} options={filterOptions} placeholder='All' />

      {/* Content Grid */}
      <Scrollbar>
        <div className='grid grid-cols-3 gap-4 pr-2'>
          {abnormalData.map((item) => (
            <AbnormalCard
              key={item.id}
              image={item.image}
              date={item.date}
              time={item.time}
              cameraName={item.cameraName}
              detectionType={item.detectionType}
            />
          ))}
        </div>
      </Scrollbar>
    </div>
  );
}
