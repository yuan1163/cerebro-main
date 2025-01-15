import React from 'react';

// utils

import { t } from '@core/utils/translate';

// types

import { User, UserGroup, UserRole } from '@core/api/types';

// storage

import { useUI } from '@core/storages/ui';
import { useUserRoles } from '@core/storages/controllers/userRoles';
import { useUserGroups } from '@core/storages/controllers/userGroups';
import { useLocations } from '@core/storages/controllers/locations';

export const useFilterText = () => {
  const [filterText, setFilterText] = React.useState<string | undefined>(undefined);
  return { filterText, setFilterText };
};

export const useFilterJobTitle = (list: User[]) => {
  const costs = new Set<string>();
  list &&
    list.forEach((user) => {
      if (user.jobTitle) costs.add(user.jobTitle);
    });
  type JobTitleOption = { value: string | undefined; label: string };
  const allJobTitles: JobTitleOption = {
    value: undefined,
    label: `${t('user.jobTitleInput.label', 'Job title', 'Job title input field.')}: ${t(
      'general.all.label',
      'All',
      'Entirety of something.',
    )}`,
  };
  const jobTitleFilterOptions: JobTitleOption[] = [
    allJobTitles,
    ...Array.from(costs).map((cost) => ({ value: cost, label: cost })),
  ];
  const [jobTitleFilter, setJobTitleFilter] = React.useState<JobTitleOption>(allJobTitles);
  return { jobTitleFilterOptions, jobTitleFilter, setJobTitleFilter };
};

export const useFilterRoles = () => {
  const roles = useUserRoles();
  type RoleOption = { value: UserRole | undefined; label: string };
  const allRoles: RoleOption = {
    value: undefined,
    label: `${t('user.roles.label', 'Roles', 'User roles.')}: ${t(
      'general.all.label',
      'All',
      'Entirety of something.',
    )}`,
  };
  const roleFilterOptions: RoleOption[] = [
    allRoles,
    //...roles.getData().map((role) => ({value: role, label: role.name})),
  ];
  if (roles.hasData()) roleFilterOptions.push(...roles.getData().map((role) => ({ value: role, label: role.name })));
  const [roleFilter, setRoleFilter] = React.useState<RoleOption>(allRoles);
  return { roleFilterOptions, roleFilter, setRoleFilter };
};

export const useFilterGroups = () => {
  const locations = useLocations();
  const company = locations.getCompany();
  const groups = useUserGroups({
    locationId: company.locationId,
  });
  type GroupOption = { value: UserGroup | undefined; label: string };
  const allGroups: GroupOption = {
    value: undefined,
    label: `${t('user.groups.label', 'Groups', 'User groups.')}: ${t(
      'general.all.label',
      'All',
      'Entirety of something.',
    )}`,
  };
  const groupFilterOptions: GroupOption[] = [
    allGroups,
    //...groups.getData().map((group) => ({ value: group, label: group.name })),
  ];
  if (groups.hasData())
    groupFilterOptions.push(...groups.getData().map((group) => ({ value: group, label: group.name })));
  const [groupFilter, setGroupFilter] = React.useState<GroupOption>(allGroups);
  return { groupFilterOptions, groupFilter, setGroupFilter };
};
