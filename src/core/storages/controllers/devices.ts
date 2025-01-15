import React from 'react';

import { apiGetDevices } from '@core/api/entities/devices';
import { DevicesInput, Device, Location } from '@core/api/types';

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

  public getGateways(location: Location): Device[] {
    if (!this.hasData()) {
      return [];
    }
    return this.getData().filter(
      (device) => device.ownerLocationId === location.locationId && device.deviceType === 300,
    );
  }

  public getConnectedDevices(gateway: Device): Device[] {
    if (!this.hasData()) {
      return [];
    }
    return this.getData().filter((device) => device.proxyId === gateway.deviceId);
  }

  public getIndependentDevices(location: Location): Device[] {
    if (!this.hasData()) {
      return [];
    }
    return this.getData().filter(
      (device) => device.ownerLocationId === location.locationId && !device.proxyId && device.deviceType !== 300,
    );
  }

  public getTotal(location: Location): number {
    if (!this.hasData()) {
      return 0;
    }
    const me = this.getData().filter((device) => device.ownerLocationId === location.locationId).length;
    const children = location.children?.reduce((acc, child) => acc + this.getTotal(child), 0) ?? 0;
    return me + children;
  }

  public getCameras(location: Location): number {
    if (!this.hasData()) {
      return 0;
    }
    const me = this.getData().filter(
      (device) => device.ownerLocationId === location.locationId && device.deviceType === 500,
    ).length;
    const children = location.children?.reduce((acc, child) => acc + this.getCameras(child), 0) ?? 0;
    return me + children;
  }

  constructor(devices?: Device[]) {
    this.devices = devices;
  }
}

export const useDevices = (filter: DevicesInput) => {
  const useFilter = pack(filter);

  const { data } = useQuery([CONTROLLER, ...Object.values(useFilter)], () => apiGetDevices(useFilter), {
    enabled: !!filter.locationId,
  });

  return new DevicesController(data);
};
