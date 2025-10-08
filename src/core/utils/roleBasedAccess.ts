import { useAuth } from '@core/storages/auth';
import { UserRole } from '@core/api/types';
import { Modules } from '@core/ui/types';

/**
 * Filter modules based on user role permissions
 * @param modules Array of modules to filter
 * @param userRole Current user's role
 * @returns Filtered array of modules
 */
export const filterModulesByRole = (modules: Modules, userRole: UserRole | undefined): Modules => {
  // If user has role or not Viewer, return all modules
  if (userRole) {
    return modules;
  }

  // For Viewer role, filter out Snapshot module
  return modules.filter((module) => {
    // For regular modules, filter out snapshot module for Viewer role
    if ('url' in module && module.url === 'snapshot') {
      return false;
    }
    return true;
  });
};

/**
 * Hook to get filtered modules based on current user's role
 * @param modules Array of modules to filter
 * @returns Filtered modules based on user role
 */
export const useRoleBasedModules = (modules: Modules): Modules => {
  const auth = useAuth();
  const userRole = auth.profile?.role;

  return filterModulesByRole(modules, userRole);
};

/**
 * Check if user has access to a specific module
 * @param moduleUrl Module URL to check
 * @param userRole Current user's role name
 * @returns True if user has access, false otherwise
 */
export const hasModuleAccess = (moduleUrl: string, userRole: UserRole | undefined): boolean => {
  // If trying to access snapshot module
  if (moduleUrl === 'snapshot') {
    // Only allow access if user has a role (not Viewer)
    return !!userRole;
  }

  // For all other modules, allow access
  return true;
};
