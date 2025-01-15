/** [2023-03-01]
 * API route to get location properties
 *
 * It seems not exit in core and we create it inside solution ems.
 * Defind its function and type in the same file before further assignment.
 */

import { api } from '@core/api';
import { ResultOutput } from '@core/api/types';

export type Properties = {
  locationId: number;
  name: string;
  value: string;
};
export type PropertiesOutput = ResultOutput & {
  properties: Properties[];
};
export type LocationProperteInput = Record<string, any> &
  Partial<{
    locationId: number;
  }>;
export type UpdateLocationProperteInput = {
  properties: Partial<Properties>[];
};

export async function apiGetLocationProperties(filter: LocationProperteInput): Promise<Properties[]> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, PropertiesOutput>(`locationProperties?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.properties ? response.properties : []));
}

export async function apiUpdateLocationProperties({
  locationId,
  data,
}: {
  locationId?: number;
  data: Partial<Properties>;
}): Promise<unknown> {
  return api
    .post<{ properties: Partial<Properties>[] }, ResultOutput>(`locationProperties?locationId=${locationId}`, {
      properties: [data],
    })
    .then(api.checkResulCode);
}
