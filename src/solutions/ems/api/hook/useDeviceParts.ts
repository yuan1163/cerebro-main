import { Device, Location } from '@core/api/types';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import moment from 'moment';
import React, { useMemo } from 'react';
import { apiGetDeviceParts, DevicePartsInput } from '../entities/deviceParts';

export const useDeviceParts = (filter: DevicePartsInput) => {
  const { data } = useQuery(['DeviceParts', filter], () => apiGetDeviceParts(filter), {
    // without startDate and endDate would get expired part setting.
    enabled: (!!filter.locationId || !!filter.partLocationId) && !!filter.startDate && !!filter.endDate,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  return data;
};

export const useCurrentDeviceParts = (filter: DevicePartsInput) => {
  const startDate = useMemo(() => moment().toISOString(), []);
  const endDate = useMemo(() => moment().toISOString(), []);

  const data = useDeviceParts({ ...filter, startDate, endDate });

  const getConnected = (to: Device) => {
    if (!data) {
      return [];
    }
    return data.filter((device) => device.deviceId === to.deviceId);
  };

  const getTargeted = (to: Location) => {
    if (!data) {
      return [];
    }
    return data.filter((device) => device.partLocationId === to.locationId);
  };

  const getPartLocationIds = () => {
    if (!data) {
      return undefined;
    }
    return _.uniq(data.map((device) => device.partLocationId)) as number[];
  };

  return {
    data,
    getConnected,
    getTargeted,
    getPartLocationIds,
  };
};
