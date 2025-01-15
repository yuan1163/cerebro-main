import { queryClient } from '@app/DataAccessAdapter';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';

import {
  apiAddAssetToGroup,
  apiConnectAssetToDevice,
  apiCreateAsset,
  apiDeleteAsset,
  apiDeleteAssetFromGroup,
  apiDisconnectAssetFromDevice,
  apiGetAssets,
  apiUpdateAsset,
} from '@core/api/entities/assets';
import { Asset, AssetGroup, AssetsInput, Device, FilesInput } from '@core/api/types';

import { pack } from '@core/utils/pack';
import { AssetGroupsController } from './assetGroups';

import { apiDeleteFile, apiGetFile, apiUploadFile } from '@core/api/entities/files';

const CONTROLLER = 'assets';

class AssetsController {
  assets?: Asset[];
  removeHandler?: (user: Partial<Asset>) => void;

  static async invalidate() {
    return queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.assets;
  }

  getData(): Asset[] {
    return this.assets!;
  }

  remove(asset: Partial<Asset>) {
    this.removeHandler?.(asset);
  }

  constructor(assets?: Asset[], removeHandler?: (asset: Partial<Asset>) => void) {
    this.assets = assets;
    this.removeHandler = removeHandler;
  }
}

export const useAssets = (filter: AssetsInput) => {
  const useFilter = pack(filter);

  const { data } = useQuery([CONTROLLER, ...Object.values(useFilter)], () => apiGetAssets(useFilter), {
    enabled: !!filter.locationId,
  });

  const mtRemove = useMutation(apiDeleteAsset);
  const remove = async (item: Partial<Asset>) => {
    await mtRemove.mutateAsync(item);
    await AssetsController.invalidate();
  };

  return new AssetsController(data, remove);
};

const useAssetGroups = (asset: Partial<Asset>, groups: AssetGroup[]) => {
  const mtAddGroup = useMutation(apiAddAssetToGroup);
  const mtRemoveGroup = useMutation(apiDeleteAssetFromGroup);

  const [actions] = React.useState({
    adding: new Set<AssetGroup>(),
    removing: new Set<AssetGroup>(),
  });

  const add = (group: AssetGroup) => {
    groups.push(group);
    actions.adding.add(group);
  };

  const remove = (group: AssetGroup) => {
    const i = groups.findIndex((g) => g === group);
    groups.splice(i, 1);
    if (actions.adding.has(group)) actions.adding.delete(group);
    else actions.removing.add(group);
  };

  const update = async () => {
    const mutations: Promise<unknown>[] = [];
    for (const group of actions.removing) mutations.push(mtRemoveGroup.mutateAsync({ asset, group }));
    for (const group of actions.adding) mutations.push(mtAddGroup.mutateAsync({ asset, group }));
    await Promise.all(mutations);
    await AssetGroupsController.invalidate();
  };

  return { add, remove, update };
};

const useAssetDevices = (asset: Partial<Asset>, devices: Device[]) => {
  const mtAdd = useMutation(apiConnectAssetToDevice);
  const mtRemove = useMutation(apiDisconnectAssetFromDevice);

  const [actions] = React.useState({
    adding: new Set<Device>(),
    removing: new Set<Device>(),
  });

  const add = (device: Device) => {
    devices.push(device);
    actions.adding.add(device);
  };

  const remove = (device: Device) => {
    const i = devices.findIndex((d) => d === device);
    devices.splice(i, 1);
    if (actions.adding.has(device)) actions.adding.delete(device);
    else actions.removing.add(device);
  };

  const update = async () => {
    const mutations: Promise<unknown>[] = [];
    for (const device of actions.removing) mutations.push(mtRemove.mutateAsync({ asset, device }));
    for (const device of actions.adding) mutations.push(mtAdd.mutateAsync({ asset, device }));
    await Promise.all(mutations);
    await AssetGroupsController.invalidate();
  };

  return { add, remove, update };
};

const IMAGE_TYPE = 3;
const IMAGE_FILE_NAME = 'image';

export const useImage = (asset?: Partial<Asset>) => {
  const imageQueryKey = ['asset:image', asset?.assetId];

  const [imageFile, setImageFile] = React.useState<File | null>();

  const { data: imageFileRecord } = useQuery(
    imageQueryKey,
    () =>
      apiGetFile({
        type: IMAGE_TYPE,
        objectId: asset?.assetId?.toString(),
        name: IMAGE_FILE_NAME,
        getUrl: true,
      }),
    {
      enabled: !!asset,
    },
  );

  const mtUpload = useMutation((file: File) =>
    apiUploadFile({
      file,
      filter: {
        type: IMAGE_TYPE,
        objectId: asset?.assetId?.toString(),
        name: IMAGE_FILE_NAME,
      },
    }),
  );

  const mtDelete = useMutation((filter: FilesInput) => apiDeleteFile(filter));

  const getUrl = (): string | undefined => {
    if (imageFile) return URL.createObjectURL(imageFile);
    if (imageFile === null) return undefined;
    if (!imageFileRecord) return undefined;
    return imageFileRecord.url;
  };

  const setFile = (file: File | null) => {
    setImageFile(file);
  };

  const update = async () => {
    if (imageFile) {
      await mtUpload.mutateAsync(imageFile);
      await queryClient.invalidateQueries(imageQueryKey);
    } else if (imageFile === null) {
      await mtDelete.mutateAsync({ fileId: imageFileRecord?.fileId });
      await queryClient.invalidateQueries(imageQueryKey);
    }
  };

  return { getUrl, setFile, update };
};

export const useAsset = (asset: Partial<Asset>) => {
  const mtAdd = useMutation(apiCreateAsset);
  const mtUpdate = useMutation(apiUpdateAsset);
  const mtRemove = useMutation(apiDeleteAsset);

  if (!asset.groups) asset.groups = [];
  const groups = useAssetGroups(asset, asset.groups);
  const image = useImage(asset);
  if (!asset.devices) asset.devices = [];
  const devices = useAssetDevices(asset, asset.devices);

  // const mtImage = useMutation(apiUploadFile);

  const add = async (data: Partial<Asset>) => {
    const { assetId } = await mtAdd.mutateAsync(data);
    asset.assetId = assetId;

    await groups.update();
    await image.update();
    await devices.update();

    await AssetsController.invalidate();
  };

  const update = async (data: Partial<Asset>) => {
    await mtUpdate.mutateAsync({ asset, data });

    await groups.update();
    await image.update();
    await devices.update();

    await AssetsController.invalidate();
  };

  const remove = async () => {
    await groups.update();
    await mtRemove.mutateAsync(asset);
    await AssetsController.invalidate();
  };

  return {
    add,
    update,
    remove,
    addGroup: groups.add,
    removeGroup: groups.remove,
    getImage: image.getUrl,
    setImage: image.setFile,
    clearImage: () => image.setFile(null),
    addDevice: devices.add,
    removeDevice: devices.remove,
  };
};
