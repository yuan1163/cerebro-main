import React from 'react';

import { apiGetUserProperities, apiUpdateUserProperities } from '@core/api/entities/userProperities';
import { UserProperities, UserProperitiesInput } from '@core/api/types';

import { UserGroup, UserGroupsInput } from '@core/api/types';

import { queryClient } from '@app/DataAccessAdapter';
import { pack } from '@core/utils/pack';
import { useMutation, useQuery } from '@tanstack/react-query';

const CONTROLLER = 'UserProperities';

export class UserProperitiesController {
  properities?: UserProperities[];

  static async invalidate() {
    return queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.properities;
  }

  getData(): UserProperities[] {
    return this.properities!;
  }

  constructor(properities?: UserProperities[]) {
    this.properities = properities;
  }
}

export const useUserProperities = (filter: UserProperitiesInput) => {
  const useFilter = pack(filter);

  const { data } = useQuery([CONTROLLER, ...Object.values(useFilter)], () => apiGetUserProperities(useFilter));

  return new UserProperitiesController(data);
};

export const useUserProperty = (properities: Partial<UserProperities> | undefined) => {
  const mtUpdate = useMutation(apiUpdateUserProperities);

  const update = async (data: Partial<UserProperities>) => {
    await mtUpdate.mutateAsync({ ...properities, ...data });
    await UserProperitiesController.invalidate();
  };

  return { update };
};
