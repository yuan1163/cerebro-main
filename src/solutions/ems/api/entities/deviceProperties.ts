/** [2023-05-09]
 * API route to get device properties
 *
 * Return device properties by the device's location ID or the part's location ID.
 */

import { api } from '@core/api';
import { ResultOutput } from '@core/api/types';

export type DevicePropertiesInput = Record<string, any> &
  Partial<{
    deviceId?: string | null;
    locationId?: number | null;
  }>;

export type Properties = {
  name?: string;
  value?: string;
};

export type DevicePropertiesOutput = ResultOutput & {
  properties: Properties[];
};

export async function apiGetDeviceProperties(filter: DevicePropertiesInput): Promise<Properties[]> {
  const query = new URLSearchParams(filter);
  console.log('Calling apiGetDeviceProperties with query:', query.toString()); 
  return api
    .get<void, DevicePropertiesOutput>(`deviceProperties?${query}`)
    .then(api.checkResulCode)
    .then((response) => {
      console.log('Received response from apiGetDeviceProperties:', response); 
      return response.properties ? response.properties : [];
    });
}
