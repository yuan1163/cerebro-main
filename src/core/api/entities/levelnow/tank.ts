import { api } from '@core/api/index';
import { TankList } from '@core/api/types';

export async function apiGetTanks(): Promise<TankList> {
  const url = 'Tank/list';

  return api.get<void, TankList>(url, undefined, 'levelnow').then((response) => response);
}
