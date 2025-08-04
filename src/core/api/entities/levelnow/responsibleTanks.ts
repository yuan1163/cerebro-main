import { api } from '@core/api/index';
import { ResponsibleTanks, ResponsibleTanksParameters } from '@core/api/types';

export async function apiGetResponsibleTanks(paramaters: ResponsibleTanksParameters): Promise<ResponsibleTanks> {
  const query = new URLSearchParams();

  Object.entries(paramaters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, value.toString());
    }
  });

  const queryString = query.toString();
  const url = queryString ? `Overview/responsibleTanks?${queryString}` : 'Overview/responsibleTanks';

  return api.get<void, ResponsibleTanks>(url, undefined, 'levelnow').then((response) => response);
}
