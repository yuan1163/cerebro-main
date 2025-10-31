import React, { Suspense, lazy } from 'react';
import { observer } from 'mobx-react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// storages
import { useAuth } from '@core/storages/auth';
import { useUI } from '@core/storages/ui';

// Core types
import { Solutions } from '@core/ui/types';

// Auth pages - loaded immediately since they're needed for initial load
import { AuthLoginPage } from '@core/ui/pages/AuthLoginPage';
import { AuthResetPage } from '@core/ui/pages/AuthResetPage';
import { ErrorPage } from '@core/ui/pages/ErrorPage';
import { AuthGuard } from '@core/ui/components/AuthGuard';

// Lazy load main pages
const SolutionsPage = lazy(() => import('@core/ui/pages/SolutionsPage').then((m) => ({ default: m.SolutionsPage })));

// Loading fallback component
const PageLoadingFallback = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '14px',
      color: '#666',
    }}
  >
    Loading...
  </div>
);

// Wrapper component for lazy loaded solution modules
const LazyModulesPage = observer(({ solutionUrl }: { solutionUrl: Solutions }) => {
  const [ModulesPageComponent, setModulesPageComponent] = React.useState<any>(null);
  const [modules, setModules] = React.useState<any>(null);
  const [commands, setCommands] = React.useState<any>(null);

  React.useEffect(() => {
    const loadSolution = async () => {
      // Load ModulesPage component
      const { ModulesPage: ModulesPageComp } = await import('@core/ui/pages/ModulesPage');
      setModulesPageComponent(() => ModulesPageComp);

      // Load solution-specific modules
      let loadedModules;
      let loadedCommands;

      switch (solutionUrl) {
        case Solutions.pinpoint:
          loadedModules = await import('@solutions/cerebro').then((m) => m.modules);
          break;
        case Solutions.utilus:
          loadedModules = await import('@solutions/utilus').then((m) => m.modules);
          loadedCommands = await import('@core/ui/pages/SmartPolesPage/commands').then((m) => m.commands);
          break;
        case Solutions.ai:
          loadedModules = await import('@solutions/ai').then((m) => m.modules);
          break;
        case Solutions.connect:
          loadedModules = await import('@solutions/connect').then((m) => m.modules);
          break;
        case Solutions.ems:
          loadedModules = await import('@solutions/ems').then((m) => m.modules);
          loadedCommands = await import('@core/ui/pages/EMSCommandCenterPage/commands').then((m) => m.commands);
          break;
        case Solutions.levelnow:
          loadedModules = await import('@solutions/levelnow').then((m) => m.modules);
          break;
      }

      setModules(loadedModules);
      setCommands(loadedCommands);
    };

    loadSolution();
  }, [solutionUrl]);

  if (!ModulesPageComponent || !modules) {
    return <PageLoadingFallback />;
  }

  const Component = ModulesPageComponent;
  return <Component modules={modules} />;
});

const solutions = [
  { url: Solutions.pinpoint },
  { url: Solutions.utilus },
  { url: Solutions.ai },
  { url: Solutions.connect },
  { url: Solutions.ems },
  { url: Solutions.levelnow },
];

export const AppRoutes = observer(() => {
  const ui = useUI();
  const navigate = useNavigate();
  const auth = useAuth();

  React.useEffect(() => ui.process(navigate), [ui.redirect]);

  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <AuthGuard>
        <Routes>
          <Route path='/login' element={<AuthLoginPage />} />
          <Route path='/reset' element={<AuthResetPage />} />
          <Route path='/error' element={<ErrorPage />} />
          <Route path='/cerebro' element={<Navigate replace to='/solutions' />} />
          <Route path='/solutions' element={<SolutionsPage />} />

          {/* Lazy load each solution */}
          {solutions.map((solution) => (
            <Route
              key={`route:solution:${solution.url}`}
              path={`/${solution.url}/*`}
              element={<LazyModulesPage solutionUrl={solution.url} />}
            />
          ))}

          {/* Default redirects for each solution */}
          {solutions.map((solution) => {
            switch (solution.url) {
              case 'ai':
                return (
                  <Route
                    key={`route:redirect:${solution.url}`}
                    path='/ai'
                    element={<Navigate replace to='/ai/dashboard1' />}
                  />
                );
              default:
                return (
                  <Route
                    key={`route:redirect:${solution.url}`}
                    path={`/${solution.url}`}
                    element={<Navigate replace to={`/${solution.url}/domain`} />}
                  />
                );
            }
          })}

          <Route path='/' element={<Navigate replace to={auth.isAuthenticated() ? '/solutions' : '/login'} />} />
        </Routes>
      </AuthGuard>
    </Suspense>
  );
});
