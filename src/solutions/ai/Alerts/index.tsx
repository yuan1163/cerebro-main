import React from 'react';

// utils
import { t } from '@core/utils/translate';

// storages
import { DrawerContext } from '@core/context/DrawerContext';
import { useIvedaAIAlerts } from '@core/storages/controllers/ivedaAI/alerts';

// styles
import { cn } from '@core/utils/classnames';

// data

// components
import { Header } from '@core/ui/cerebro/Header';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import Map from '@core/ui/levelnow/Map';

// type
import { IvedaAIAlertItem } from '@core/api/types';

// icons
import AlertsLineIcon from '@assets/icons/IvedaAI/sidebar/alerts-line.svg?component';
import AlertsList from './AlertsList';
import AlertsCard from './AlertsCard';
import AlertCards from './AlertsCards';

// const fakeAlerts: IvedaAIAlertItem[] = [
//   {
//     alertId: 1,
//     alertType: 'Motion Detected',
//     alertSeverity: 'High',
//     alertTimestamp: '2024-06-20T10:15:00Z',
//     locationId: 1,
//     cameraId: 101,
//     description: 'Motion detected in the front yard.',
//     },

const fakeLocations = [
  {
    locationId: 1,
    name: 'Location 1',
    bandType: 1,
    clients: [
      {
        clientId: 101,
        clientName: 'Client A',
        clientNo: 'C101',
        clientContact: 'John Doe',
        clientPhone: '123-456-7890',
        clientCountry: 'USA',
        clientState: 'California',
        clientCity: 'San Francisco',
        clientAddress: '123 Main St',
        clientPostCode: '94105',
        brandId: 1,
        salesRepUserId: null,
        customerServiceRepUserId: null,
        locationId: 1,
        latitude: 37.7749,
        longitude: -122.4194,
        alertPriority: 3,
      },
    ],
  },
];

export const Alerts = () => {
  const { isDrawerExpanded } = React.useContext(DrawerContext);
  const { alerts, isLoading, error } = useIvedaAIAlerts();

  return (
    <div className='flex flex-col min-h-[calc(100vh-20px)]'>
      <Header
        icon={<AlertsLineIcon />}
        title={t('solutions.alerts.label', 'Alerts', 'Title for the alerts solution in the header')}
        widgets={false}
        className={cn(
          'fixed top-0 right-0 px-6 z-10 bg-[#f9fafb] transition-[left,width] duration-[250ms]',
          isDrawerExpanded ? 'left-[15rem] w-[calc(100vw-15rem)]' : 'left-[3.75rem] w-[calc(100vw-3.75rem)]',
        )}
      />
      <UnitContainer className='mt-[84px] min-h-full max-h-[1070px] flex flex-1 scrollbar-none mb-5'>
        <div className='w-full flex-1 rounded-[10px] overflow-hidden relative'>
          <Map points={fakeLocations[0].clients} marker='alert' zoom={16} />
        </div>
        <AlertsList className='absolute z-10 top-4 left-4 w-[400px] h-[calc(100%-32px)]' />
        <AlertCards className='absolute top-4 right-4' />
      </UnitContainer>
    </div>
  );
};
