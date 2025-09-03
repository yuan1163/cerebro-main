import React from 'react';
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

export const DomainLocationList: React.FC = () => {
  const locations = useLocations() || [];
  const locationsWithBandType = locations.filter((location) => location.bandType === 1);

  return (
    <>
      <Scrollbar>
        <AccordionGroup gap>
          {locationsWithBandType.map((location) => (
            <Accordion
              key={location.locationId}
              customTitle={
                <Text component='h2' variant='lg' weight='semibold'>
                  {location.name || t('general.notAvailable.label', 'n/a', 'Not Available.')}
                </Text>
              }
              disableGutters
              defaultOpen
              shadow
              rounded
              variant='solid'
              summaryClass='p-5'
              detailsClass='pb-5 px-5 flex flex-col gap-10'
            >
              {location.clients.map((client) => (
                <LazyMapComponent
                  key={client.clientId}
                  client={client}
                  title={client.clientName || t('general.notAvailable.label', 'n/a', 'Not Available.')}
                  subtitle={client.clientAddress || ''}
                />
              ))}
            </Accordion>
          ))}
        </AccordionGroup>
      </Scrollbar>
    </>
  );
};

// Lazy Map Component
const LazyMapComponent: React.FC<{
  client: LocationClient;
  title: string;
  subtitle: string;
}> = ({ client, title, subtitle }) => {
  const [containerRef, isVisible] = useIntersectionObserver();
  const navigate = useNavigate();

  const points = [
    {
      latitude: client.latitude!,
      longitude: client.longitude!,
    },
  ];

  return (
    <div ref={containerRef}>
      <AccordionItem
        title={title}
        subtitle={subtitle}
        map={
          <div className='w-full h-40'>{isVisible && <Map points={points} zoom={16} className='rounded-[10px]' />}</div>
        }
        onArrowClick={() => navigate(`/levelnow/customers/customer/${client.clientId}`)}
      />
    </div>
  );
};
