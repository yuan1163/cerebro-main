import { useDeviceParameters } from '@solutions/ems/api/hook/useDeviceParameters';
import moment from 'moment';

type RealTimeDataPartParams = {
  partLocationId: number | undefined;
  paramName: string | string[];
  expiredMs?: number | undefined; // threshold of loosing connection
};

export const getRealTimePartData = (params: RealTimeDataPartParams): string | undefined => {
  let value: string | undefined;
  let sumValue: number = 0;
  let valueExit: boolean = false;
  let updateDateMs: number | null | undefined;

  const dataArray = useDeviceParameters({
    partLocationId: params.partLocationId,
    paramName: params.paramName,
  });
  if (!dataArray.data) return value; // no data from device
  // console.log(dataArray);

  dataArray.data.forEach((data) => {
    if (data.value) {
      valueExit = true;
      sumValue += Number(data.value);
    }
    if (updateDateMs && data.updateDateMs) {
      updateDateMs < data.updateDateMs ? (updateDateMs = data.updateDateMs) : false;
    } else {
      updateDateMs = data.updateDateMs;
    }
  });
  if (valueExit) value = sumValue.toFixed(2);

  // active connection check
  if (params.expiredMs) {
    if (!updateDateMs) return value; // no index or updated timestamp
    if (moment().valueOf() - updateDateMs > params.expiredMs) return value; // loose connection from device
  }

  return value;
};
