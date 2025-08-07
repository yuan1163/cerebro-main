import React from 'react';
import { observer } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';

// types

import { Modules, getModulesRoutes } from '@core/ui/types';

// storages

import { useLocations } from '@core/storages/controllers/locations';
import { useAuth } from '@core/storages/auth';

// components
import { ModulePageLayout } from '@core/ui/templates/ModulePageLayout';
import { ModuleNavigator } from './ModuleNavigator';

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

  const routes = getModulesRoutes(modules);

  // levelnow routes
  const levelnowModules = modules.filter((mod) => mod.system === 'levelnow');
  const levelnowRoutes = getModulesRoutes(levelnowModules);

  return (
    <ModulePageLayout navigator={<ModuleNavigator modules={modules} />}>
      <Routes>
        {levelnowRoutes.map((mod) => {
          let path: string;
          if (mod.url) {
            path = `${mod.url}/*`;
          } else {
            path = `/*`;
          }
          return <Route key={mod.url} path={path} element={mod.component} />;
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
