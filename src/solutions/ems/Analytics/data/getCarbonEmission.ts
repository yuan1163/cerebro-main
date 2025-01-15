type getCarbonEmissionParams = {
  consumption: string | number | undefined | null;
  factor: string | number | undefined;
};

export const getCarbonEmission = (params: getCarbonEmissionParams): string | undefined => {
  let carbonEmission: string | undefined;

  if (params.consumption && params.factor) {
    carbonEmission = (Number(params.consumption) * Number(params.factor)).toFixed(2);
  }

  return carbonEmission;
};
