import { useLocationProperte } from '@solutions/ems/api/hook/useLocationProperte';
import { Properties } from '@solutions/ems/api/entities/locations';

export type getCarbonEmissionFactorParams = {
  locationId: number | undefined;
  year: string | number;
};

const PROPERTY = 'emissionFactor';

export const getCarbonEmissionFactors = (params: getCarbonEmissionFactorParams): number | undefined => {
  let factor: number | undefined;
  let emissionFactor: Properties | undefined;
  let factorObject: { [key: string]: string | number } = {};
  let factorYears: number[] = [];

  const properties = useLocationProperte({
    locationId: params.locationId,
  });

  if (properties) {
    emissionFactor = properties.find((property) => {
      return property.name === PROPERTY;
    });
    if (emissionFactor) {
      try {
        factorObject = JSON.parse(emissionFactor.value);
        factorYears = Object.keys(factorObject)
          .map(Number)
          .sort((a, b) => {
            return b - a;
          });
      } catch (e) {
        // console.log(e);
      }
    }
    if (factorYears && factorObject) {
      factorYears.forEach((factorYear: number) => {
        // stop update factor if it alread get value.
        if (factorYear <= Number(params.year) && !factor) {
          factor = Number(factorObject[factorYear.toString()]);
        }
      });
    }
  }

  return factor;
};
