import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { useUI } from '@core/storages/ui';
import { useLocationProperties } from '@solutions/ems/api/storages/controllers/locationProperties';
import { getCarbonEmissionFactors } from '@solutions/ems/Analytics/data/getCarbonEmissionFactors';

import { getEnergy, ProcessHistoryInput } from '../../data/processHistory';
import { ProductUnit } from '../../data/product';
import { Unit } from '../../data/unit';
import { useProcessHistory } from '../../storages/controllers/processHistory';
import { useProduct } from '../../storages/controllers/product';

// components

import { CircularProgress } from '@core/ui/components/CircularProgress';

type Props = {
  parameter: 'processId' | 'unitId' | 'productId';
  parameterId: number;
  locationId: number | undefined;
  showEmission?: boolean;
};

const QueryHistoryData: React.FC<Props> = ({ parameter, parameterId, locationId, showEmission = false }) => {
  // const QueryHistoryData: React.FC<Props> = ({ parameter, parameterId, showEmission = false }) => {
  // const ui = useUI();
  // emission
  // const emissionFactor = getCarbonEmissionFactors({ locationId: ui.currentFormation, year: moment().year() });
  const emissionFactor = getCarbonEmissionFactors({ locationId, year: moment().year() });

  const energyVal = getEnergy(locationId, parameter, parameterId);

  if (energyVal === undefined || energyVal === 0) {
    return <CircularProgress className='mr-4' />;
  }

  let historyDataValue: string;
  if (showEmission) {
    historyDataValue = emissionFactor !== undefined ? (energyVal * emissionFactor).toFixed(2) : '-';
  } else {
    historyDataValue = energyVal.toFixed(2);
  }

  return <>{historyDataValue}</>;
};

export default QueryHistoryData;
