import { api } from '@core/api/index';
import { Summary, SummaryParameters } from '@core/api/types';

export async function apiGetOverviewSummary(paramaters: SummaryParameters): Promise<Summary> {
  const query = new URLSearchParams();

  Object.entries(paramaters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, value.toString());
    }
  });

  const queryString = query.toString();
  const url = queryString ? `Overview/summary?${queryString}` : 'Overview/summary';

  return api.get<void, Summary>(url, undefined, 'levelnow').then((response) => response);
}
