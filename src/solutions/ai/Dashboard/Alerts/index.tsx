import React, { useState } from 'react';

// utils
import { t } from '@core/utils/translate';

// components
import { Accordion } from '@core/ui/components/Accordion';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { Text } from '@core/ui/components/Text';
// hooks
import { useIvedaAIAlert } from '@core/storages/controllers/ivedaAI/alert';
import { useNavigate } from 'react-router-dom';

// type
import { IvedaAIAlertItem } from '@core/api/types';

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

export const Alerts: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (alertId: number) => {
    navigate(`/ai/alerts/${alertId}`);
  };
  const alerts = useIvedaAIAlert();

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
    >
      <Scrollbar>
        <div className='flex flex-col gap-4'>
          {alerts.map((alert) => (
            <ALertItem key={alert.alertId} alert={alert} onNavigate={handleNavigate} />
          ))}
        </div>
      </Scrollbar>
    </Accordion>
  );
};

const ALertItem: React.FC<{ alert: IvedaAIAlertItem; onNavigate: (alertId: number) => void }> = ({
  alert,
  onNavigate,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className='flex gap-3 cursor-pointer bg-neutral-50 hover:bg-neutral-100 rounded-[10px]'
      onClick={() => onNavigate(alert.alertId)}
    >
      {imageError ? (
        <div className='w-[120px] h-[120px] rounded-[10px] bg-neutral-100'></div>
      ) : (
        <div className='relative w-[120px] h-[120px] rounded-[10px] overflow-hidden bg-neutral-100'>
          {/* Blurred placeholder image */}
          <img
            src={alert.serverDomain + alert.alertImage}
            alt=''
            className={`absolute inset-0 w-full h-full object-cover blur-md scale-110 transition-opacity duration-300 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            aria-hidden='true'
          />
          {/* Sharp actual image */}
          <img
            src={alert.serverDomain + alert.alertImage}
            alt={alert.alertName}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading='lazy'
            className={`relative w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      )}
      <div className='h-[120px] grid flex-1 grid-cols-2 gap-1 px-4 py-3 font-medium text-medium'>
        <div className=' text-neutral-900'>{getLocalDateString(alert.fullTime)}</div>
        <div className='text-right text-neutral-500'>{getRelativeTime(alert.fullTime)}</div>
        <div className='truncate text-neutral-900'></div>
        <div className='text-right truncate text-secondary-500'>{alert.cameraName}</div>
        <div className='col-span-2 pt-1 line-clamp-2 text-secondary-500'>{alert.alertName}</div>
      </div>
    </div>
  );
};
