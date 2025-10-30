import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// storages
import { useAuth } from '@core/storages/auth';
import { useUI } from '@core/storages/ui';

// modules
import { modules as cerebro } from '@solutions/cerebro';
import { modules as utilus } from '@solutions/utilus';
import { modules as ai } from '@solutions/ai';
import { modules as connect } from '@solutions/connect';
import { modules as ems } from '@solutions/ems';
import { modules as levelnow } from '@solutions/levelnow';

// commands
import { commands as utilusCommands } from '@core/ui/pages/SmartPolesPage/commands';
import { commands as emsCommands } from '@core/ui/pages/EMSCommandCenterPage/commands';

// pages
import { AuthLoginPage } from '@core/ui/pages/AuthLoginPage';
import { AuthResetPage } from '@core/ui/pages/AuthResetPage';
import { ErrorPage } from '@core/ui/pages/ErrorPage';
import { ModulesPage } from '@core/ui/pages/ModulesPage';
import { SmartPolesPage } from '@core/ui/pages/SmartPolesPage';
import { Solutions } from '@core/ui/types';
import { SolutionsPage } from '@core/ui/pages/SolutionsPage';

// Protected Route Component
const ProtectedRoute = observer(({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  if (!auth.isAuthenticated()) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
});

const solutions = [
  { url: Solutions.pinpoint, modules: cerebro },
  { url: Solutions.utilus, modules: utilus, commands: utilusCommands },
  { url: Solutions.ai, modules: ai },
  { url: Solutions.connect, modules: connect },
  { url: Solutions.ems, modules: ems, commands: emsCommands },
  { url: Solutions.levelnow, modules: levelnow },
];

export const AppRoutes = observer(() => {
  const ui = useUI();
  const navigate = useNavigate();
  const auth = useAuth();

  React.useEffect(() => ui.process(navigate), [ui.redirect]);

  return (
    <Routes>
      <Route path='/login' element={<AuthLoginPage />} />
      <Route path='/reset' element={<AuthResetPage />} />
      <Route path='/error' element={<ErrorPage />} />
      <Route
        path='/cerebro'
        element={
          <ProtectedRoute>
            <Navigate replace to='/solutions' />
          </ProtectedRoute>
        }
      />
      <Route
        path='/solutions'
        element={
          <ProtectedRoute>
            <SolutionsPage />
          </ProtectedRoute>
        }
      />
      {solutions.map((solution) => (
        <Route
          key={`route:solution:${solution.url}`}
          path={`/${solution.url}/*`}
          element={
            <ProtectedRoute>
              <ModulesPage modules={solution.modules} />
            </ProtectedRoute>
          }
        />
      ))}
      {solutions.map((solution) => {
        switch (solution.url) {
          case 'ai':
            return (
              <Route
                key={`route:redirect:${solution.url}`}
                path='/ai'
                element={
                  <ProtectedRoute>
                    <Navigate replace to='/ai/dashboard1' />
                  </ProtectedRoute>
                }
              />
            );
          default:
            return (
              <Route
                key={`route:redirect:${solution.url}`}
                path={`/${solution.url}`}
                element={
                  <ProtectedRoute>
                    <Navigate replace to={`/${solution.url}/domain`} />
                  </ProtectedRoute>
                }
              />
            );
        }
      })}

      {solutions.map((solution) =>
        solution.commands?.map((command) => (
          <Route
            key={`route:command:${solution.url}:${command.id}`}
            path={`/${solution.url}/${command.url}`}
            element={<ProtectedRoute>{command.element}</ProtectedRoute>}
          />
        )),
      )}
      <Route path='/' element={<Navigate replace to={auth.isAuthenticated() ? '/solutions' : '/login'} />} />
    </Routes>
  );
});
