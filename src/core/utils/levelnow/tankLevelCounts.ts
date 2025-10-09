import { TankLevelCounts, TankListItem } from '@core/api/types';

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
