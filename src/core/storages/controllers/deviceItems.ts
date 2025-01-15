import React from 'react';

import { apiGetDeviceItems } from '@core/api/entities/deviceItems';
import { DevicesInput, Device } from '@core/api/types';

import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@app/DataAccessAdapter';
import { pack } from '@core/utils/pack';

const CONTROLLER = 'devices';

export class DevicesController {
  devices?: Device[];

  static invalidate() {
    queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.devices;
  }

  getData(): Device[] {
    return this.devices!;
  }

  public getCount(deviceType: number): number {
    if (!this.hasData()) {
      return 0;
    }
    return this.getData().filter((device) => device.deviceType === deviceType).length;
  }

  constructor(devices?: Device[]) {
    this.devices = devices;
  }
}

export const useDeviceItems = (filter: DevicesInput) => {
  const useFilter = pack(filter);

  const { data } = useQuery([CONTROLLER, ...Object.values(useFilter)], () => apiGetDeviceItems(useFilter), {
    enabled: !!filter.locationId,
  });

  return new DevicesController(data);
};
