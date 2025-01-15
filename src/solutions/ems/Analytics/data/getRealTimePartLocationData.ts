import moment from 'moment';

// storage
import { useLocations } from '@core/storages/controllers/locations';

// type
import { Location } from '@core/api/types';

import { useDeviceParameters } from '@solutions/ems/api/hook/useDeviceParameters';
import { useDeviceParts } from '@solutions/ems/api/hook/useDeviceParts';

type RealTimeChildLocationDataParams = {
  partLocationId: number | undefined;
  paramName: string | string[];
  startDate: string;
  endDate: string;
};

type RealTimeChildLocationDataOutput = {
  xAxis: string[];
  yAxisData: (number | string | null)[];
  isFetching: boolean;
  updatedDate: string;
};

export const getRealTimeChildLocationData = (
  params: RealTimeChildLocationDataParams,
): RealTimeChildLocationDataOutput => {
  let xAxis: string[] = [];
  let yAxisData: (number | string | null)[] = [];
  let updatedDate: string = '-';

  const locations = useLocations();
  const childrenLocations = locations.getElementById(params.partLocationId)?.children;

  const partArray = useDeviceParts({
    partLocationId: params.partLocationId,
    startDate: params.startDate,
    endDate: params.endDate,
  });

  const dataArray = useDeviceParameters({
    partLocationId: params.partLocationId,
    paramName: params.paramName,
  });

  // early return if no part setting
  if (!partArray?.length) {
    return {
      isFetching: false,
      xAxis: xAxis,
      yAxisData: yAxisData,
      updatedDate: updatedDate,
    };
  }

  // early return if no device parameter data
  if (!dataArray.data?.length) {
    return {
      isFetching: dataArray.isFetching,
      xAxis: xAxis,
      yAxisData: yAxisData,
      updatedDate: updatedDate,
    };
  }

  // locaiion is at end of branch. display circuit.
  if (!childrenLocations?.length) {
    partArray.forEach((part) => {
      part.description ? xAxis.push(part.description) : xAxis.push('');
    });
    partArray.forEach((part) => {
      const data = dataArray.data?.find((data) => data.deviceId === part.deviceId && data.index === part.index);
      if (data) {
        data.value ? yAxisData.push(Number(data.value).toFixed(2)) : false;
        data.updateDateMs
          ? (updatedDate = moment
              .unix(data.updateDateMs / 1000)
              .format('MM/DD/YYYY HH:mm:ss')
              .toString())
          : false;
      } else {
        yAxisData.push(null);
      }
    });
    // location has children. display location's sum of circuit
  } else {
    childrenLocations.forEach((location) => {
      location.name ? xAxis.push(location.name) : xAxis.push('');
    });
    yAxisData = new Array(xAxis.length).fill(null);

    dataArray.data.forEach((data) => {
      for (let i = 0; i < childrenLocations.length; i++) {
        // console.log(
        //   childrenLocations[i].locationId,
        //   data.partLocationId,
        //   isChild(childrenLocations[i], data.partLocationId),
        //   childrenLocations[i].locationId === data.partLocationId,
        // );
        if (
          isChild(childrenLocations[i], data.partLocationId) ||
          childrenLocations[i].locationId === data.partLocationId
        ) {
          data.value ? (yAxisData[i] = Number(yAxisData[i]) + Number(data.value)) : true;
          data.updateDateMs
            ? (updatedDate = moment
                .unix(data.updateDateMs / 1000)
                .format('MM/DD/YYYY HH:mm:ss')
                .toString())
            : true;
          break;
        }
      }
    });

    yAxisData = yAxisData.map((value) => {
      if (typeof value === 'number') return value.toFixed(2);
      return value;
    });

    yAxisData = yAxisData.slice().sort((a: any, b: any) => {
      b = b ? b : 0;
      a = a ? a : 0;
      return b - a;
    });
  }

  return {
    isFetching: dataArray.isFetching,
    xAxis: xAxis,
    yAxisData: yAxisData,
    updatedDate: updatedDate,
  };
};

export const isChild = (location: Location, childLocationId: number | null | undefined): boolean => {
  if (!childLocationId && childLocationId !== 0) return false;
  const childLocation = getChildByIdRecursive(location, childLocationId);
  if (!childLocation) return false;
  return true;
};

export const getChildByIdRecursive = (parent: Location, id: number): Location | undefined => {
  const children = parent.children;
  if (!children) return undefined;
  for (const child of children) {
    if (child.locationId === id) return child;
    const result = getChildByIdRecursive(child, id);
    if (result) return result;
  }
  return undefined;
};
