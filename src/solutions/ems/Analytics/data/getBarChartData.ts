import moment from 'moment';

// utils

import { t } from '@core/utils/translate';

// storages

import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// hooks

import { useDeviceHistoryParameters } from '@solutions/ems/api/hook/useDeviceHistoryParameters';
import { useDeviceParts } from '@solutions/ems/api/hook/useDeviceParts';
import { getCarbonEmissionFactors } from './getCarbonEmissionFactors';
import { isChild } from './getRealTimePartLocationData';

export type ProportionDataOutput = {
  isFetching: boolean;
  xAxis: string[];
  yAxisData: { name: string; data: (string | number | null)[] }[];
};

export const Consumption_getProportionData = (START_DATETIME?: string, END_DATETIME?: string): ProportionDataOutput => {
  const partLocationId = useUI().emsCurrentLocation;

  let xAxis: string[] = [];
  let yAxisData: { name: string; data: (string | number | null)[] }[] = [{ name: 'kWh', data: [] }];

  const locations = useLocations();
  const childrenLocations = locations.getElementById(partLocationId)?.children;

  const partArray = useDeviceParts({
    partLocationId: partLocationId,
    startDate: moment.utc().format('YYYY-MM-DDTHH:mm:00').toString(),
    endDate: moment.utc().format('YYYY-MM-DDTHH:mm:00').toString(),
  });

  const dataArray = useDeviceHistoryParameters({
    partLocationId: partLocationId,
    paramName: 'energyHourly',
    startDate: moment.utc(START_DATETIME).valueOf().toString(),
    endDate: moment.utc(END_DATETIME).valueOf().toString(),
    aggregation: 1,
  });

  // early return if no part setting
  if (!partArray?.length) {
    return {
      isFetching: false,
      xAxis: xAxis,
      yAxisData: yAxisData,
    };
  }

  // early return if no device parameter data
  if (!dataArray.data?.length) {
    return {
      isFetching: dataArray.isFetching,
      xAxis: xAxis,
      yAxisData: yAxisData,
    };
  }

  let hasData = false;

  if (!childrenLocations?.length) {
    partArray.forEach((part) => {
      part.description ? xAxis.push(part.description) : xAxis.push('');
    });

    partArray.forEach((part, index) => {
      const partData = dataArray.data?.filter(
        (data) => data.deviceId === part.deviceId && data.index === part.index && data.value,
      );

      if (partData?.length) {
        partData.map((data) => {
          if (index in yAxisData[0].data) {
            yAxisData[0].data[index] = Number(yAxisData[0].data[index]) + Number(data.value);
          } else {
            yAxisData[0].data.push(Number(data.value));
          }

          hasData = true;
        });
      } else {
        yAxisData[0].data.push(null);
      }

      yAxisData[0].data[index] = yAxisData[0].data[index] ? Number(yAxisData[0].data[index]).toFixed(2) : null;
    });
  } else {
    childrenLocations.forEach((location) => {
      location.name ? xAxis.push(location.name) : xAxis.push('');
    });
    yAxisData[0].data = new Array(xAxis.length).fill(null);

    dataArray.data.forEach((data) => {
      for (let i = 0; i < childrenLocations.length; i++) {
        if (
          isChild(childrenLocations[i], data.partLocationId) ||
          childrenLocations[i].locationId === data.partLocationId
        ) {
          data.value ? (yAxisData[0].data[i] = Number(yAxisData[0].data[i]) + Number(data.value)) : true;
          hasData = true;
          break;
        }
      }
    });

    yAxisData[0].data = yAxisData[0].data.map((value) => {
      if (typeof value === 'number') return value.toFixed(2);
      return value;
    });
  }

  xAxis = hasData ? xAxis : [];

  return {
    isFetching: dataArray.isFetching,
    xAxis: xAxis,
    yAxisData: yAxisData,
  };
};

export const Carbon_getTrendData = (START_DATETIME?: string, END_DATETIME?: string): ProportionDataOutput => {
  const partLocationId = useUI().emsCurrentLocation;
  const FORMATION_ID = useUI().emsCurrentLocation;
  const PARAM_NAME = 'energyHourly';

  let xAxis: string[] = [
    t('date.months.janAbbr.label', 'Jan', 'Abbreviation for January.'),
    t('date.months.febAbbr.label', 'Feb', 'Abbreviation for February.'),
    t('date.months.marAbbr.label', 'Mar', 'Abbreviation for March.'),
    t('date.months.aprAbbr.label', 'Apr', 'Abbreviation for April.'),
    t('date.months.mayAbbr.label', 'May', 'Abbreviation for May.'),
    t('date.months.junAbbr.label', 'Jun', 'Abbreviation for June.'),
    t('date.months.julAbbr.label', 'Jul', 'Abbreviation for July.'),
    t('date.months.augAbbr.label', 'Aug', 'Abbreviation for August.'),
    t('date.months.sepAbbr.label', 'Sep', 'Abbreviation for September.'),
    t('date.months.octAbbr.label', 'Oct', 'Abbreviation for October.'),
    t('date.months.novAbbr.label', 'Nov', 'Abbreviation for November.'),
    t('date.months.decAbbr.label', 'Dec', 'Abbreviation for December.'),
  ];
  let yAxisData: { name: string; data: (string | number | null)[] }[] = [
    {
      name: t(
        'ems.cO2e.label',
        'CO2e',
        'A metric expressing greenhouse gas emissions in terms of carbon dioxide equivalents.',
      ),
      data: Array(12).fill(null),
    },
  ];
  const FACTOR: number | undefined = getCarbonEmissionFactors({
    locationId: FORMATION_ID,
    year: moment().year(),
  });

  const dataArray = useDeviceHistoryParameters({
    partLocationId: partLocationId,
    paramName: PARAM_NAME,
    startDate: moment.utc(START_DATETIME).valueOf().toString(),
    endDate: moment.utc(END_DATETIME).valueOf().toString(),
    aggregation: 5,
  });

  if (!dataArray['data']?.length)
    return {
      isFetching: dataArray.isFetching,
      xAxis: [],
      yAxisData: [
        {
          name: t(
            'ems.cO2e.label',
            'CO2e',
            'A metric expressing greenhouse gas emissions in terms of carbon dioxide equivalents.',
          ),
          data: [],
        },
      ],
    };

  let hasData = false;
  dataArray['data'].forEach((data) => {
    const MonthToNumber: number = Number(moment(data.measureDate).format('MM'));

    if (FACTOR && data.value) {
      const factorValue: number = Number(data.value) * FACTOR;

      yAxisData[0].data[MonthToNumber - 1]
        ? (yAxisData[0].data[MonthToNumber - 1] = (Number(yAxisData[0].data[MonthToNumber - 1]) + factorValue).toFixed(
            2,
          ))
        : (yAxisData[0].data[MonthToNumber - 1] = factorValue.toFixed(2));
      hasData = true;
    }
  });

  xAxis = hasData ? xAxis : [];

  return {
    isFetching: dataArray.isFetching,
    xAxis: xAxis,
    yAxisData: yAxisData,
  };
};

export const Carbon_getProportionData = (START_DATETIME?: string, END_DATETIME?: string): ProportionDataOutput => {
  const partLocationId = useUI().emsCurrentLocation;
  const FORMATION_ID = useUI().emsCurrentLocation;
  const PARAM_NAME = 'energyHourly';
  const AGGREGATION = 5;

  let xAxis: string[] = [];
  let yAxisData: { name: string; data: (string | number | null)[] }[] = [
    {
      name: t(
        'ems.cO2e.label',
        'CO2e',
        'A metric expressing greenhouse gas emissions in terms of carbon dioxide equivalents.',
      ),
      data: [],
    },
  ];
  const FACTOR: number | undefined = getCarbonEmissionFactors({
    locationId: FORMATION_ID,
    year: moment().year(),
  });

  const locations = useLocations();
  const childrenLocations = locations.getElementById(partLocationId)?.children;

  const partArray = useDeviceParts({
    partLocationId: partLocationId,
    startDate: moment.utc().format('YYYY-MM-DDTHH:mm:00').toString(),
    endDate: moment.utc().format('YYYY-MM-DDTHH:mm:00').toString(),
  });

  const dataArray = useDeviceHistoryParameters({
    partLocationId: partLocationId,
    paramName: PARAM_NAME,
    startDate: moment.utc(START_DATETIME).valueOf().toString(),
    endDate: moment.utc(END_DATETIME).valueOf().toString(),
    aggregation: AGGREGATION,
  });

  // early return if no part setting
  if (!partArray?.length) {
    return {
      isFetching: false,
      xAxis: xAxis,
      yAxisData: yAxisData,
    };
  }

  // early return if no device parameter data
  if (!dataArray.data?.length) {
    return {
      isFetching: dataArray.isFetching,
      xAxis: xAxis,
      yAxisData: yAxisData,
    };
  }

  if (!FACTOR) {
    return {
      isFetching: false,
      xAxis: xAxis,
      yAxisData: yAxisData,
    };
  }

  let hasData = false;

  if (!childrenLocations?.length) {
    partArray.forEach((part) => {
      part.description ? xAxis.push(part.description) : xAxis.push('');
    });

    partArray.forEach((part, index) => {
      const partData = dataArray['data']?.filter(
        (data) => data.deviceId === part.deviceId && data.index === part.index && data.value,
      );
      // console.log(partData);

      if (partData && FACTOR) {
        partData.map((data) => {
          hasData = true;
          const factorValue = Number(data.value) * FACTOR;
          if (index in yAxisData[0].data) {
            yAxisData[0].data[index] = Number(yAxisData[0].data[index]) + factorValue;
          } else {
            yAxisData[0].data.push(factorValue);
          }
        });
      } else {
        yAxisData[0].data.push(null);
      }

      yAxisData[0].data[index] = yAxisData[0].data[index] ? Number(yAxisData[0].data[index]).toFixed(2) : null;
    });
  } else {
    childrenLocations.forEach((location) => {
      location.name ? xAxis.push(location.name) : xAxis.push('');
    });
    yAxisData[0].data = new Array(xAxis.length).fill(null);

    dataArray.data.forEach((data) => {
      for (let i = 0; i < childrenLocations.length; i++) {
        if (
          isChild(childrenLocations[i], data.partLocationId) ||
          childrenLocations[i].locationId === data.partLocationId
        ) {
          data.value ? (yAxisData[0].data[i] = Number(yAxisData[0].data[i]) + Number(data.value) * FACTOR) : true;
          hasData = true;
          break;
        }
      }
    });

    yAxisData[0].data = yAxisData[0].data.map((value) => {
      if (typeof value === 'number') return value.toFixed(2);
      return value;
    });
  }

  xAxis = hasData ? xAxis : [];

  return {
    isFetching: dataArray.isFetching,
    xAxis: xAxis,
    yAxisData: yAxisData,
  };
};
