import { api } from '..';
import { AssetGroupsInput, AssetGroupsOutput, AssetGroup, ResultOutput } from '../types';

export async function apiGetAssetGroups(filter: AssetGroupsInput): Promise<AssetGroup[]> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, AssetGroupsOutput>(`assetGroup?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.groups ? response.groups : []));
}

export async function apiCreateAssetGroup(data: Partial<AssetGroup>): Promise<unknown> {
  return api
    .post<{ group: Partial<AssetGroup> }, ResultOutput>(`assetGroup?locationId=${data.locationId}`, { group: data })
    .then(api.checkResulCode);
}

export async function apiUpdateAssetGroup(data: Partial<AssetGroup>): Promise<unknown> {
  return api
    .put<{ group: Partial<AssetGroup> }, ResultOutput>(
      `assetGroup?locationId=${data.locationId}&groupId=${data.groupId}`,
      { group: data },
    )
    .then(api.checkResulCode);
}

export async function apiDeleteAssetGroup(data: Partial<AssetGroup>): Promise<unknown> {
  return api
    .delete<void, ResultOutput>(`assetGroup?locationId=${data.locationId}&groupId=${data.groupId}`)
    .then(api.checkResulCode);
}
