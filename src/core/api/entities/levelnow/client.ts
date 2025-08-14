import { api } from '@core/api/index';
import { Client, Clients } from '@core/api/types';

export async function apiGetClient(clientId: number | null): Promise<Client> {
  if (!clientId) {
    throw new Error('Client ID is required to fetch tank details');
  }

  const url = `Client/${clientId.toString()}`;

  return api.get<void, Client>(url, undefined, 'levelnow').then((response) => response);
}

export async function apiGetClients(): Promise<Clients> {
  const url = 'Client';
  return api.get<void, Clients>(url, undefined, 'levelnow').then((response) => response);
}
