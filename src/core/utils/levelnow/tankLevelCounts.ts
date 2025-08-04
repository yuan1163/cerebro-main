import { TankLevelCounts } from '@core/api/types';

export const formatTankLevelCounts = (tankLevelCounts: TankLevelCounts) => {
  const levelHighCounts =
    tankLevelCounts
      ?.filter((item) => item.range === '>205L' || item.range === 'Full')
      .reduce((sum, item) => sum + item.count, 0) || 0;
  const levelMediumCounts = tankLevelCounts?.find((item) => item.range === '100~205L')?.count || 0;
  const levelLowCounts = tankLevelCounts?.find((item) => item.range === '<100L')?.count || 0;

  const data = [
    { range: '>205L', value: levelHighCounts, color: '#2CD232' },
    { range: '100~205L', value: levelMediumCounts, color: '#FF982F' },
    { range: '<100L', value: levelLowCounts, color: '#FF4545' },
  ];

  return data;
};
