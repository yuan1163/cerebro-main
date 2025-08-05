import React from 'react';

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

export const DomainLocationList: React.FC = () => {
  const locations = useLocations() || [];

  const countries = locations.filter((location) => location.type === 2);
  const places = locations.filter((location) => location.type === 3);

  return (
    <>
      <Scrollbar>
        <AccordionGroup gap>
          {countries.map((country) => (
            <Accordion
              key={country.locationId}
              customTitle={
                <Text component='h2' variant='lg' weight='semibold'>
                  {country.name || t('general.notAvailable.label', 'n/a', 'Not Available.')}
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
              {places
                .filter((place) => place.parentId === country.locationId)
                .map((place) => {
                  const points = [
                    {
                      latitude: place.latitude!,
                      longitude: place.longitude!,
                    },
                  ];
                  return (
                    <React.Fragment key={place.locationId}>
                      <AccordionItem
                        title={place.name || t('general.notAvailable.label', 'n/a', 'Not Available.')}
                        subtitle={place.street || ''}
                        map={
                          <div className='w-full h-40'>
                            <Map points={points} zoom={16} className='rounded-[10px]' />
                          </div>
                        }
                      />
                    </React.Fragment>
                  );
                })}
            </Accordion>
          ))}
        </AccordionGroup>
      </Scrollbar>
    </>
  );
};
