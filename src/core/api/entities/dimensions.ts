import { api } from "..";
import { MapInput, MapOutput, MapDimensions } from "../types";

export async function apiGetDimensions(filter: MapInput): Promise<MapDimensions | null> {
  const query = new URLSearchParams(filter);
  return api.get<void, MapOutput>(`locationMap?${query}`)
    .then(api.checkResulCode)
    .then(response => response.map ? response.map : null);
} 
  