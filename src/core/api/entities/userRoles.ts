import { api } from '..';
import { UserRolesOutput, UserRole, ResultOutput } from '../types';

export async function apiGetUserRoles(): Promise<UserRole[]> {
  return api
    .get<void, UserRolesOutput>(`role`)
    .then(api.checkResulCode)
    .then((response) => (response.roles ? response.roles : []));
}

// export async function apiCreateUserRole(data: Partial<UserRole>): Promise<unknown> {
//   return api.post<{ role: Partial<UserRole>}, ResultOutput>(`role`, { role: data })
//     .then(api.checkResulCode)
// }

// export async function apiUpdateUserRole(data: Partial<UserRole>): Promise<unknown> {
//   return api.put<{ role: Partial<UserRole>}, ResultOutput>(`role?roleId=${data.roleId}`, { role: data })
//     .then(api.checkResulCode)
// }

// export async function apiDeleteUserRole(data: Partial<UserRole>): Promise<unknown> {
//   return api.delete<void, ResultOutput>(`role?roleId=${data.roleId}`)
//     .then(api.checkResulCode)
// }
