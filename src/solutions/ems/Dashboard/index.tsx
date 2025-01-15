import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { DashboardMap } from './DashboardMap';
import { DashboardScheme } from './DashboardScheme';

export const Dashboard = () => {
  return (
    <Routes>
      <Route path='/map' element={<DashboardMap />} />
      <Route path='/scheme' element={<DashboardScheme />} />
      <Route path='/' element={<Navigate to='map' />} />
    </Routes>
  );
};
