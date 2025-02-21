import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { observer } from 'mobx-react';

// storages

import { useUI } from '@core/storages/ui';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// utils

import { t } from '@core/utils/translate';

// components

// import { AlertsList } from './AlertsList';
// import { AttentionRequired } from './AttentionRequired';
// import { Card } from '@core/ui/components/Card';
// import { CardContent } from '@core/ui/components/CardContent';
// import { CardHeader } from '@core/ui/components/CardHeader';
// import { Grid } from '@core/ui/components/Grid';
import { Header } from '@core/ui/cerebro/Header';
// import { Select } from '@core/ui/components/Select';
// import { Stack } from '@core/ui/components/Stack';
// import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// pages

import ProcessHistoryPage from './Pages/ProcessHistoryPage';
import ProcessPage from './Pages/ProcessPage';
import ProductPage from './Pages/ProductPage';
import SummaryPage from './Pages/SummaryPage';
import UnitPage from './Pages/UnitPage';

// icons
import FileIcon from '@assets/icons/line/file-05.svg?component';

export const Reporting = observer(() => {
  return (
    <>
      <Header icon={<FileIcon />} title={t('solutions.reporting.label', 'Reporting', 'Reporting title.')} />
      <Routes>
        <Route path='/' element={<Navigate to='summary' />} />
        <Route path='/summary' element={<SummaryPage />} />
        <Route path='/management/product/*' element={<ProductPage />} />
        <Route path='/management/unit/*' element={<UnitPage />} />
        <Route path='/management/process/*' element={<ProcessPage />} />
        <Route path='/management/processHistory/*' element={<ProcessHistoryPage />} />
      </Routes>
    </>
  );
});
