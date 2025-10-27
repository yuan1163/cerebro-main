import { AlertsTotal } from '@core/api/types';

export const formatTotals = (totals: AlertsTotal[]) => {
  const xs = new Set<number>();
  const types = new Set<number>();
  const values = new Map<string, number>();
  for (let item of totals) {
    xs.add(item.startDateMs);
    types.add(item.deviceType);
    values.set(`${item.startDateMs}:${item.deviceType}`, item.total);
  }

  const xAxisValues = Array.from(xs).sort();
  const yAxisValues = [];
  for (let type of types) {
    yAxisValues.push({
      deviceType: type,
      data: xAxisValues.map((xValue) => values.get(`${xValue}:${type}`) || 0),
    });
  }

  return {
    yAxisValues,
    xAxisValues,
  };
};
