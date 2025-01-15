import { api } from '..';
import {
  DevicesInput,
  DevicesOutput,
  Device,
  DeviceInput,
  DeviceParametersOutput,
  DeviceParameter,
  DeviceCommandInput,
  DeviceCommandData,
} from '../types';

export async function apiGetDeviceItems(filter: DevicesInput): Promise<Device[]> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, DevicesOutput>(`device?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.devices ? response.devices : []));
}

export async function apiGetDeviceParameters(filter: DeviceInput): Promise<DeviceParameter[]> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, DeviceParametersOutput>(`deviceParams?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.parameters ? response.parameters : []));
}

export async function apiPostDeviceCommand(
  filter: DeviceCommandInput,
  data: DeviceCommandData,
): Promise<DeviceParameter[]> {
  const query = new URLSearchParams(filter);
  return api
    .post<DeviceCommandData, DeviceParametersOutput>(`deviceCommand?${query}`, data)
    .then(api.checkResulCode)
    .then((response) => (response.parameters ? response.parameters : []));
}
