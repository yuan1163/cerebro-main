import { useUI } from '@core/storages/ui';
import moment, { utc } from 'moment';
import { getRootLocationInfo } from '../../api/data/getRootLocationInfo';
import { useDeviceAggregationParameters } from '../../api/hook/useDeviceAggregationParameters';
import { useDeviceHistoryParameters } from '../../api/hook/useDeviceHistoryParameters';

const DateTimeRangeType: {
  day: 'hours';
  month: 'day';
  year: 'month';
} = {
  day: 'hours',
  month: 'day',
  year: 'month',
};

const AGGREGATION_TYPE = {
  day: 1,
  month: 3,
  year: 5,
};

const dateTimeFormat = {
  hours: {
    format: 'MM/DD/YYYY HH:00',
  },
  day: {
    format: 'DD',
  },
  month: {
    format: 'MM',
  },
};

export type AreaChartDataOutput =
  | {
      isFetching: boolean;
      yAxis: { name: string; data: (string | null)[] }[];
      xAxis: string[];
    }
  | undefined;

// Dashboard - Demand
export const Demand_getAreaChartData = (START_DATETIME?: string, END_DATETIME?: string): AreaChartDataOutput => {
  const rootLocationInfo = getRootLocationInfo();
  const PARAM_NAME = 'demand';
  const INDEX = 'P';

  const chartDataArr: AreaChartDataOutput = {
    isFetching: true,
    yAxis: [
      { name: 'Selected Time', data: [] },
      { name: 'Average', data: [] },
    ],
    xAxis: [],
  };

  if (!START_DATETIME || !END_DATETIME) {
    return undefined;
  }

  let result = useDeviceHistoryParameters({
    locationId: rootLocationInfo.locationId,
    deviceId: rootLocationInfo.deviceSPBMId,
    startDate: moment.utc(START_DATETIME).valueOf().toString(),
    endDate: moment.utc(END_DATETIME).valueOf().toString(),
    paramName: PARAM_NAME,
    index: INDEX,
  });

  // xAxis and yAxis
  result['data']?.map((data) => {
    chartDataArr.xAxis.push(moment(data.measureDateMs).format('MM/DD/YY HH:mm').toString());
    const yAxisValue = data.value ? Number(data.value).toFixed(2) : null;

    chartDataArr.yAxis[0].data.push(yAxisValue);
  });

  /** Average
   * No matter what time been selected, we use last 7 days from now as average.
   * But the hour and minute of time from average and history data need to be the same.
   * Or the return data from both API would have few hours mismatch.
   */
  const startPoint = moment().set({
    hour: moment.utc(START_DATETIME).local().hour(),
    minute: moment.utc(START_DATETIME).local().minute(),
  });
  const AVG_START_DATETIME = startPoint.clone().utc().subtract('7', 'day').format('YYYY-MM-DDTHH:mm:00');
  const AVG_END_DATETIME = startPoint.utc().format('YYYY-MM-DDTHH:mm:00');

  const PERIOD = (moment(END_DATETIME).valueOf() - moment(START_DATETIME).valueOf()) / 1000;
  const INTERVAL = 900;

  const AvgData = useDeviceAggregationParameters({
    locationId: rootLocationInfo.locationId,
    deviceId: rootLocationInfo.deviceSPBMId,
    startDate: AVG_START_DATETIME,
    endDate: AVG_END_DATETIME,
    paramName: PARAM_NAME,
    period: PERIOD,
    index: INDEX,
    interval: INTERVAL,
  });

  chartDataArr.isFetching = result.isFetching || AvgData.isFetching ? true : false;

  AvgData['data']?.map((data) => {
    data.value && chartDataArr.yAxis[1].data.push(Number(data.value).toFixed(2));
  });

  chartDataArr.yAxis[1].data = checkYaxisLength(chartDataArr.yAxis);

  return chartDataArr;
};

// Dashboard - Consumption
export const Consumption_getAreaChartData = (
  START_DATETIME?: string,
  END_DATETIME?: string,
  DATE_TYPE: 'day' | 'month' | 'year' = 'day',
  SELECTED_TYPE: 'last' | 'current' = 'last',
): AreaChartDataOutput => {
  const PARAM_NAME = 'energyHourly';

  /**
   * LAST: {HOUR: HOUR, DAY:}
   *
   */
  const AGGREGATION = AGGREGATION_TYPE[DATE_TYPE];

  const dateTimeArray = getDateTimeRange(START_DATETIME, END_DATETIME, DateTimeRangeType[DATE_TYPE]);

  // FIXME: Change to formation
  // const CURRENT_ID = useUI().currentFormation;
  const CURRENT_ID = useUI().emsCurrentLocation;

  const chartDataArr: AreaChartDataOutput = {
    isFetching: true,
    yAxis: [
      { name: 'Selected Time', data: [] },
      { name: 'Average', data: [] },
    ],
    // xAxis: [],
    xAxis: dateTimeArray,
  };

  if (!START_DATETIME || !END_DATETIME) {
    return undefined;
  }

  const currentData = useDeviceHistoryParameters({
    partLocationId: CURRENT_ID,
    // startDate: moment.utc(START_DATETIME).local().format('YYYY-MM-DDTHH:mm:ss'),
    // endDate: moment.utc(END_DATETIME).local().format('YYYY-MM-DDTHH:mm:ss'),
    startDate: moment.utc(START_DATETIME).set('minute', 0).valueOf().toString(),
    endDate: moment.utc(END_DATETIME).set('minute', 0).valueOf().toString(),
    paramName: PARAM_NAME,
    aggregation: AGGREGATION,
  });

  const currentDataArray: Record<string, number | null> = {};

  currentData['data']?.forEach((data) => {
    const dateFormat = moment(data.measureDateMs).format(dateTimeFormat[DateTimeRangeType[DATE_TYPE]].format);

    const dataValue = data?.value ? Number(data.value) : null;

    if (dataValue === null) {
      currentDataArray[dateFormat] = dataValue;
      return;
    }

    if (dateFormat in currentDataArray && currentDataArray[dateFormat] !== null) {
      currentDataArray[dateFormat] = Number(currentDataArray[dateFormat]) + dataValue;
    } else currentDataArray[dateFormat] = dataValue;
  });

  // xAxis and yAxis
  Object.entries(currentDataArray).forEach(([date_time, value]) => {
    const yAxisValue: string | null = value === null ? null : value.toFixed(2);

    const index = dateTimeArray.indexOf(date_time);
    chartDataArr.yAxis[0].data[index] = yAxisValue;
  });

  /** Average
   * No matter what time been selected, we use last 30 days from now as average.
   * But the hour and minute of time from average and history data need to be the same.
   * Or the return data from both API would have few hours mismatch.
   */
  const startPoint = moment().set({
    hour: moment.utc(START_DATETIME).local().hour(),
    minute: moment.utc(START_DATETIME).local().minute(),
  });
  const AVG_START_DATETIME = startPoint.clone().utc().subtract('30', 'day').format('YYYY-MM-DDTHH:mm:00');
  const AVG_END_DATETIME = startPoint.utc().format('YYYY-MM-DDTHH:mm:00');
  // ___________________________________________________________________________________

  const PERIOD = (moment(END_DATETIME).valueOf() - moment(START_DATETIME).valueOf()) / 1000;

  const AvgData = useDeviceAggregationParameters({
    partLocationId: CURRENT_ID,
    startDate: AVG_START_DATETIME,
    endDate: AVG_END_DATETIME,
    paramName: PARAM_NAME,
    period: PERIOD,
    interval: 3600,
  });

  AvgData['data']?.map((data) => {
    data.value && chartDataArr.yAxis[1].data.push(Number(data.value).toFixed(2));
  });

  chartDataArr.isFetching = currentData.isFetching || AvgData.isFetching ? true : false;

  // FIXME: Mock predict value
  // chartDataArr.yAxis[1].data = checkYaxisLength(chartDataArr.yAxis);
  if (chartDataArr.yAxis[0].data.length < chartDataArr.yAxis[1].data.length && SELECTED_TYPE === 'last') {
    const selectedTimeLen: number = chartDataArr.yAxis[0].data.length;
    chartDataArr.yAxis[0].data.length = chartDataArr.yAxis[1].data.length;
    chartDataArr.yAxis[0].data.fill(null, selectedTimeLen);
  }

  if (SELECTED_TYPE === 'current') chartDataArr.yAxis = chartDataArr.yAxis.filter((item) => item.name !== 'Average');

  return chartDataArr;
};

const checkYaxisLength = (yAxis: { name: string; data: (string | null)[] }[]) => {
  if (yAxis[0].data.length < yAxis[1].data.length) return yAxis[1].data.slice(0, yAxis[0].data.length);

  return yAxis[1].data;
};

// Function
function getDateTimeRange(
  startDateTime: string | undefined,
  stopDateTime: string | undefined,
  type: 'hours' | 'day' | 'month',
) {
  const dateTimeArray: string[] = [];

  // convert UTC ISO string to local time
  let currentDateTime: moment.Moment = moment.utc(startDateTime).local();
  const endDateTime: moment.Moment = moment.utc(stopDateTime).local();
  while (currentDateTime < endDateTime) {
    dateTimeArray.push(moment(currentDateTime).format(dateTimeFormat[type].format).toString());
    currentDateTime = moment(currentDateTime).add(1, type);
  }
  return dateTimeArray;
}
