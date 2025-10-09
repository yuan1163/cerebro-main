import { api } from '@core/api';
import { RepUser, RepUserTitle } from '@core/api/types';

export async function apiGetRepUser(title: RepUserTitle): Promise<RepUser[]> {
  const url = 'Users/RepUser';
  return api.get<void, RepUser[]>(`${url}?title=${title}`, undefined, 'levelnow').then((response) => response);
}
