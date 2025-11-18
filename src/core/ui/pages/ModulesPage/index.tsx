import React from 'react';
import { observer } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';

// types

import { Modules, getModulesRoutes } from '@core/ui/types';

// storages

import { useLocations } from '@core/storages/controllers/locations';
import { useAuth } from '@core/storages/auth';

// utils
import { useRoleBasedModules } from '@core/utils/roleBasedAccess';

// components
import { ModulePageLayout } from '@core/ui/templates/ModulePageLayout';
import { ModuleNavigator } from './ModuleNavigator';
import { ProtectedRoute } from '@core/ui/components/ProtectedRoute';

// pages
import { WaitingPage } from '../WaitingPage';

type Props = {
  modules: Modules;
};

export const ModulesPage: React.FC<Props> = observer(({ modules }) => {
  // wait for auth
  useAuth();

  // wait for cerebro's (v1) location
  const locations = useLocations();

  if (!locations.hasData()) return <WaitingPage />;

  // routes for modules that don't need :current segment (levelnow and iveda)
  const modulesWithoutCurrent = modules.filter((mod) => mod.system === 'levelnow' || mod.system === 'iveda');
  const routesWithoutCurrent = getModulesRoutes(modulesWithoutCurrent);

  // routes for other solutions (these expect an extra ":current" segment)
  const modulesWithCurrent = modules.filter(
    (mod) => !('system' in mod) || (mod.system !== 'levelnow' && mod.system !== 'iveda'),
  );
  const routes = getModulesRoutes(modulesWithCurrent);

  // Filter modules for navigation (hide restricted modules from sidebar)
  const filteredModulesForNavigation = useRoleBasedModules(modules);

  return (
    <ModulePageLayout navigator={<ModuleNavigator modules={filteredModulesForNavigation} />}>
      <Routes>
        {routesWithoutCurrent.map((mod) => {
          let path: string;
          if (mod.url) {
            path = `${mod.url}/*`;
          } else {
            path = `/*`;
          }

          // Add protection for snapshot module
          const element =
            mod.url === 'snapshot' ? (
              <ProtectedRoute moduleUrl='snapshot'>{mod.component}</ProtectedRoute>
            ) : (
              mod.component
            );

          return <Route key={mod.url} path={path} element={element} />;
        })}
        {routes.map((mod) => {
          let path: string;
          if (mod.url) {
            path = `${mod.url}/:current/*`;
          } else path = `/*`;
          return <Route key={mod.url} path={path} element={mod.component} />;
        })}
        {/* please don't add any routes here, use the `modules` array for each solution */}
      </Routes>
    </ModulePageLayout>
  );
});
