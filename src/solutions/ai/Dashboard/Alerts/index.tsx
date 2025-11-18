import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// utils
import { t } from '@core/utils/translate';
import { useLocations } from '@core/storages/controllers/levelnow/locations';

// components
import { Accordion } from '@core/ui/components/Accordion';
import { AccordionGroup } from '@core/ui/components/AccordionGroup';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Text } from '@core/ui/components/Text';
import Map from '@core/ui/levelnow/Map';
import { AccordionItem } from '@core/ui/levelnow/AccordionItem';
// hooks
import { useIntersectionObserver } from '@core/hooks/useIntersectionObserver';
import { LocationClient } from '@core/api/types';
import { get } from '@nodemodules/@types/lodash';

// Alert types
type Alert = {
  id: string;
  date: string;
  location: string;
  cameraId: string;
  description: string;
  thumbnailUrl: string;
};

// Helper function to calculate relative time
const getRelativeTime = (date: string): string => {
  const now = Date.now();
  const alertTime = new Date(date).getTime();
  const diffMs = now - alertTime;

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes}min ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
};

const getLocalDateString = (date: string): string => {
  const alertDate = new Date(date);
  return alertDate.toLocaleDateString().replace(/\//g, '-');
};

// Mock alerts data
const mockAlerts: Alert[] = [
  {
    id: '1',
    date: '2025-06-20T14:30:00Z',
    location: 'NYC - Bus a...',
    cameraId: 'CCTV-14',
    description: 'Times Square Centre has reported some alerts fro...',
    thumbnailUrl: '',
  },
  {
    id: '2',
    date: '2025-06-20T14:30:00Z',
    location: 'NYC - Bus a...',
    cameraId: 'CCTV-14',
    description: 'Times Square Centre has reported some alerts fro...',
    thumbnailUrl: '',
  },
  {
    id: '3',
    date: '2025-06-20T14:30:00Z',
    location: 'NYC - Bus a...',
    cameraId: 'CCTV-14',
    description: 'Times Square Centre has reported some alerts fro...',
    thumbnailUrl: '',
  },
  {
    id: '4',
    date: '2025-06-20T14:30:00Z',
    location: 'NYC - Bus a...',
    cameraId: 'CCTV-14',
    description: 'Times Square Centre has reported some alerts fro...',
    thumbnailUrl: '',
  },
  {
    id: '5',
    date: '2025-06-20T14:30:00Z',
    location: 'NYC - Bus a...',
    cameraId: 'CCTV-14',
    description: 'Times Square Centre has reported some alerts fro...',
    thumbnailUrl: '',
  },
  {
    id: '6',
    date: '2025-06-20T14:30:00Z',
    location: 'NYC - Bus a...',
    cameraId: 'CCTV-14',
    description: 'Times Square Centre has reported some alerts fro...',
    thumbnailUrl: '',
  },
  {
    id: '7',
    date: '2025-06-20T14:30:00Z',
    location: 'NYC - Bus a...',
    cameraId: 'CCTV-14',
    description: 'Times Square Centre has reported some alerts fro...',
    thumbnailUrl: '',
  },
  {
    id: '8',
    date: '2025-06-20T14:30:00Z',
    location: 'NYC - Bus a...',
    cameraId: 'CCTV-14',
    description: 'Times Square Centre has reported some alerts fro...',
    thumbnailUrl: '',
  },
];

export const Alerts: React.FC = () => {
  return (
    <Accordion
      customTitle={
        <Text variant='lg' weight='medium' lineHeight='normal'>
          {t('general.alerts.label', 'Alerts', 'Label for alerts section')}
        </Text>
      }
      divider
      defaultOpen
      shadow
      rounded
      variant='solid'
      summaryClass='p-5'
      detailsClass='flex-1 overflow-hidden h-[calc(100%-70px) p-5'
      className='min-h-0'
      // className='flex flex-col flex-1 '
    >
      <Scrollbar>
        <div className='flex flex-col gap-4'>
          {mockAlerts.map((alert) => (
            <ALertItem key={alert.id} alert={alert} />
          ))}
        </div>
      </Scrollbar>
    </Accordion>
  );
};

const ALertItem: React.FC<{ alert: Alert }> = ({ alert }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
    }
  };
  return (
    <div className='flex gap-3'>
      {imageError ? (
        <div className='w-[120px] h-[120px] rounded-[10px] bg-neutral-100'></div>
      ) : (
        <img
          src={alert.thumbnailUrl}
          alt={alert.description}
          onError={handleImageError}
          className='w-[120px] h-[120px] object-cover rounded-[10px]'
        />
      )}
      <div className='h-[120px] grid flex-1 grid-cols-2 gap-1 px-4 py-3 font-medium text-medium'>
        <div className=' text-neutral-900'>{getLocalDateString(alert.date)}</div>
        <div className='text-neutral-500'>{getRelativeTime(alert.date)}</div>
        <div className='truncate text-neutral-900'>{alert.location}</div>
        <div className='text-secondary-500'>{alert.cameraId}</div>
        <div className='col-span-2 pt-1 line-clamp-2 text-secondary-500'>{alert.description}</div>
      </div>
    </div>
  );
};
