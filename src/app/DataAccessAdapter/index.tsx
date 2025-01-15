import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { observer } from 'mobx-react';

// storages

import { useAuth } from '@core/storages/auth';
import { errors } from '@core/storages/errors';

// components

import { WaitingPage } from '@core/ui/pages/WaitingPage';

const DEFAULT_STALE_TIME = 5000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      onError: (err) => errors.showError(err),
    },
    mutations: {
      onError: (err) => errors.showError(err),
    },
  },
});

type Props = {
  children?: React.ReactNode;
};

export const DataAccessAdapter: React.FC<Props> = observer(({ children }) => {
  const auth = useAuth();
  if (auth.loading) return <WaitingPage />;
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
});
