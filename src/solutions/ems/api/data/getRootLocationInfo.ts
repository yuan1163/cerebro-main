import { useDevices } from '@core/storages/controllers/devices';
import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

export type RootLocationInfoOutput = {
  locationId: number | undefined;
  deviceSPBMId: string | undefined;
};

const typeOfDeviceSPBM = [305, 311]; // DAE SPB-M-M and SPB-M-C

export const getRootLocationInfo = (accessFormation: boolean = true): RootLocationInfoOutput => {
  let deviceSPBMId, deviceArray;

  const locations = useLocations();
  const ui = useUI();
  if (!locations.hasData()) return { locationId: undefined, deviceSPBMId: deviceSPBMId };
  const locationId = accessFormation ? ui.currentFormation : undefined;

  const devices = useDevices({ locationId: locationId });
  if (devices.hasData()) {
    deviceArray = devices
      .getData()
      // response would content child device
      .find((device) => typeOfDeviceSPBM.includes(device.deviceType) && device.ownerLocationId === locationId);
  }
  if (deviceArray) deviceSPBMId = deviceArray.deviceId;

  return {
    locationId: locationId,
    deviceSPBMId: deviceSPBMId,
  };
};
