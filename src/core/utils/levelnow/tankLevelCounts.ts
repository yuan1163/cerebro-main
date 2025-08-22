import { PieChartData, TankLevelCounts, TankListItem } from '@core/api/types';

// Type guard to check if data is TankLevelCounts
const isTankLevelCounts = (data: TankLevelCounts | TankListItem[]): data is TankLevelCounts => {
  return Array.isArray(data) && data.length > 0 && 'range' in data[0] && 'count' in data[0];
};

// Type guard to check if data is TankListItem[]
const isTankListItems = (data: TankLevelCounts | TankListItem[]): data is TankListItem[] => {
  return Array.isArray(data) && data.length > 0 && 'tankId' in data[0];
};

export const formatTankLevelCounts = (tankData: TankLevelCounts | TankListItem[]) => {
  let levelHighCounts = 0;
  let levelMediumCounts = 0;
  let levelLowCounts = 0;

  if (isTankLevelCounts(tankData)) {
    // Handle TankLevelCounts type
    levelHighCounts = tankData
      .filter((item) => item.range === '>205L' || item.range === 'Full')
      .reduce((sum, item) => sum + item.count, 0);
    levelMediumCounts = tankData.find((item) => item.range === '100~205L')?.count || 0;
    levelLowCounts = tankData.find((item) => item.range === '<100L')?.count || 0;
  } else if (isTankListItems(tankData)) {
    // Handle TankListItem[] type - count devices by their level labels
    levelHighCounts = tankData.filter((item) => item.deviceLevel >= 3).length;
    levelMediumCounts = tankData.filter((item) => item.deviceLevel === 1).length;
    levelLowCounts = tankData.filter((item) => item.deviceLevel === 0).length;
  }

  const data = [
    { range: '>205L', value: levelHighCounts, color: '#2CD232' },
    { range: '100~205L', value: levelMediumCounts, color: '#FF982F' },
    { range: '<100L', value: levelLowCounts, color: '#FF4545' },
  ];

  return data;
};

export const getTankGatewayRatio = (tankListItem: TankListItem[]): PieChartData => {
  const total = tankListItem.length;
  const onlineAmounts = tankListItem.filter((item) => item.deviceConnection === 1).length;
  const offlineAmounts = total - onlineAmounts;
  const onlineRatio = parseFloat(((onlineAmounts / total) * 100).toFixed(1));
  const offlineRatio = parseFloat(((offlineAmounts / total) * 100).toFixed(1));

  const data: PieChartData = [
    { range: 'On-line', value: onlineRatio, color: '#00AAF3' },
    { range: 'Off-line', value: offlineRatio, color: '#FFC9C9' },
  ];
  return data;
};

export const getTankBatteryRatio = (tankListItem: TankListItem[]): PieChartData => {
  const total = tankListItem.length;
  const lowAmounts = tankListItem.filter((item) => item.deviceBattery === 1).length;
  const highAmounts = total - lowAmounts;
  const lowRatio = parseFloat(((lowAmounts / total) * 100).toFixed(1));
  const highRatio = parseFloat(((highAmounts / total) * 100).toFixed(1));

  const data: PieChartData = [
    { range: 'High', value: highRatio, color: '#00AAF3' },
    { range: 'Low', value: lowRatio, color: '#FFC9C9' },
  ];
  return data;
};

export const getTankErorRatio = (tankListItem: TankListItem[]): PieChartData => {
  const total = tankListItem.length;
  const errorAmounts = tankListItem.filter((item) => item.deviceFault === 1).length;
  const noErrorAmounts = total - errorAmounts;
  const errorRatio = parseFloat(((errorAmounts / total) * 100).toFixed(1));
  const noErrorRatio = parseFloat(((noErrorAmounts / total) * 100).toFixed(1));

  const data: PieChartData = [
    { range: 'OK', value: noErrorRatio, color: '#00AAF3' },
    { range: 'Sensor Error', value: errorRatio, color: '#FFC9C9' },
  ];
  return data;
};
