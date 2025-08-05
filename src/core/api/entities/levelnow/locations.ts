import { api } from '@core/api/index';
import { Locations } from '@core/api/types';

export async function apiGetLocations(): Promise<Locations> {
  const url = 'Locations';

  return api.get<void, Locations>(url, undefined, 'levelnow').then((response) => response);
}
