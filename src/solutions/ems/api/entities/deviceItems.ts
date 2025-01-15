/** [2023-03-02]
 * API route to get latest device parameters
 *
 * Backend add an optional parameter "paramName" as parameter filter, mutiple values is also supported [since 2023-02-15].
 * Defind its function and type in the same file before further assignment.
 */

/** Updated [2023-03-13]
 * Get device parameter from parts mapping [since 2023-03-13].
 *
 * add an optional parameter "partLocationId".
 * change require to ooptional for parameter  "locationId" and "deviceId".
 * add deviceId, ownerLocationId, partLocationId, updateDate and updateDateMs in response
 */

import { api } from '@core/api';
import { ResultOutput } from '@core/api/types';

export type DeviceInput = Record<string, any> &
  Partial<{
    locationId?: number | null;
    partLocationId?: number | number[] | null;
    deviceId?: string | null;
    paramName?: string | string[] | null;
  }>;

export type DeviceParameter = {
  deviceId?: string | null;
  ownerLocationId?: number | null;
  partLocationId?: number | null;
  name?: string | null;
  index?: string | null;
  value?: string | null;
  updateDate?: string | null;
  updateDateMs?: number | null;
};

export type DeviceParametersOutput = ResultOutput & {
  parameters: DeviceParameter[];
};

export async function apiGetDeviceParameters(filter: DeviceInput): Promise<DeviceParameter[]> {
  const query = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    // append mutiple paramName to query
    if (value instanceof Array) {
      value.forEach((v) => {
        query.append(key, v);
      });
      // remove undefined
    } else if (value) {
      query.append(key, value);
    }
  });
  return api
    .get<void, DeviceParametersOutput>(`deviceParams?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.parameters ? response.parameters : []));
}

export type DeviceHistoryInput = Record<string, any> &
  Partial<{
    locationId?: number | null;
    deviceId?: string | null;
    startDate: string | null;
    endDate: string | null;
    paramName?: string | null;
    index?: string | null;
    partLocationId?: number;
  }>;

export type DeviceHistoryParameter = {
  deviceId?: string | null;
  ownerLocationId?: number | null;
  partLocationId?: number | null;
  name?: string | null;
  index?: string | null;
  value?: string | null;
  measureDate?: string | null;
  measureDateMs?: number | null;
};

export type DeviceParametersHistoryOutput = ResultOutput & {
  parameters: DeviceHistoryParameter[];
};

export async function apiGetDeviceParametersHistory(filter: DeviceHistoryInput): Promise<DeviceHistoryParameter[]> {
  const query = new URLSearchParams(filter);

  return api
    .get<void, DeviceParametersHistoryOutput>(`deviceParamsHistory?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.parameters ? response.parameters : []));
}

export type DeviceAggregationInput = Record<string, any> &
  Partial<{
    locationId?: number | null;
    deviceId?: string | null;
    startDate: string | null;
    endDate: string | null;
    paramName?: string | null;
    index?: string | null;
    partLocationId?: number;
    period: number;
    interval: number;
  }>;

export type DeviceAggergationParameter = {
  name?: string | null;
  index?: string | null;
  value?: string | null;
  time?: number | null;
};

export type DeviceParametersAggergationOutput = ResultOutput & {
  parameters: DeviceAggergationParameter[];
};

export async function apiGetDeviceParametersAggregation(
  filter: DeviceAggregationInput,
): Promise<DeviceAggergationParameter[]> {
  const query = new URLSearchParams(filter);

  return api
    .get<void, DeviceParametersAggergationOutput>(`deviceParamsAggregation?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.parameters ? response.parameters : []));
}
