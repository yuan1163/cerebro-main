import React from 'react';

import { useCompany } from './useCompany';
import { useRegionsQuery } from '../generated';
import { useUI } from '@core/storages/ui';

export const useRegions = () => {
  const company = useCompany();
  const { data } = useRegionsQuery(
    { where: { companyId: { equals: company?.id } } },
    { staleTime: Infinity, cacheTime: Infinity, enabled: !!company?.id },
  );

  // set default formation
  const ui = useUI();
  React.useEffect(() => {
    if (!ui.currentFormation) {
      if (data?.regions?.length && data.regions[0].formations.length) {
        ui.setCurrentFormation(data.regions[0].formations[0].id);
      }
    }
  }, [data]);

  return data?.regions;
};
