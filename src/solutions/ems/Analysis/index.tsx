import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';

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

import CircuitSummary from './Pages/CircuitSummary';
import NodeSummary from './Pages/NodeSummary';

// icons
import BarChartSquare01LineIcon from '@assets/icons/line/bar-chart-square-01.svg?component';

const Analysis = () => {
  return (
    <>
      <Header
        icon={<BarChartSquare01LineIcon />}
        title={t('ems.energy_analysis.label', 'Energy Analysis', 'Energy Analysis title.')}
      />
      <Routes>
        <Route path='/' element={<Navigate to='node_summary' />} />
        <Route path='/circuit_summary' element={<CircuitSummary />} />
        <Route path='/node_summary' element={<NodeSummary />} />
      </Routes>
    </>
  );
};

export default Analysis;
