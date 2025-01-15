// TODO implement maps api when ready on backend
import React from 'react';

import { MapDimensions, MapInput } from '@core/api/types';

import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@app/DataAccessAdapter';

// images

// import floor from '@assets/floor.svg';
// import floorDisabled from '@assets/floor-disabled.svg';
import { apiGetFile } from '@core/api/entities/files';
import { apiGetDimensions } from '@core/api/entities/dimensions';

const CONTROLLER = 'maps';

export class MapsController {
  map?: string;
  dimensions?: MapDimensions;

  static invalidate() {
    queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.map && !!this.dimensions;
  }

  getImage(): string {
    return this.map!;
  }

  getDimensions(): MapDimensions {
    return this.dimensions!;
  }

  constructor(map?: string, dimensions?: MapDimensions) {
    this.map = map;
    this.dimensions = dimensions;
  }
}

const IMAGE_TYPE = 1;
const IMAGE_FILE_NAME = 'map';

export const useMap = (filter: MapInput) => {
  const { data: mapFileRecord } = useQuery(
    ['space:map', filter.locationId],
    () =>
      apiGetFile({
        type: IMAGE_TYPE,
        objectId: filter.locationId?.toString(),
        name: IMAGE_FILE_NAME,
        getUrl: true,
      }),
    {
      enabled: !!filter.locationId,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const { data: dimensions } = useQuery(
    ['space:dimensions', filter.locationId],
    () =>
      apiGetDimensions({
        locationId: filter.locationId,
      }),
    {
      enabled: !!filter.locationId,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  return new MapsController(mapFileRecord?.url, dimensions ? dimensions : undefined);
};
