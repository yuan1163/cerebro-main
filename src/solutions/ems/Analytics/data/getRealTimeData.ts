import { useDeviceParameters } from '@solutions/ems/api/hook/useDeviceParameters';
import moment from 'moment';

type RealTimeDataParams = {
  locationId: number | undefined;
  deviceId: string | undefined;
  paramName: string | string[];
  index: string;
  expiredMs?: number | undefined; // threshold of loosing connection
};

export const getRealTimeData = (params: RealTimeDataParams) => {
  let value: string | undefined;

  const dataArray = useDeviceParameters({
    locationId: params.locationId,
    deviceId: params.deviceId,
    paramName: params.paramName,
  });

  if (!dataArray.data) return dataArray.data; // no data from device

  const targetParam = dataArray.data.find((data) => {
    return data.index === params.index;
  });

  // if (!targetParam?.value) return value; // no index or value

  // // active connection check
  // if (params.expiredMs) {
  //   if (!targetParam?.updateDateMs) return value; // no index or updated timestamp
  //   if (moment().valueOf() - targetParam.updateDateMs > params.expiredMs) return value; // loose connection from device
  // }

  if (targetParam && params.expiredMs && targetParam.updateDateMs) {
    if (moment().valueOf() - targetParam.updateDateMs <= params.expiredMs) {
      targetParam.value = targetParam.value === null ? undefined : targetParam.value;
      return targetParam;
    }
  }

  return targetParam;
};
