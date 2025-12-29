import React, { useEffect, useState } from 'react';
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
import { on } from 'events';

// const fakeLocations = [
//   {
//     locationId: 1,
//     status: 1,
//     latitude: 37.7749,
//     longitude: -122.4194,
//   },
// ];

// const fakeLocations = [
//   {
//     locationId: 1,
//     status: 1,
//     latitude: 37.7749,
//     longitude: -122.4194,
//   },
// ];

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
      },
    ],
  },
];

export const CameraLocations: React.FC = () => {
  return (
    <Accordion
      customTitle={
        <Text variant='lg' weight='medium' lineHeight='normal'>
          {t('general.cameraLocations.label', 'Camera Locations', 'camera locations')}
        </Text>
      }
      divider
      defaultOpen
      shadow
      rounded
      variant='solid'
      summaryClass='p-5'
      detailsClass='pb-4 px-5 flex flex-col gap-10 flex-1 h-[calc(100%-68px)] min-h-[360px]'
    >
      <div className='w-full h-full flex-1 rounded-[10px] overflow-hidden relative'>
        <Map points={fakeLocations[0].clients} marker='camera' zoom={16} />
      </div>
    </Accordion>
  );
};
