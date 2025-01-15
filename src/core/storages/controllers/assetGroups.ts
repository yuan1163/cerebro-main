import React from 'react';

import {
  apiGetAssetGroups,
  apiCreateAssetGroup,
  apiUpdateAssetGroup,
  apiDeleteAssetGroup,
} from '@core/api/entities/assetGroups';
import { AssetGroupsInput, AssetGroup } from '@core/api/types';

import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@app/DataAccessAdapter';
import { pack } from '@core/utils/pack';
import { apiGetAssets } from '@core/api/entities/assets';

const CONTROLLER = 'assetGroups';

export class AssetGroupsController {
  groups?: AssetGroup[];
  removeHandler?: (asset: Partial<AssetGroup>) => void;

  static async invalidate() {
    return queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.groups;
  }

  getData(): AssetGroup[] {
    return this.groups!;
  }

  remove(group: Partial<AssetGroup>) {
    this.removeHandler?.(group);
  }

  constructor(assets?: AssetGroup[], removeHandler?: (group: Partial<AssetGroup>) => void) {
    this.groups = assets;
    this.removeHandler = removeHandler;
  }
}

export const useAssetGroups = (filter: AssetGroupsInput) => {
  const useFilter = pack(filter);

  const { data } = useQuery([CONTROLLER, ...Object.values(useFilter)], () => apiGetAssetGroups(useFilter), {
    enabled: !!filter.locationId,
  });

  const mtRemove = useMutation(apiDeleteAssetGroup);
  const remove = async (item: Partial<AssetGroup>) => {
    await mtRemove.mutateAsync(item);
    await AssetGroupsController.invalidate();
  };

  return new AssetGroupsController(data, remove);
};

export const useAssetGroup = (group: Partial<AssetGroup>) => {
  const mtAdd = useMutation(apiCreateAssetGroup);
  const mtUpdate = useMutation(apiUpdateAssetGroup);
  const mtRemove = useMutation(apiDeleteAssetGroup);

  const add = async (data: Partial<AssetGroup>) => {
    await mtAdd.mutateAsync({ ...group, ...data });
    await AssetGroupsController.invalidate();
  };
  const update = async (data: Partial<AssetGroup>) => {
    await mtUpdate.mutateAsync({ ...group, ...data });
    await AssetGroupsController.invalidate();
  };
  const remove = async () => {
    await mtRemove.mutateAsync({ ...group });
    await AssetGroupsController.invalidate();
  };

  const filter = { locationId: group.locationId, groupId: group.groupId, fileName: 'image' };
  const { data: assets } = useQuery(['assets', 'members', filter], () => apiGetAssets(filter), {
    enabled: !!group.groupId,
  });
  const getAssets = () => {
    return assets;
  };

  return { add, update, remove, getAssets };
};
