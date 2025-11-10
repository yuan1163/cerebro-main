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

const fakeLocations = [
  {
    locationId: 1,
    status: 1,
    latitude: 37.7749,
    longitude: -122.4194,
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
      detailsClass='pb-4 px-5 flex flex-col gap-10 flex-1 h-[calc(100%-70px)]'
      className='min-h-[360px]'
    >
      <div className='w-full h-full flex-1 rounded-[10px] overflow-hidden relative'>
        <Map points={fakeLocations} marker='camera' zoom={16} />
      </div>
    </Accordion>
  );
};
