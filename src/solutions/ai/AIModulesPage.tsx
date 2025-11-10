import React from 'react';
import { observer } from 'mobx-react';

// components
import { ModulesPage } from '@core/ui/pages/ModulesPage';
import { WaitingPage } from '@core/ui/pages/WaitingPage';

// hooks
import { useAIModules } from './index';

export const AIModulesPage: React.FC = observer(() => {
  const modules = useAIModules();
  
  // Show loading while modules are being fetched
  if (!modules || modules.length === 0) {
    return <WaitingPage />;
  }

  return <ModulesPage modules={modules} />;
});