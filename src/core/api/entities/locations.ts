import { api } from '..';
import { Location, LocationsInput, LocationsOutput } from '../types';

export async function apiGetLocations(filter?: LocationsInput): Promise<Location[]> {
  const query = filter && new URLSearchParams(filter);
  return api
    .get<void, LocationsOutput>(`location?${query}`)
    .then(api.checkResulCode)
    .then(api.checkResulCode)
    .then((response) => (response.locations ? response.locations : []));
}
