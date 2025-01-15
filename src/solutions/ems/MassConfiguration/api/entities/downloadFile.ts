import { api } from '@core/api';
import { ResultOutput } from '@core/api/types';

export type MCFileDownloadInput = Record<string, any> &
  Partial<{
    locationId?: number | null;
  }>;

export type MCFileDownloadOutput = ResultOutput & {
  // FIXME: any change correct type
  parameters: any[];
};

// FIXME: any change correct type
export async function apiGetMCFileDownload(filter: MCFileDownloadInput): Promise<any> {
  const query = new URLSearchParams(filter);

  return api.downloadFile<void, any>(`massConfig?${query}`).then((blob) => {
    var url = window.URL.createObjectURL(blob); // create url from blob
    var fileLink = document.createElement('a'); // create link for file
    fileLink.href = url;
    fileLink.download = `massConfig_locaionId_${filter.locationId}.xlsx`; // download filename
    document.body.appendChild(fileLink); // append file link to download
    fileLink.click();
    fileLink.remove(); // remove file link after click
  });
}
