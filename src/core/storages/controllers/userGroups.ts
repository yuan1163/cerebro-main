import React from 'react';

import {
  apiGetUserGroups,
  apiCreateUserGroup,
  apiUpdateUserGroup,
  apiDeleteUserGroup,
  apiGetUserGroupMembers,
} from '@core/api/entities/userGroups';
import { UserGroupsInput, UserGroup } from '@core/api/types';

import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@app/DataAccessAdapter';
import { pack } from '@core/utils/pack';

import { apiGetUsers } from '@core/api/entities/users';

const CONTROLLER = 'UserGroups';

export class UserGroupsController {
  groups?: UserGroup[];
  removeHandler?: (group: Partial<UserGroup>) => void;

  static async invalidate() {
    return queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.groups;
  }

  getData(): UserGroup[] {
    return this.groups!;
  }

  remove(group: Partial<UserGroup>) {
    this.removeHandler?.(group);
  }

  constructor(groups?: UserGroup[], removeHandler?: (group: Partial<UserGroup>) => void) {
    this.groups = groups;
    this.removeHandler = removeHandler;
  }
}

export const useUserGroups = (filter: UserGroupsInput) => {
  const useFilter = pack(filter);

  const { data } = useQuery([CONTROLLER, ...Object.values(useFilter)], () => apiGetUserGroups(useFilter), {
    enabled: !!filter.locationId,
  });

  const mtRemove = useMutation(apiDeleteUserGroup);
  const remove = async (group: Partial<UserGroup>) => {
    await mtRemove.mutateAsync(group);
    await UserGroupsController.invalidate();
  };

  return new UserGroupsController(data, remove);
};

export const useUserGroup = (group: Partial<UserGroup>) => {
  const mtAdd = useMutation(apiCreateUserGroup);
  const mtUpdate = useMutation(apiUpdateUserGroup);
  const mtRemove = useMutation(apiDeleteUserGroup);

  const add = async (data: Partial<UserGroup>) => {
    await mtAdd.mutateAsync({ ...group, ...data });
    await UserGroupsController.invalidate();
  };
  const update = async (data: Partial<UserGroup>) => {
    await mtUpdate.mutateAsync({ ...group, ...data });
    await UserGroupsController.invalidate();
  };
  const remove = async () => {
    await mtRemove.mutateAsync({ ...group });
    await UserGroupsController.invalidate();
  };

  const { data: users } = useQuery(['Users', 'members', group.groupId], () => apiGetUserGroupMembers(group.groupId), {
    enabled: !!group.groupId,
  });
  const getMembers = () => {
    return users;
  };

  return { add, update, remove, getMembers };
};
