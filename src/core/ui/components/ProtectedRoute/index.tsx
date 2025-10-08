import React from 'react';
import { observer } from 'mobx-react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@core/storages/auth';
import { hasModuleAccess } from '@core/utils/roleBasedAccess';

type ProtectedRouteProps = {
  children: React.ReactNode;
  moduleUrl: string;
  redirectTo?: string;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = observer(
  ({ children, moduleUrl, redirectTo = '/levelnow' }) => {
    const auth = useAuth();
    const userRole = auth.profile?.role;

    // Check if user has access to the module
    const hasAccess = hasModuleAccess(moduleUrl, userRole);

    // If no access, redirect to default page
    if (!hasAccess) {
      return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
  },
);
