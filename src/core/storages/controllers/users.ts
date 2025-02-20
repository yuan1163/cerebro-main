import React, { useEffect } from 'react';

import { FilesInput, Location, User, UserGroup, UserRole, UsersInput } from '@core/api/types';

import {
  apiAddUserToLocation,
  apiCreateUser,
  apiDeleteUser,
  apiDeleteUserFromLocation,
  apiGetUsers,
  apiGrantUserRole,
  apiRequestNewPassword,
  apiRevokeUserRole,
  apiUpdateUser,
} from '@core/api/entities/users';

import { apiDeleteFile, apiGetFile, apiUploadFile } from '@core/api/entities/files';

import { queryClient } from '@app/DataAccessAdapter';
import { useMutation, useQuery } from '@tanstack/react-query';

import { apiAddUserGroupMembers, apiDeleteUserGroupMembers } from '@core/api/entities/userGroups';
import { pack } from '@core/utils/pack';
import { useLocations } from './locations';
import { UserGroupsController } from './userGroups';

import { t } from '@core/utils/translate';

const CONTROLLER = 'users';

class UsersController {
  users?: User[];
  removeHandler?: (user: Partial<User>) => void;

  static async invalidate() {
    return queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.users;
  }

  getData(): User[] {
    return this.users!;
  }

  remove(user: Partial<User>) {
    this.removeHandler?.(user);
  }

  updateUserFileUrl(userId: number, url: string) {
    const user = this.users?.find((u) => u.userId === userId);
    if (user && user.files && user.files.length) {
      user.files[0].url = url;
    }
  }

  constructor(users?: User[], removeHandler?: (user: Partial<User>) => void) {
    this.users = users;
    this.removeHandler = removeHandler;
  }
}

export const useUsers = (filter: UsersInput) => {
  const useFilter = pack(filter);

  const { data } = useQuery([CONTROLLER, ...Object.values(useFilter)], () => apiGetUsers(useFilter), {
    enabled: !!filter.locationId,
  });

  const mtRemove = useMutation(apiDeleteUser);
  const remove = async (item: Partial<User>) => {
    await mtRemove.mutateAsync(item);
    await UsersController.invalidate();
  };

  return new UsersController(data, remove);
};

const useUserLocations = (user: Partial<User>, locations: Location[]) => {
  const mtAddToLocation = useMutation(apiAddUserToLocation);
  const mtRemoveFromLocation = useMutation(apiDeleteUserFromLocation);

  const [actions] = React.useState({
    adding: new Set<Location>(),
    removing: new Set<Location>(),
  });

  const add = (location: Location) => {
    locations.push(location);
    actions.adding.add(location);
  };

  const remove = (location: Location) => {
    const i = locations.findIndex((l) => l === location);
    locations.splice(i, 1);
    if (actions.adding.has(location)) actions.adding.delete(location);
    else actions.removing.add(location);
  };

  const update = async () => {
    const mutations: Promise<unknown>[] = [];
    for (const location of actions.removing) mutations.push(mtRemoveFromLocation.mutateAsync({ user, location }));
    for (const location of actions.adding) mutations.push(mtAddToLocation.mutateAsync({ user, location }));
    await Promise.all(mutations);
  };

  return { add, remove, update };
};

const useUserRole = (user: Partial<User>) => {
  const mtGrantRole = useMutation(apiGrantUserRole);
  const mtRevokeRole = useMutation(apiRevokeUserRole);

  const [role, setRole] = React.useState<UserRole | undefined>(user.role);

  const grant = (role?: UserRole) => {
    setRole(role);
  };

  const revoke = (role: UserRole) => {
    setRole(undefined);
  };

  const update = async () => {
    if (role) await mtGrantRole.mutateAsync({ user, role });
    else await mtRevokeRole.mutateAsync({ user });
  };

  return { grant, revoke, update };
};

const useUserGroups = (user: Partial<User>, groups: UserGroup[]) => {
  const mtAddGroup = useMutation(apiAddUserGroupMembers);
  const mtRemoveGroup = useMutation(apiDeleteUserGroupMembers);

  const [actions] = React.useState({
    adding: new Set<UserGroup>(),
    removing: new Set<UserGroup>(),
  });

  const add = (group: UserGroup) => {
    groups.push(group);
    actions.adding.add(group);
  };

  const remove = (group: UserGroup) => {
    const i = groups.findIndex((r) => r === group);
    groups.splice(i, 1);
    if (actions.adding.has(group)) actions.adding.delete(group);
    else actions.removing.add(group);
  };

  const update = async () => {
    const mutations: Promise<unknown>[] = [];
    for (const group of actions.removing) mutations.push(mtRemoveGroup.mutateAsync({ user, group }));
    for (const group of actions.adding) mutations.push(mtAddGroup.mutateAsync({ user, group }));
    await Promise.all(mutations);
  };

  return { groups, add, remove, update };
};

const IMAGE_TYPE = 4;
const IMAGE_FILE_NAME = 'avatar';

export const useAvatar = (user?: Partial<User>) => {
  const [userId, setUserId] = React.useState<number | undefined>(user?.userId);

  const imageQueryKey = ['user:avatar', userId];

  const [imageFile, setImageFile] = React.useState<File | null>();

  const { data: imageFileRecord } = useQuery(
    imageQueryKey,
    () =>
      apiGetFile({
        type: IMAGE_TYPE,
        objectId: userId?.toString(),
        name: IMAGE_FILE_NAME,
        getUrl: true,
      }),
    {
      enabled: !!userId,
    },
  );

  const mtUpload = useMutation((file: File) => 
    apiUploadFile({
      file,
      filter: {
        type: IMAGE_TYPE,
        objectId: userId?.toString(),
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
    } else if (imageFile === null && imageFileRecord) {
      await mtDelete.mutateAsync({ fileId: imageFileRecord.fileId });
      await queryClient.invalidateQueries(imageQueryKey);
    }
  };

  return { getUrl, setFile, update, setUserId };
};

export const useUser = (user: Partial<User>) => {
  const locations = useLocations();

  const mtAdd = useMutation(apiCreateUser);
  const mtUpdate = useMutation(apiUpdateUser);
  const mtRemove = useMutation(apiDeleteUser);

  if (!user.locationIds) user.locationIds = [];
  const [userLocationsData] = React.useState(user.locationIds?.map((id) => locations.getElementById(id)!));
  const userLocations = useUserLocations(user, userLocationsData);

  const userRole = useUserRole(user);

  if (!user.groups) user.groups = [];
  const groups = useUserGroups(user, user.groups);

  const avatar = useAvatar(user);
  
  const add = async (data: Partial<User>) => {
    
    // 新增用戶、取得 userId
    const { userId } = await mtAdd.mutateAsync(data);
    
    user.userId = userId;
    avatar.setUserId(userId); // 更新 userId

    await userLocations.update();
    await userRole.update();
    await groups.update();
    await avatar.update();

    await UsersController.invalidate();
  };

  const clean: Partial<User> = {
    emailStatus: undefined,
    creationDate: undefined,
    creationDateMs: undefined,
    lastLoginDate: undefined,
    lastLoginDateMs: undefined,
    permissions: undefined,
    role: undefined,
    locationIds: undefined,
    smsStatus: undefined,
    files: undefined,
    groups: undefined,
  };

  const update = async (data: Partial<User>) => {
    await mtUpdate.mutateAsync({
      user,
      data: { ...data, ...clean },
    });

    await userLocations.update();
    await userRole.update();
    await groups.update();
    await avatar.update();

    await UsersController.invalidate();
  };

  const remove = async () => {
    await mtRemove.mutateAsync(user);
    await UsersController.invalidate();
  };

  // @ts-ignore
  const requestNewPassword = async (email) => {
    const res = await apiRequestNewPassword(email);
    // @ts-ignore
    user.password = res.data.defaultPassword;

    return `${user.password}`
  };

  return {
    add,
    update,
    remove,
    locations: userLocationsData,
    addLocation: userLocations.add,
    removeLocation: userLocations.remove,
    grantRole: userRole.grant,
    revokeRole: userRole.revoke,
    getAvatar: avatar.getUrl,
    setAvatar: avatar.setFile,
    clearAvatar: () => avatar.setFile(null),
    groups: groups.groups,
    addGroup: groups.add,
    removeGroup: groups.remove,
    requestNewPassword,
  };
};
