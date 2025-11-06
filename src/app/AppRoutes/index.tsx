import React from 'react';
import { observer } from 'mobx-react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// storages
import { useAuth } from '@core/storages/auth';
import { useUI } from '@core/storages/ui';

// Core types
import { Solutions } from '@core/ui/types';

// Auth pages
import { AuthLoginPage } from '@core/ui/pages/AuthLoginPage';
import { AuthResetPage } from '@core/ui/pages/AuthResetPage';
import { ErrorPage } from '@core/ui/pages/ErrorPage';
import { AuthGuard } from '@core/ui/components/AuthGuard';

// Pages
import { SolutionsPage } from '@core/ui/pages/SolutionsPage';
import { ModulesPage } from '@core/ui/pages/ModulesPage';

// Solutions - 靜態載入
import { modules as cerebroModules } from '@solutions/cerebro';
import { modules as utilusModules } from '@solutions/utilus';
import { modules as aiModules } from '@solutions/ai';
import { modules as connectModules } from '@solutions/connect';
import { modules as emsModules } from '@solutions/ems';
import { modules as levelnowModules } from '@solutions/levelnow';

const solutions = [
  { url: Solutions.pinpoint, modules: cerebroModules },
  { url: Solutions.utilus, modules: utilusModules },
  { url: Solutions.ai, modules: aiModules },
  { url: Solutions.connect, modules: connectModules },
  { url: Solutions.ems, modules: emsModules },
  { url: Solutions.levelnow, modules: levelnowModules },
];

export const AppRoutes = observer(() => {
  const ui = useUI();
  const navigate = useNavigate();
  const auth = useAuth();

  React.useEffect(() => ui.process(navigate), [ui.redirect]);
  // React.useEffect(() => {
  //   ui.process(navigate);
  // }, [ui, navigate]);

  return (
    <AuthGuard>
      <Routes>
        <Route path='/login' element={<AuthLoginPage />} />
        <Route path='/reset' element={<AuthResetPage />} />
        <Route path='/error' element={<ErrorPage />} />
        <Route path='/cerebro' element={<Navigate replace to='/solutions' />} />
        <Route path='/solutions' element={<SolutionsPage />} />

        {/* 各 solution 對應的模組頁 */}
        {solutions.map((solution) => (
          <Route
            key={`route:solution:${solution.url}`}
            path={`/${solution.url}/*`}
            element={<ModulesPage modules={solution.modules} />}
          />
        ))}

        {/* 各 solution 的預設導向 */}
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

        {/* 根目錄依登入狀態導向 */}
        <Route path='/' element={<Navigate replace to={auth.isAuthenticated() ? '/solutions' : '/login'} />} />
      </Routes>
    </AuthGuard>
  );
});
