import { queryClient } from '@app/DataAccessAdapter';
import { Properties, apiUpdateLocationProperties } from '../../entities/locations';
import { useLocationProperte } from '../../hook/useLocationProperte';
import { useMutation } from '@tanstack/react-query';
import { apiGetLocationProperties } from '../../entities/locations';

const CONTROLLER = 'locationProperties';

class LocationPropertiesController {
  locationProperties?: Properties[];

  static async invalidate() {
    return queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.locationProperties;
  }

  getData(): Properties[] {
    return this.locationProperties!;
  }

  getContractCapacity(): Properties | undefined {
    return this.locationProperties?.find((property) => property.name === 'contractCapacity');
  }

  getEmissionFactor(): Properties | undefined {
    return this.locationProperties?.find((property) => property.name === 'emissionFactor');
  }

  getDomainMapZoomInSize(): Properties | undefined {
    return this.locationProperties?.find((property) => property.name === 'domainMapZoomInSize');
  }

  constructor(locationProperties?: Properties[]) {
    this.locationProperties = locationProperties;
  }
}

export const useLocationProperties = (locationId: number | undefined) => {
  const data = useLocationProperte({ locationId: locationId });
  const properties = data?.filter((property) => property.locationId === locationId);

  return new LocationPropertiesController(properties);
};

export const useLocationProperty = () => {
  const mtUpdate = useMutation(apiUpdateLocationProperties);

  const update = async (locationId: number | undefined, data: Partial<Properties>) => {
    await mtUpdate.mutateAsync({
      locationId: locationId,
      data: data,
    });

    await LocationPropertiesController.invalidate();
  };

  const get = async (locationId: number | undefined, name: string): Promise<{ value?: string } | undefined> => {
    if (!locationId || !name) return undefined;
    const filter = { locationId };
    const properties = await apiGetLocationProperties(filter);
    const foundProperty = properties.find((prop) => prop.name === name);
    return foundProperty ? { value: foundProperty.value } : undefined;
  };

  return {
    update,
    get,
  };
};
