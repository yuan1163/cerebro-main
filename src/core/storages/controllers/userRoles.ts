import React from 'react';

import {
  apiGetUserRoles /*apiCreateUserRole, apiUpdateUserRole, apiDeleteUserRole*/,
} from '@core/api/entities/userRoles';
import { UserRole } from '@core/api/types';

import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@app/DataAccessAdapter';

const CONTROLLER = 'userRoles';

export class UserRolesController {
  roles?: UserRole[];

  static async invalidate() {
    return queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.roles;
  }

  getData(): UserRole[] {
    return this.roles!;
  }

  constructor(roles?: UserRole[]) {
    this.roles = roles;
  }
}

export const useUserRoles = () => {
  const { data } = useQuery([CONTROLLER], () => apiGetUserRoles(), {
    enabled: true,
  });

  return new UserRolesController(data);
};

// export const useRoleGroup = (asset: Partial<UserRole>) => {

//   const mtAdd = useMutation(apiCreateUserRole);
//   const mtUpdate = useMutation(apiUpdateUserRole);
//   const mtRemove = useMutation(apiDeleteUserRole);

//   const add = async (data: Partial<UserRole>) => {
//     await mtAdd.mutateAsync({...asset, ...data});
//     await UserRolesController.invalidate();
//   };
//   const update = async (data: Partial<UserRole>) => {
//     await mtUpdate.mutateAsync({...asset, ...data})
//     await UserRolesController.invalidate();
//   };
//   const remove = async () => {
//     await mtRemove.mutateAsync({...asset});
//     await UserRolesController.invalidate();
//   };

//   return { add, update, remove };
// }
