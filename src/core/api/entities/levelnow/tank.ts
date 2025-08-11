import { api } from '@core/api/index';
import { Tank, TankList } from '@core/api/types';

export async function apiGetTanks(): Promise<TankList> {
  const url = 'Tank/list';

  return api.get<void, TankList>(url, undefined, 'levelnow').then((response) => response);
}
export async function apiGetTank(tankId: number | null): Promise<Tank> {
  if (!tankId) {
    throw new Error('Tank ID is required to fetch tank details');
  }

  const url = `Tank/${tankId.toString()}`;

  return api.get<void, Tank>(url, undefined, 'levelnow').then((response) => response);
}
