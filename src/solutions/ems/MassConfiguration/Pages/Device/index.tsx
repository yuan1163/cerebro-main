import React from 'react';
import { Route, Routes } from 'react-router';

// components
import { DeviceListPage } from './DeviceListPage';
import { DeviceCircuitPage } from './DeviceCircuitPage';
import { DeviceSPSPage } from './DeviceSPSPage';

export const Device = () => {
  return (
    <>
      <Routes>
        <Route key={'device:list'} path={'list/*'} element={<DeviceListPage />} />
        <Route key={'device:circuit'} path={'circuit/*'} element={<DeviceCircuitPage />} />
        <Route key={'device:sps'} path={'sps/*'} element={<DeviceSPSPage />} />
      </Routes>
    </>
  );
};
