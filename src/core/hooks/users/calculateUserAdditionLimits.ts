// storages

import { useUsers } from '@core/storages/controllers/users';

// types

import { SeverityPalette } from '@core/api/typesDesignSystem';
import { UserCategory } from '@core/api/types';

interface UserLimitCalculationResult {
  isAddUserDisabled: boolean;
  isAlertDisabled: boolean;
  totalUsers: number;
  userAdditionStatus: SeverityPalette | undefined;
}

function useCalculateUserLimits(locationId: number, usersMaxLimit: number): UserLimitCalculationResult {
  const totalContacts = useUsers({ locationId });
  const allUsers = totalContacts?.getData() || [];
  const totalUsers = allUsers.length;

  if (totalUsers === 0) {
    return {
      totalUsers: 0,
      isAlertDisabled: false,
      isAddUserDisabled: false,
      userAdditionStatus: 'trivial',
    };
  }

  // const adminsList = allUsers.filter((u) => u.category === UserCategory.Administrator);
  // const contactsList = allUsers.filter((u) => u.category === UserCategory.Contact || !u.category);
  // const totalUsersCount = adminsList.length + contactsList.length;

  const remainingPercentage = Math.floor(100 - (100 * totalUsers) / usersMaxLimit);

  let userAdditionStatus: SeverityPalette = 'trivial';
  let isAlertDisabled = true;
  let isAddUserDisabled = false;

  if (remainingPercentage === 0) {
    userAdditionStatus = 'error';
    isAddUserDisabled = true;
    isAlertDisabled = true;
  } else if (remainingPercentage <= 10) {
    userAdditionStatus = 'warning';
    isAddUserDisabled = false;
    isAlertDisabled = true;
  } else if (remainingPercentage > 10) {
    isAlertDisabled = false;
  }

  return { totalUsers, isAlertDisabled, isAddUserDisabled, userAdditionStatus };
}

export default useCalculateUserLimits;
