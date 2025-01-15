import { LocationType } from '@core/api/types';
import { SolutionsMasks } from '@core/ui/types';
import React, { useEffect } from 'react';
import { LocationsProp } from '../../data/locations';

// utils

import { t } from '@core/utils/translate';

export const useFilterText = () => {
  const [filterText, setFilterText] = React.useState<string | undefined>(undefined);
  return { filterText, setFilterText };
};

export const useFilterType = (list: LocationsProp[]) => {
  const types = new Set<LocationType>();
  list.forEach((loc) => {
    if (loc.type) types.add(loc.type);
  });
  type TypeOption = { value: LocationType | undefined; label: string };
  const allType: TypeOption = {
    value: undefined,
    label: `${t('location.type.label', 'Type', 'Type of location.')}: ${t(
      'general.all.label',
      'All',
      'Entirety of something.',
    )}`,
  };
  const filterTypeOptions: TypeOption[] = [
    allType,
    ...Array.from(types).map((type) => ({ value: type, label: type.toString() })),
  ];
  const [filterType, setFilterType] = React.useState<TypeOption>(allType);

  return { filterTypeOptions, filterType, setFilterType };
};

export const useFilterParentLocation = (list: LocationsProp[]) => {
  const parentLocations = new Set<string>();
  list.forEach((loc) => {
    if (loc.parentId) parentLocations.add(loc.parentId.toString());
  });
  type ParentLocationOption = { value: string | undefined; label: string };
  const allParentLocation: ParentLocationOption = {
    value: undefined,
    label: `${t(
      'location.parentLocation.label',
      'Parent Location',
      'Higher-level geographical area that contains a subordinate or more specific location.',
    )}: ${t('general.all.label', 'All', 'Entirety of something.')}`,
  };
  const filterParentLocationOptions: ParentLocationOption[] = [
    allParentLocation,
    ...Array.from(parentLocations).map((parentLocation) => ({
      value: parentLocation,
      label: parentLocation,
    })),
  ];
  const [filterParentLocation, setFilterParentLocation] = React.useState<ParentLocationOption>(allParentLocation);

  return { filterParentLocationOptions, filterParentLocation, setFilterParentLocation };
};

export const useFilterSolution = (list: LocationsProp[]) => {
  const solutions = new Set<number>();
  list.forEach((loc) => {
    if (loc.branchSolutions) solutions.add(loc.branchSolutions);
  });
  type Solution = { value: number | undefined; label: string };
  const allSolution: Solution = {
    value: undefined,
    label: `${t('solutions.solution.label', 'Solution', 'Solution.')}: ${t(
      'general.all.label',
      'All',
      'Entirety of something.',
    )}`,
  };
  const filterSolutionOptions: Solution[] = [
    allSolution,
    ...Array.from(solutions).map((solution) => {
      let solutionName: string = '';

      if (solution & SolutionsMasks.cerebro)
        solutionName = t('solutions.cerebro.label', 'Cerebro', 'Title of Cerebro App.');
      if (solution & SolutionsMasks.utilus)
        solutionName = t('solutions.utilus.label', 'Utilus', 'Title of Utilus Solution.');
      if (solution & SolutionsMasks.ai) solutionName = t('solutions.ai.label', 'AI', 'Title of AI Solution.');
      if (solution & SolutionsMasks.connect)
        solutionName = t('solutions.connects.label', 'Connects', 'Title of Connects Solution.');
      if (solution & SolutionsMasks.ems) solutionName = t('solutions.ems.label', 'EMS', 'Title of EMS Solution.');

      return {
        value: solution,
        label: solutionName,
      };
    }),
  ];
  const [filterSolution, setFilterSolution] = React.useState<Solution>(allSolution);

  return { filterSolutionOptions, filterSolution, setFilterSolution };
};
