import { useUI } from '@core/storages/ui';
import { getRootLocationInfo } from '@solutions/ems/api/data/getRootLocationInfo';

export const IsRootLocationId = () => {
  let isRootLocation: boolean = true;
  const rootLocationInfo = getRootLocationInfo();
  const ui = useUI();
  // FIXME: change to formation
  // const current = ui.currentFormation;
  const current = ui.emsCurrentLocation;

  if (current !== rootLocationInfo.locationId) isRootLocation = false;

  return isRootLocation;
};
