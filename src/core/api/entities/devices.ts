import { api } from '..';
import { DevicesInput, DevicesOutput, Device } from '../types';

export async function apiGetDevices(filter: DevicesInput): Promise<Device[]> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, DevicesOutput>(`device?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.devices ? response.devices : []));
}
