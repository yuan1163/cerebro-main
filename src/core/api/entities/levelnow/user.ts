import { api } from '@core/api';
import { LevelNOWUser as User, RepUser, RepUserTitle } from '@core/api/types';

export async function apiGetUsers(): Promise<User[]> {
  const url = 'Users';
  return api.get<void, User[]>(url, undefined, 'levelnow').then((response) => response);
}

export async function apiGetRepUser(title: RepUserTitle): Promise<RepUser[]> {
  const url = 'Users/RepUser';
  return api.get<void, RepUser[]>(`${url}?title=${title}`, undefined, 'levelnow').then((response) => response);
}
