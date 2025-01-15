/** [2023-03-15]
 * API route to get device parts
 *
 * Return device parts mapping by the device's location ID or the part's location ID.
 */

import { api } from '@core/api';
import { ResultOutput } from '@core/api/types';

export type DevicePartsInput = Record<string, any> &
  Partial<{
    locationId?: number | null;
    partLocationId?: number | null;
    deviceId?: string | null;
    startDate?: string | null;
    endDate?: string | null;
  }>;

export type DeviceParts = {
  deviceId?: string;
  ownerLocationId?: number;
  index?: string | null;
  partLocationId?: number;
  startDate?: string | null;
  startDateMs?: number | null;
  endDate?: string | null;
  endDateMs?: number | null;
  description?: string;
};

export type DevicePartsOutput = ResultOutput & {
  parts: DeviceParts[];
};

export async function apiGetDeviceParts(filter: DevicePartsInput): Promise<DeviceParts[]> {
  const query = new URLSearchParams(filter);

  return api
    .get<void, DevicePartsOutput>(`deviceParts?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.parts ? response.parts : []));
}
