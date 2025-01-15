import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';
import { getRootLocationInfo } from '@solutions/ems/api/data/getRootLocationInfo';
import { DeviceHistoryParameter } from '@solutions/ems/api/entities/deviceItems';
import { useDeviceHistoryParameters } from '@solutions/ems/api/hook/useDeviceHistoryParameters';
import { consumptionFromLastMonth } from '@solutions/ems/storages/consumptionFromLastMonth';
import moment from 'moment';
import { getCarbonEmissionFactors } from './getCarbonEmissionFactors';

export type CompareDataParams = {
  locationId?: number;
  deviceId?: string;
  startDate: string | null;
  endDate: string | null;
  paramName?: string | null;
  index?: string | null;
  partLocationId?: number;
};

export type CompareDataOutput = {
  historyValue?: string | number | null;
  historyDateMs?: number | null;
  currentValue?: string | number | null;
  currentDateMs?: number | null;
  inputStartDateMs?: number;
  inputEndDateMs?: number;
};

export type CompareInfoCardFunDataType = 'consumption' | 'carbon' | string;

export const Demand_getCompareData = (params: CompareDataParams): CompareDataOutput => {
  const dataArray = useDeviceHistoryParameters({
    locationId: params.locationId,
    deviceId: params.deviceId,
    startDate: params.startDate,
    endDate: params.endDate,
    paramName: params.paramName,
    index: params.index,
  });

  const result = {
    historyValue: dataArray['data']?.length && dataArray['data'][0].value,
    historyDateMs: dataArray['data']?.length && dataArray['data'][0].measureDateMs,
    currentValue: dataArray['data']?.length && dataArray['data'][dataArray['data'].length - 1].value,
    currentDateMs: dataArray['data']?.length && dataArray['data'][dataArray['data'].length - 1].measureDateMs,
    inputStartDateMs: moment(params.startDate).valueOf(),
    inputEndDateMs: moment(params.endDate).valueOf(),
  };

  return result;
};

// Demand //FIXME: verification required
export const Demand_CompareInfoCardFun_Yesterday = () => {
  const rootLocationInfo = getRootLocationInfo();
  const YESTERDAY_DATE_TIME: string = moment
    .utc()
    .subtract('1', 'day')
    .set({ second: 0, millisecond: 0 })
    .valueOf()
    .toString();
  const CURRENT_DATE_TIME: string = moment.utc().set({ second: 0, millisecond: 0 }).valueOf().toString();

  let result = Demand_getCompareData({
    locationId: rootLocationInfo.locationId,
    deviceId: rootLocationInfo.deviceSPBMId,
    startDate: YESTERDAY_DATE_TIME,
    endDate: CURRENT_DATE_TIME,
    paramName: 'demand',
    index: 'P',
  });

  result = Demand_CheckDataDateTime(result);

  return result;
};

export const Demand_CompareInfoCardFun_Week = () => {
  const rootLocationInfo = getRootLocationInfo();
  const WEEK_DATE_TIME: string = moment
    .utc()
    .subtract('1', 'week')
    .set({ second: 0, millisecond: 0 })
    .valueOf()
    .toString();
  const CURRENT_DATE_TIME: string = moment.utc().set({ second: 0, millisecond: 0 }).valueOf().toString();

  let result = Demand_getCompareData({
    locationId: rootLocationInfo.locationId,
    deviceId: rootLocationInfo.deviceSPBMId,
    startDate: WEEK_DATE_TIME,
    endDate: CURRENT_DATE_TIME,
    paramName: 'demand',
    index: 'P',
  });

  result = Demand_CheckDataDateTime(result);

  return result;
};

export const Demand_CheckDataDateTime = (parps: CompareDataOutput) => {
  const checkTimeRange = 15 * 60 * 1000;

  if (parps.historyValue) {
    parps.historyValue =
      parps.historyDateMs && parps.inputStartDateMs && parps.inputStartDateMs + checkTimeRange > parps.historyDateMs
        ? undefined
        : parps.historyValue;
  }

  if (parps.currentValue) {
    parps.currentValue =
      parps.currentDateMs && parps.inputEndDateMs && parps.inputEndDateMs - checkTimeRange > parps.currentDateMs
        ? undefined
        : parps.currentValue;
  }

  return parps;
};

// Consumption //FIXME: verification required
export const Consumption_getCompareData = (params: CompareDataParams): DeviceHistoryParameter[] | undefined => {
  const dataArray = useDeviceHistoryParameters({
    startDate: params.startDate,
    endDate: params.endDate,
    paramName: params.paramName,
    partLocationId: params.partLocationId,
    aggregation: 1,
  });

  return dataArray['data'];
};

export const CompareInfoCardFun_Yesterday = (dataType: CompareInfoCardFunDataType = 'consumption') => {
  let result: { currentValue: number | null; historyValue: number | null } = { currentValue: null, historyValue: null };

  const emsCurrentLocationId = useUI().emsCurrentLocation;

  const consumption = consumptionFromLastMonth(emsCurrentLocationId);
  const consumptionYesterday = consumption.getYesterdayCompare();

  result.currentValue = consumptionYesterday.currentValue;
  result.historyValue = consumptionYesterday.historyValue;

  const carbonFactor = getCarbonEmissionFactors({ locationId: emsCurrentLocationId, year: moment.utc().year() });

  if (dataType === 'carbon') {
    if (!carbonFactor) return { currentValue: null, historyValue: null };
    result.currentValue = result.currentValue * carbonFactor;
    result.historyValue = result.historyValue * carbonFactor;
  }

  return result;
};

export const CompareInfoCardFun_Week = (dataType: CompareInfoCardFunDataType = 'consumption') => {
  let result: { currentValue: number | null; historyValue: number | null } = { currentValue: null, historyValue: null };

  const emsCurrentLocationId = useUI().emsCurrentLocation;

  const consumption = consumptionFromLastMonth(emsCurrentLocationId);
  const consumptionWeek = consumption.getWeekCompare();

  result.currentValue = consumptionWeek.currentValue;
  result.historyValue = consumptionWeek.historyValue;

  const carbonFactor = getCarbonEmissionFactors({ locationId: emsCurrentLocationId, year: moment.utc().year() });

  if (dataType === 'carbon') {
    if (!carbonFactor) return { currentValue: null, historyValue: null };
    result.currentValue = result.currentValue * carbonFactor;
    result.historyValue = result.historyValue * carbonFactor;
  }

  return result;
};

export const CompareInfoCardFun_Month = (dataType: CompareInfoCardFunDataType = 'consumption') => {
  let result: { currentValue: number | null; historyValue: number | null } = { currentValue: null, historyValue: null };

  const emsCurrentLocationId = useUI().emsCurrentLocation;

  const consumption = consumptionFromLastMonth(emsCurrentLocationId);
  const consumptionMonth = consumption.getMonthCompare();

  result.currentValue = consumptionMonth.currentValue;
  result.historyValue = consumptionMonth.historyValue;

  const carbonFactor = getCarbonEmissionFactors({ locationId: emsCurrentLocationId, year: moment.utc().year() });

  if (dataType === 'carbon') {
    if (!carbonFactor) return { currentValue: null, historyValue: null };
    result.currentValue = result.currentValue * carbonFactor;
    result.historyValue = result.historyValue * carbonFactor;
  }

  return result;
};

export const GetLastData = () => {
  const emsCurrentLocationId = useUI().emsCurrentLocation;
  const consumption = consumptionFromLastMonth(emsCurrentLocationId);
  const todayData = consumption.getTodayData();

  return todayData && todayData[todayData.length - 1];
};
