import { observer } from 'mobx-react';
import React from 'react';

// components

import Map from '@core/ui/levelnow/Map';
import { Card } from '@core/ui/components/Card';
import { useLocations } from '@core/storages/controllers/levelnow/locations';

type Props = {
  className?: string;
  expended?: boolean;
  expendIconButton?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const DomainMap: React.FC<Props> = observer(({ className, expended, expendIconButton = false, onClick }) => {
  const locations = useLocations() || [];
  const locationsWithBandType = locations.filter((location) => location.bandType === 1);
  const points = locationsWithBandType.flatMap((location) =>
    location.clients.map((client) => ({
      clientId: client.clientId,
      latitude: client.latitude!,
      longitude: client.longitude!,
    })),
  );

  return (
    <>
      <Card fullWidth elevation='xs'>
        <Map controls={true} points={points} pointsNavigation zoom={3} className='rounded-md' />
      </Card>
    </>
  );
});
