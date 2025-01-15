import { useUserProperities, useUserProperty } from '@core/storages/controllers/userProperities';
import { action, observable } from 'mobx';

import { Location, UserProperities } from '@core/api/types';
import { useLocations } from '@core/storages/controllers/locations';
import { json } from 'stream/consumers';
import { DeviceParts } from '../api/entities/deviceParts';
import { DevicePartProps, getDeviceCircuit } from '../MassConfiguration/data/devices';

export type CircuitProperty = [string, string, string];

class AnalysisCircuitStorage {
  @observable
  locationCircuit: UserProperities[] | undefined;

  @action
  setLocationCircuit(locationCircuit: UserProperities[]) {
    this.locationCircuit = locationCircuit;
  }

  @observable
  searchLocationsCircuit: DeviceParts[] = [];

  @action
  setSearchLocationCircuit(searchLocationsCircuit: DeviceParts[]) {
    this.searchLocationsCircuit = searchLocationsCircuit;
  }

  // @action
  // addSearchNodeLocation(location: Location) {
  //   this.searchNodeLocations?.push(location);
  // }

  // @action
  // removeSearchNodeLocation(location: Location) {
  //   const i = this.searchNodeLocations?.findIndex((l) => l === location);
  //   i !== undefined && this.searchNodeLocations?.splice(i, 1);
  // }

  // @action
  // clearSearchNodeLocation() {
  //   this.searchNodeLocations = [];
  // }

  @observable
  currentFormationCircuit: number | undefined;

  @action
  setCurrentFormationCircuit(locationId: number | undefined) {
    this.currentFormationCircuit = locationId;
  }

  // getAllNodeLocations() {
  //   return this.nodeLocations;
  // }

  getLocationCircuit(locationId: number | undefined): CircuitProperty[] | undefined {
    const currentNodeLocations = this.locationCircuit?.find((location) => {
      return location.name.split('_')[1] === String(locationId);
    });

    this.setCurrentFormationCircuit(locationId);

    return currentNodeLocations?.value ? JSON.parse(currentNodeLocations?.value) : undefined;
  }

  // buildSearchNodeLocations(searchNodeLocations: Location[] | undefined) {
  //   this.setSearchNodeLocations(searchNodeLocations);
  // }
}

function circuitProperty2LocationList(
  circuits: CircuitProperty[] | undefined,
  locations: any,
  deviceParts: DevicePartProps[],
): { locationName: string; circuitList: DeviceParts[] }[] {
  let locationList: { [key: string]: any } = {};
  circuits?.forEach((circuit) => {
    if (locationList.hasOwnProperty(circuit[0])) {
      locationList[circuit[0]]['circuitList'].push(
        deviceParts.find((item) => {
          if (item.deviceId === circuit[1] && item.index === circuit[2]) {
            return item.description;
          }
        }),
      );
    } else {
      locationList[circuit[0]] = {
        'locationName': locations.getElementById(circuit[0]).name,
        'circuitList': [
          deviceParts.find((item) => {
            if (item.deviceId === circuit[1] && item.index === circuit[2]) {
              return item.description;
            }
          }),
        ],
      };
    }
  });

  return Object.values(locationList);
}

export const analysisCircuit = new AnalysisCircuitStorage();

export const analysisLocationCircuit = (locationId?: number) => {
  const locations = useLocations();
  const deviceParts = getDeviceCircuit();
  const controller = useUserProperities({});
  const currentLocationCircuit = controller.getData()?.filter((item) => {
    return item.name.includes('analysisCircuit');
  });

  analysisCircuit.setLocationCircuit(currentLocationCircuit);

  const locationCircuit = analysisCircuit.getLocationCircuit(locationId);
  // console.log(locationCircuit);

  const locationList = circuitProperty2LocationList(locationCircuit, locations, deviceParts);

  let selectedLocationList: DeviceParts[] = [];

  if (deviceParts.length) {
    locationList.forEach((item) => {
      selectedLocationList = selectedLocationList?.concat(item.circuitList);
    });
  }

  analysisCircuit.setSearchLocationCircuit(selectedLocationList);
  // const addLocation = (location: Location) => {
  //   analysisCircuit.addSearchNodeLocation(location);
  // };

  // const removeLocation = (location: Location) => {
  //   analysisCircuit.removeSearchNodeLocation(location);
  // };

  // const clearLocation = () => {
  //   analysisCircuit.clearSearchNodeLocation();
  // };

  const property = useUserProperty({
    name: 'analysisCircuit_' + analysisCircuit.currentFormationCircuit,
    value: JSON.stringify(analysisCircuit.getLocationCircuit(analysisCircuit.currentFormationCircuit)),
  });

  const updateCircuit = (selectedItems: DeviceParts[]) => {
    const updateValue = selectedItems.map((item: DeviceParts) => [item.partLocationId, item.deviceId, item.index]);

    property.update({
      name: 'analysisCircuit_' + analysisCircuit.currentFormationCircuit,
      value: JSON.stringify(updateValue),
    });
  };

  return {
    analysisCircuit: analysisCircuit,
    // addLocation,
    // removeLocation,
    updateCircuit,
    // clearLocation,
  };
};
