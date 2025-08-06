import { observer } from 'mobx-react';
import React from 'react';

// components

import Map from '@core/ui/levelnow/Map';
import { Card } from '@core/ui/components/Card';
import { useLocations } from '@core/storages/controllers/levelnow/locations';

export const DomainMap: React.FC = observer(() => {
  const locations = useLocations() || [];
  console.log('DomainMap locations:', locations);

  const points = locations
    .filter((location) => location.latitude && location.longitude)
    .map((location) => ({
      latitude: location.latitude!,
      longitude: location.longitude!,
    }));

  console.log('DomainMap points:', points);

  return (
    <>
      <Card fullWidth elevation='xs'>
        <Map controls={true} points={points} zoom={1} className='rounded-md' />
      </Card>
    </>
  );
});
