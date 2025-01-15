import { api } from '..';
import { UsersInput, UsersOutput, User, ResultOutput, UserRole, Location } from '../types';

export async function apiGetUsers(filter: UsersInput): Promise<User[]> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, UsersOutput>(`locationUser?${query}&sortCollection=users&sortBy=firstName`)
    .then(api.checkResulCode)
    .then((response) => (response.users ? response.users : []));
}

const clean: Partial<User> = {
  locationIds: undefined,
  userId: undefined,
  passwordSet: undefined,
  emailStatus: undefined,
  creationDate: undefined,
  creationDateMs: undefined,
  permissions: undefined,
  role: undefined,
};

export async function apiCreateUser(data: Partial<User>): Promise<{ userId: number }> {
  return api
    .post<{ user: Partial<User> }, ResultOutput & { userId: number }>(`user`, {
      user: { ...data, ...clean },
    })
    .then(api.checkResulCode);
}

export async function apiUpdateUser({ user, data }: { user: Partial<User>; data: Partial<User> }): Promise<unknown> {
  return api
    .put<{ user: Partial<User> }, ResultOutput>(`user?userId=${user.userId}`, {
      user: { ...data, ...clean },
    })
    .then(api.checkResulCode);
}

export async function apiDeleteUser(data: Partial<User>): Promise<unknown> {
  return api.delete<void, ResultOutput>(`user?userId=${data.userId}`).then(api.checkResulCode);
}

export async function apiAddUserToLocation({
  user,
  location,
}: {
  user: Partial<User>;
  location: Location;
}): Promise<unknown> {
  return api
    .put<void, ResultOutput>(`locationUser?locationId=${location.locationId}&userId=${user.userId}`)
    .then(api.checkResulCode);
}

export async function apiDeleteUserFromLocation({
  user,
  location,
}: {
  user: Partial<User>;
  location: Location;
}): Promise<unknown> {
  return api
    .delete<void, ResultOutput>(`locationUser?locationId=${location.locationId}&userId=${user.userId}`)
    .then(api.checkResulCode);
}

export async function apiGrantUserRole({ user, role }: { user: Partial<User>; role: UserRole }): Promise<unknown> {
  return api.put<void, ResultOutput>(`role?userId=${user.userId}&roleId=${role.roleId}`).then(api.checkResulCode);
}

export async function apiRevokeUserRole({ user }: { user: Partial<User> }): Promise<unknown> {
  return api.put<void, ResultOutput>(`role?userId=${user.userId}&roleId=`).then(api.checkResulCode);
}

export async function apiRequestNewPassword(data: Partial<User>) {
  const email = data.username;
  if (email) return api.get<void, ResultOutput>(`password?username=${encodeURIComponent(email)}`).then(api.checkResulCode);
  else return Promise.reject('Empty username/email');
}
