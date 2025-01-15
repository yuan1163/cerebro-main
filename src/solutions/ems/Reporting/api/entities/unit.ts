import { api } from '@core/api';
import { ResultOutput } from '@core/api/types';
import { Process } from '../../data/process';
import { Unit, UnitInput, UnitOutput, UnitProcess } from '../../data/unit';

export async function apiGetUnit(filter: UnitInput): Promise<Unit[] | []> {
  const query = new URLSearchParams(filter);

  return api
    .get<void, UnitOutput>(`unit?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.units ? response.units : []));
}

export async function apiCreateUnit(data: Partial<Unit>): Promise<{ unitId: number }> {
  return api
    .post<{ unit: Partial<Unit> }, ResultOutput & { unitId: number }>(`unit?locationId=${data.locationId}`, {
      unit: { ...data },
    })
    .then(api.checkResulCode);
}

export async function apiCreateUnitProcess(data: Partial<UnitProcess>): Promise<unknown> {
  return api
    .put<void, ResultOutput>(
      `unitProcess?locationId=${data.locationId}&processId=${data.processId}&unitId=${data.unitId}`,
    )
    .then(api.checkResulCode);
}

export async function apiUpdateUnit(data: Partial<Unit>): Promise<unknown> {
  return api
    .put<{ unit: Partial<Unit> }, ResultOutput>(`unit?locationId=${data.locationId}&unitId=${data.unitId}`, {
      unit: { name: data.name },
    })
    .then(api.checkResulCode);
}

export async function apiDeleteUnit(data: Partial<Unit>): Promise<unknown> {
  return api
    .delete<void, ResultOutput>(`unit?locationId=${data.locationId}&unitId=${data.unitId}`)
    .then(api.checkResulCode);
}

export async function apiDeleteUnitProcess(data: Partial<UnitProcess>): Promise<unknown> {
  return api
    .delete<void, ResultOutput>(
      `unitProcess?locationId=${data.locationId}&processId=${data.processId}&unitId=${data.unitId}`,
    )
    .then(api.checkResulCode);
}
