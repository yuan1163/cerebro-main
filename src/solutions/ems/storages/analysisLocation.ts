import { action, observable, makeObservable } from 'mobx';
import { useUserProperities, useUserProperty } from '@core/storages/controllers/userProperities';

import { Location } from '@core/api/types';
import { UserProperities } from '@core/api/types';
import { set } from 'lodash';

class AnalysisLocationsStorage {
  @observable
  nodeLocations: UserProperities[] | undefined;

  @action
  setNodeLocations(nodeLocations: UserProperities[]) {
    this.nodeLocations = nodeLocations;
  }

  @observable
  searchNodeLocations: Location[] | undefined = [];

  @action
  setSearchNodeLocations(searchNodeLocations: Location[] | undefined) {
    this.searchNodeLocations = searchNodeLocations;
  }

  @action
  addSearchNodeLocation(location: Location) {
    this.searchNodeLocations?.push(location);
  }

  @action
  removeSearchNodeLocation(location: Location) {
    const i = this.searchNodeLocations?.findIndex((l) => l === location);
    i !== undefined && this.searchNodeLocations?.splice(i, 1);
  }

  @action
  clearSearchNodeLocation() {
    this.searchNodeLocations = [];
  }

  @observable
  currentFormationNode: number | undefined;

  @action
  setCurrentFormationNode(locationId: number | undefined) {
    this.currentFormationNode = locationId;
  }

  getAllNodeLocations() {
    return this.nodeLocations;
  }

  getNodeLocation(locationId: number | undefined) {
    const currentNodeLocations = this.nodeLocations?.find((location) => {
      return location.name.split('_')[1] === String(locationId);
    });

    this.setCurrentFormationNode(locationId);

    return currentNodeLocations;
  }

  buildSearchNodeLocations(searchNodeLocations: Location[] | undefined) {
    this.setSearchNodeLocations(searchNodeLocations);
  }
}

export const analysisLocations = new AnalysisLocationsStorage();

export const analysisNodeLocations = () => {
  const controller = useUserProperities({});
  const nodeLocations = controller.getData()?.filter((item) => {
    return item.name.includes('analysisNode');
  });

  analysisLocations.setNodeLocations(nodeLocations);

  const addLocation = (location: Location) => {
    analysisLocations.addSearchNodeLocation(location);
  };

  const removeLocation = (location: Location) => {
    analysisLocations.removeSearchNodeLocation(location);
  };

  const clearLocation = () => {
    analysisLocations.clearSearchNodeLocation();
  };

  const updateLocation = () => {
    const locationIdArray = analysisLocations.searchNodeLocations?.map((location) => location.locationId);

    const property = useUserProperty({
      name: 'analysisNode_' + analysisLocations.currentFormationNode,
      value: analysisLocations.searchNodeLocations,
    });

    property.update({
      name: 'analysisNode_' + analysisLocations.currentFormationNode,
      // value: encodeURIComponent(JSON.stringify(locationIdArray)),
      value: JSON.stringify(locationIdArray),
    });
  };

  return {
    analysisLocations: analysisLocations,
    addLocation,
    removeLocation,
    updateLocation,
    clearLocation,
  };
};
