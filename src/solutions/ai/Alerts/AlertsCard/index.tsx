import React from 'react';
import { cn } from '@core/utils/classnames';

// icons
import AlertsSolidRedIcon from '@assets/icons/IvedaAI/alert/alert_solid_red.svg?component';
import ChevronRightIcon from '@assets/icons/line/chevron-right.svg?component';
import LightningIcon from '@assets/icons/solid/lightning-01.svg?component';

type AlertCardProps = {
  className?: string;
};

// Fake data for the alert card
const fakeAlert = {
  id: 1,
  title: 'Public Fight',
  cameraName: 'CCTV-13',
  imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
  status: 'Active',
  alertCount: 2,
  location: '24th Bullock St, Barangay 2',
  created: '2025-02-28 19:19:55',
};

export default function AlertsCard({ className }: AlertCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),3px_-2px_2px_0px_rgba(0,0,0,0.04)] border-b border-[rgba(0,0,0,0.08)] p-5 flex flex-col gap-4',
        className,
      )}
    >
      {/* Header */}
      <div className='flex items-center w-full gap-4'>
        <div className='bg-[rgba(255,69,69,0.1)] rounded-[8px] p-2.5 w-[60px] h-[60px] flex items-center justify-center shrink-0'>
          <AlertsSolidRedIcon />
        </div>
        <div className='flex flex-col flex-1 gap-2'>
          <div className='font-medium text-[16px] text-neutral-900'>{fakeAlert.title}</div>
          <div className='font-medium text-[16px] text-secondary-500'>{fakeAlert.cameraName}</div>
        </div>
        <div className='flex items-start self-stretch justify-center shrink-0'>
          <ChevronRightIcon className='w-6 h-6 text-secondary-500' />
        </div>
      </div>

      {/* Image */}
      <div className='w-full h-[192px] rounded overflow-hidden bg-gray-100'>
        <img src={fakeAlert.imageUrl} alt={fakeAlert.title} className='object-cover w-full h-full' />
      </div>

      {/* Status */}
      <div className='flex justify-between w-full'>
        <div className='font-medium text-[16px] text-neutral-900'>Status</div>
        <div className='flex items-center gap-2 shrink-0'>
          <LightningIcon className='w-5 h-5 text-[#ff4545]' />
          <div className='font-semibold text-[16px] text-secondary-500'>{fakeAlert.status}</div>
        </div>
      </div>

      {/* Alerts */}
      <div className='flex justify-between w-full'>
        <div className='font-medium text-[16px] text-neutral-900'>Alerts</div>
        <div className='font-semibold text-[16px] text-secondary-500 shrink-0'>{fakeAlert.alertCount}</div>
      </div>

      {/* Location */}
      <div className='flex justify-between w-full'>
        <div className='font-medium text-[16px] text-neutral-900'>Location</div>
        <div className='font-semibold text-[16px] text-secondary-500 text-right shrink-0'>{fakeAlert.location}</div>
      </div>

      {/* Created */}
      <div className='flex justify-between w-full'>
        <div className='font-medium text-[16px] text-neutral-900'>Created</div>
        <div className='flex gap-2 items-start font-semibold text-[16px] text-secondary-500 text-right shrink-0'>
          <div>{fakeAlert.created.split(' ')[0]}</div>
          <div>{fakeAlert.created.split(' ')[1]}</div>
        </div>
      </div>
    </div>
  );
}
