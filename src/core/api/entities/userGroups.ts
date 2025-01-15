import { api } from '..';
import { UserGroupsInput, UserGroupsOutput, UserGroup, ResultOutput, User, UsersOutput } from '../types';

export async function apiGetUserGroups(filter: UserGroupsInput): Promise<UserGroup[]> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, UserGroupsOutput>(`userGroup?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.groups ? response.groups : []));
}

export async function apiCreateUserGroup(data: Partial<UserGroup>): Promise<unknown> {
  return api
    .post<{ group: Partial<UserGroup> }, ResultOutput>(`userGroup?locationId=${data.locationId}`, { group: data })
    .then(api.checkResulCode);
}

export async function apiUpdateUserGroup(data: Partial<UserGroup>): Promise<unknown> {
  return api
    .put<{ group: Partial<UserGroup> }, ResultOutput>(
      `userGroup?locationId=${data.locationId}&groupId=${data.groupId}`,
      { group: data },
    )
    .then(api.checkResulCode);
}

export async function apiDeleteUserGroup(data: Partial<UserGroup>): Promise<unknown> {
  return api
    .delete<void, ResultOutput>(`userGroup?locationId=${data.locationId}&groupId=${data.groupId}`)
    .then(api.checkResulCode);
}

export async function apiGetUserGroupMembers(groupId?: number): Promise<User[]> {
  return api
    .get<void, UsersOutput>(`userGroupMember?groupId=${groupId}`)
    .then(api.checkResulCode)
    .then((response) => (response.users ? response.users : []));
}

export async function apiAddUserGroupMembers({
  user,
  group,
}: {
  user: Partial<User>;
  group: UserGroup;
}): Promise<unknown> {
  return api
    .put<void, ResultOutput>(`userGroupMember?groupId=${group.groupId}&userId=${user.userId}`)
    .then(api.checkResulCode);
}

export async function apiDeleteUserGroupMembers({
  user,
  group,
}: {
  user: Partial<User>;
  group: UserGroup;
}): Promise<unknown> {
  return api
    .delete<void, ResultOutput>(`userGroupMember?groupId=${group.groupId}&userId=${user.userId}`)
    .then(api.checkResulCode);
}
