// utils

import { t } from '@core/utils/translate';

export function getCameraDetails(name: string) {
  switch (name) {
    case 'ivdai.cameraId':
      return t('deviceTypes.cameraID', 'Camera ID', 'Camera ID.');
    case 'ivdai.engineModels':
      return t('deviceTypes.engineModels', 'Engine Models', 'Engine models.');
    case 'ivdai.plugins':
      return t('deviceTypes.plugins', 'Plugins', 'Plugins.');
    case 'ivdai.profileName':
      return t('deviceTypes.profileName', 'Profile Name', 'Profile name.');
    case 'ivdai.resolution':
      return t('deviceTypes.resolution', 'Resolution', 'Resolution.');
    case 'ivdai.streamUrl':
      return t('deviceTypes.streamUrl', 'Stream Url', 'Stream Url.');
    default:
      return t('general.notAvailable.label', 'n/a', 'Not Available.');
  }
}
