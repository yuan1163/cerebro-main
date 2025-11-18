import React, { useState } from 'react';

// utils
import { t } from '@core/utils/translate';

// components
import { Accordion } from '@core/ui/components/Accordion';
import { Text } from '@core/ui/components/Text';

// icons
import CameraIcon from '@assets/icons/IvedaAI/camera.svg?component';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import CameraOffline from '@assets/icons/IvedaAI/map/camera-offline.svg?component';

type Camera = {
  id: string;
  cameraName: string;
  abnormalTime: string;
  abnormalType: 0 | 1;
};

const mockCameraHealthData: Camera[] = [
  {
    id: '1',
    cameraName: 'CCTV-14',
    abnormalTime: '2025-06-20 14:30',
    abnormalType: 0,
  },
  {
    id: '2',
    cameraName: 'CCTV-22',
    abnormalTime: '',
    abnormalType: 1,
  },
  {
    id: '3',
    cameraName: 'CCTV-07',
    abnormalTime: '2025-06-18 08:45',
    abnormalType: 1,
  },
  {
    id: '4',
    cameraName: 'CCTV-19',
    abnormalTime: '2025-06-19 16:20',
    abnormalType: 0,
  },
  {
    id: '5',
    cameraName: 'CCTV-03',
    abnormalTime: '',
    abnormalType: 1,
  },
  {
    id: '5',
    cameraName: 'CCTV-03',
    abnormalTime: '',
    abnormalType: 1,
  },
  {
    id: '5',
    cameraName: 'CCTV-03',
    abnormalTime: '',
    abnormalType: 1,
  },
];

const formatAbnormalType = (type: 0 | 1) => {
  switch (type) {
    case 0:
      return (
        <div className='flex items-center gap-2'>
          <CameraOffline />
          {t('general.disconnected.label', 'Disconnected', 'Label indicating the camera is disconnected')}
        </div>
      );
    case 1:
      return <div>{t('general.connected.label', 'Connected', 'Label indicating the camera is connected')}</div>;
    default:
      return '';
  }
};

export const CameraHealth: React.FC = () => {
  return (
    <Accordion
      customTitle={
        <Text variant='lg' weight='medium' lineHeight='normal'>
          {t('dashboard.cameraHealth.label', 'Camera Health', 'Label for camera health section')}
        </Text>
      }
      divider
      defaultOpen
      shadow
      rounded
      variant='solid'
      constrainHeight
      summaryClass='p-5'
      detailsClass='py-4 px-5 flex flex-col gap-10'
    >
      <div className='flex flex-col items-center h-full'>
        <div className='grid w-full grid-cols-3 px-4 py-2 font-medium text-center text-medium text-neutral-900 bg-neutral-50'>
          <div className='pr-4'>{t('cameraHealth.cameraName.label', 'Camera Name', 'Label for camera name')}</div>
          <div className='px-4 border-x border-neutral-200'>
            {t('cameraHealth.abnormalTime.label', 'Abnormal Time', 'Label for abnormal time')}
          </div>
          <div className='pl-4'>{t('cameraHealth.abnormalType.label', 'Abnormal Type', 'Label for abnormal type')}</div>
        </div>
        <div className='w-full h-[calc(100%-37px)]'>
          <Scrollbar>
            {mockCameraHealthData.map((camera: Camera) => (
              <CameraItem key={camera.id} camera={camera} />
            ))}
          </Scrollbar>
        </div>
      </div>
    </Accordion>
  );
};

const CameraItem: React.FC<{ camera: Camera }> = ({ camera }) => {
  return (
    <>
      <div className='grid items-center w-full grid-cols-3 gap-4 px-4 py-2 text-center text-medium text-secondary-500'>
        <div>{camera.cameraName || '-'}</div>
        <div>{camera.abnormalTime || '-'}</div>
        <div className='flex items-center justify-center'>{formatAbnormalType(camera.abnormalType) || '-'}</div>
      </div>
    </>
  );
};
