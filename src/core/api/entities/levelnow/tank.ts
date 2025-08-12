import { api } from '@core/api/index';
import { ApiResponse, Tank, TankList } from '@core/api/types';
import { de } from '@nodemodules/zod/v4/locales/index.cjs';

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

export async function apiUpdateTank(
  tankId: number,
  data: Partial<{
    tankNo: string;
    deviceDescription: string;
    deviceOilType: string;
    deviceOilViscosity: string;
  }>,
): Promise<ApiResponse> {
  const url = `Tank/${tankId.toString()}`;

  return api.put<typeof data, ApiResponse>(url, data, 'levelnow').then((response) => response);
}

export async function apiDeleteTank(tankId: number): Promise<ApiResponse> {
  const url = `Tank/${tankId.toString()}`;

  return api.delete<void, ApiResponse>(url, undefined, 'levelnow').then((response) => response);
}

export async function apiAddTank(deviceReference: string): Promise<ApiResponse> {
  if (!deviceReference) {
    throw new Error('Device Reference is required to add a tank');
  }
  const url = `Tank/${deviceReference}`;
  return api.post<void, ApiResponse>(url, undefined, 'levelnow').then((response) => response);
}
