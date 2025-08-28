import { api } from '@core/api/index';
import { Client, ClientData, Clients, ApiResponse } from '@core/api/types';

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

export async function apiUpdateClient(clientId: number, data: Partial<ClientData>): Promise<ApiResponse> {
  const url = `Client/${clientId.toString()}`;

  return api.put<typeof data, ApiResponse>(url, data, 'levelnow').then((response) => response);
}
export async function apiAddClient(data: Partial<ClientData>): Promise<ApiResponse & { data: null; 'error': null }> {
  const url = 'Client';
  return api
    .post<typeof data, ApiResponse & { data: null; 'error': null }>(url, data, 'levelnow')
    .then((response) => response);
}
export async function apiDeleteClient(clientId: number): Promise<ApiResponse> {
  const url = `Client/${clientId.toString()}`;
  return api.delete<void, ApiResponse>(url, undefined, 'levelnow').then((response) => response);
}
