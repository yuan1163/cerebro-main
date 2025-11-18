import React, { useEffect, useState } from 'react';

// utils
import { t } from '@core/utils/translate';

// components
import { Accordion } from '@core/ui/components/Accordion';
import { Text } from '@core/ui/components/Text';
import Counting from './Counting';

// icons
import CameraIcon from '@assets/icons/IvedaAI/camera.svg?component';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import CameraOffline from '@assets/icons/IvedaAI/map/camera-offline.svg?component';

// type Camera = {
//   id: string;
//   cameraName: string;
//   abnormalTime: string;
//   abnormalType: 0 | 1;
// };

// const mockCameraHealthData: Camera[] = [
//   {
//     id: '1',
//     cameraName: 'CCTV-14',
//     abnormalTime: '2025-06-20 14:30',
//     abnormalType: 0,
//   },
//   {
//     id: '2',
//     cameraName: 'CCTV-22',
//     abnormalTime: '',
//     abnormalType: 1,
//   },
//   {
//     id: '3',
//     cameraName: 'CCTV-07',
//     abnormalTime: '2025-06-18 08:45',
//     abnormalType: 1,
//   },
// ];

// const formatAbnormalType = (type: 0 | 1) => {
//   switch (type) {
//     case 0:
//       return (
//         <div className='flex items-center gap-2'>
//           <CameraOffline />
//           {t('general.disconnected.label', 'Disconnected', 'Label indicating the camera is disconnected')}
//         </div>
//       );
//     case 1:
//       return <div>{t('general.connected.label', 'Connected', 'Label indicating the camera is connected')}</div>;
//     default:
//       return '';
//   }
// };

// const dataTabs = [
//   { label: t('cameraData.counting.label', 'Counting', 'Label for counting tab') },
//   { label: t('cameraData.face.label', 'Face', 'Label for face tab') },
//   { label: t('cameraData.intrusion.label', 'Intrusion', 'Label for intrusion tab') },
//   { label: t('cameraData.abnormal.label', 'Abnormal', 'Label for abnormal tab') },
//   { label: t('cameraData.lpr.label', 'LPR', 'Label for LPR tab') },
// ];

type CameraDataProps = {
  tabs?: { label: string; enabled: boolean }[];
};

export const CameraData: React.FC<CameraDataProps> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  useEffect(() => {
    const firstEnabledTab = tabs?.find((tab) => tab.enabled);
    setSelectedTab(firstEnabledTab ? firstEnabledTab.label : null);
  }, [tabs]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Counting':
        return <Counting />;
      case 'Face':
        return <div>Face content coming soon</div>;
      case 'Intrusion':
        return <div>Intrusion content coming soon</div>;
      case 'Abnormal':
        return <div>Abnormal content coming soon</div>;
      case 'LPR':
        return <div>LPR content coming soon</div>;
      default:
        return null;
    }
  };

  return (
    <Accordion
      activedTab={selectedTab}
      tabs={tabs}
      onTabChange={(label: string) => setSelectedTab(label)}
      divider
      defaultOpen
      shadow
      rounded
      variant='solid'
      summaryClass='p-0 pr-5'
      detailsClass='py-4 px-5 flex flex-col gap-10'
    >
      {renderTabContent()}
    </Accordion>
  );
};

// const CameraItem: React.FC<{ camera: Camera }> = ({ camera }) => {
//   return (
//     <>
//       <div className='grid items-center w-full grid-cols-3 gap-4 px-4 py-2 text-center text-medium text-secondary-500'>
//         <div>{camera.cameraName || '-'}</div>
//         <div>{camera.abnormalTime || '-'}</div>
//         <div className='flex items-center justify-center'>{formatAbnormalType(camera.abnormalType) || '-'}</div>
//       </div>
//     </>
//   );
// };
