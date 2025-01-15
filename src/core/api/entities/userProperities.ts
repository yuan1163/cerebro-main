import { api } from '..';
import { UserProperities, UserProperitiesOutput, UserProperitiesInput, ResultOutput } from '../types';

export async function apiGetUserProperities(filter: UserProperitiesInput): Promise<UserProperities[]> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, UserProperitiesOutput>(`userProperties?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.properties ? response.properties : []));
}

export async function apiUpdateUserProperities(data: Partial<UserProperities>): Promise<unknown> {
  const query = new URLSearchParams(data);
  return api.put<void, ResultOutput>(`userProperties?${query}`).then(api.checkResulCode);
}
