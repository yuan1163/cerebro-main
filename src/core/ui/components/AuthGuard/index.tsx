import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@core/storages/auth';
import { WaitingPage } from '@core/ui/pages/WaitingPage';

type AuthGuardProps = {
  children: React.ReactNode;
};

/**
 * 全域認證守衛
 * 保護所有需要登入才能訪問的路由
 */
export const AuthGuard: React.FC<AuthGuardProps> = observer(({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  // 公開路由列表（不需要登入）
  const publicRoutes = ['/login', '/reset', '/error'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    // 如果使用者已登入，檢查 token 是否過期
    if (auth.isAuthenticated() && auth.isTokenExpired()) {
      console.warn('Token expired detected in AuthGuard. Logging out...');
      auth.logout();
    }
  }, [auth, location.pathname]);

  // 如果是公開路由，直接顯示內容
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // 如果正在檢查認證狀態，顯示載入中
  if (auth.loading) {
    return <WaitingPage />;
  }

  // 如果使用者未登入，導向登入頁
  if (!auth.isAuthenticated()) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  // 使用者已登入，顯示內容
  return <>{children}</>;
});
