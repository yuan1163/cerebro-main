import { api } from '..';
import { Asset, AssetGroup, AssetsInput, AssetsOutput, Device, DevicesInput, ResultOutput } from '../types';

export async function apiGetAssets(filter: AssetsInput): Promise<Asset[]> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, AssetsOutput>(`asset?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.assets ? response.assets : []))
    .then((assets) => {
      assets.forEach((asset) => (asset.locationId = asset.location.locationId));
      return assets;
    });
}

const clean: Partial<Asset> = {
  assetId: undefined,
  groups: undefined,
  location: undefined,
  devices: undefined,
};

export async function apiCreateAsset(data: Partial<Asset>): Promise<{ assetId: number }> {
  return api
    .post<{ asset: Partial<Asset> }, ResultOutput & { assetId: number }>(`asset?locationId=${data.locationId}`, {
      asset: { ...data, ...clean },
    })
    .then(api.checkResulCode);
}

export async function apiUpdateAsset({
  asset,
  data,
}: {
  asset: Partial<Asset>;
  data: Partial<Asset>;
}): Promise<unknown> {
  return api
    .put<{ asset: Partial<Asset> }, ResultOutput>(`asset?locationId=${asset.locationId}&assetId=${asset.assetId}`, {
      asset: { ...data, ...clean },
    })
    .then(api.checkResulCode);
}

export async function apiDeleteAsset(data: Partial<Asset>): Promise<unknown> {
  return api
    .delete<void, ResultOutput>(`asset?locationId=${data.locationId}&assetId=${data.assetId}`)
    .then(api.checkResulCode);
}

export async function apiAddAssetToGroup({
  asset,
  group,
}: {
  asset: Partial<Asset>;
  group: AssetGroup;
}): Promise<unknown> {
  return api
    .put<void, ResultOutput>(
      `assetGroupMember?locationId=${asset.locationId}&assetId=${asset.assetId}&groupId=${group.groupId}`,
    )
    .then(api.checkResulCode);
}

export async function apiDeleteAssetFromGroup({
  asset,
  group,
}: {
  asset: Partial<Asset>;
  group: AssetGroup;
}): Promise<unknown> {
  return api
    .delete<void, ResultOutput>(
      `assetGroupMember?locationId=${asset.locationId}&assetId=${asset.assetId}&groupId=${group.groupId}`,
    )
    .then(api.checkResulCode);
}

export async function apiConnectAssetToDevice({
  asset,
  device,
}: {
  asset: Partial<Asset>;
  device: Device;
}): Promise<unknown> {
  return api
    .put<DevicesInput, ResultOutput>(`device?locationId=${device.ownerLocationId}`, {
      device: {
        assetId: asset.assetId,
        deviceId: device.deviceId,
      },
    })
    .then(api.checkResulCode);
}

export async function apiDisconnectAssetFromDevice({
  asset,
  device,
}: {
  asset: Partial<Asset>;
  device: Device;
}): Promise<unknown> {
  return api
    .put<DevicesInput, ResultOutput>(`device?locationId=${asset.locationId}`, {
      device: {
        assetId: 0,
        deviceId: device.deviceId,
      },
    })
    .then(api.checkResulCode);
}
