import { useLocationProperte } from '@solutions/ems/api/hook/useLocationProperte';
import { Properties } from '@solutions/ems/api/entities/locations';

export type ContractCapacityParams = {
  locationId: number | undefined;
};
export type ContractCapacityOutput = {
  capacity: number | undefined;
  warning: number | undefined;
  critical: number | undefined;
};

const PROPERTY = 'contractCapacity';

export const getContractCapacity = (params: ContractCapacityParams): ContractCapacityOutput | undefined => {
  let contractCapacity: Properties | undefined;

  const properties = useLocationProperte({
    locationId: params.locationId,
  });

  if (properties) {
    contractCapacity = properties.find((property) => {
      return property.name === PROPERTY;
    });
    if (contractCapacity) {
      try {
        const contractObject = JSON.parse(contractCapacity.value);
        return {
          capacity: contractObject.capacity,
          warning: contractObject.warning,
          critical: contractObject.critical,
        };
      } catch (e) {
        // console.log(e);
      }
    }
  }

  return undefined;
};
