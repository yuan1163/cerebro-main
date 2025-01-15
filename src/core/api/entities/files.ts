import { api } from '..';
import { FileRecord, FilesInput, FilesOutput, ResultOutput } from '../types';

export async function apiUploadFile({ file, filter }: { file: File; filter: FilesInput }) {
  const query = new URLSearchParams(filter);
  const buffer = await file.arrayBuffer();
  return api.upload(`file?${query}`, file.type, buffer);
}

export async function apiDeleteFile(filter: FilesInput) {
  const query = new URLSearchParams(filter);
  return api.delete(`file?${query}`);
}

export async function apiUploadMCFile({ file, topLocationId }: { file: File; topLocationId: number }) {
  const buffer = await file.arrayBuffer();

  return api.uploadMCFile<void, ResultOutput>(`massConfig?locationId=${topLocationId}`, file.type, buffer);

  // return api.put<void, ResultOutput>(`massConfig?locationId=${topLocationId}`, buffer).then(api.checkResulCode);
}

export async function apiGetFile(filter: FilesInput): Promise<FileRecord | null> {
  const query = new URLSearchParams(filter);
  return api
    .get<void, FilesOutput>(`file?${query}`)
    .then(api.checkResulCode)
    .then((response) => (response.files && response.files.length ? response.files[0] : null));
}
