import { useDevices } from '@core/storages/controllers/devices';
import { useLocations } from '@core/storages/controllers/locations';
import { useLocationProperte } from '@solutions/ems/api/hook/useLocationProperte';

export const LocationIsDisabled = (): boolean => {
  const location = useLocations();
  if (!location.getRegions().length) return true;
  return false;
};

export const SystemIsDisabled = (): boolean => {
  const location = useLocations();
  // On EMS, campus = formation
  const campus = location.getFormations();
  if (!campus) return true;

  campus.map((c) => {
    const campusId = c.locationId;
    const locationProperte = useLocationProperte({ locationId: campusId });
    if (locationProperte) return false;
  });
  return false;
};

export const DeviceIsDisabled = (): boolean => {
  const location = useLocations();

  // There must be a company, so check the Region
  const regions = location.getRegions();
  if (!regions.length) return true;

  const deviceList = useDevices({ locationId: location.getCompany().locationId });
  if (!deviceList.hasData()) return true;

  return false;
};
