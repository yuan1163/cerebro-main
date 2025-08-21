import { Route, Routes, Navigate } from 'react-router-dom';

import SnapshotPage from './SnapshotPage';
import LevelLowPage from './LevelLowPage';
import OfflinePage from './OfflinePage';
import BatteryLowPage from './BatteryLowPage';
import SensorErrorPage from './SensorErrorPage';

export const Snapshot = () => {
  return (
    <Routes>
      {/* index ( /levelnow/snapshot ) */}
      <Route index element={<SnapshotPage />} />
      <Route path='levellow' element={<LevelLowPage />} />
      <Route path='offline' element={<OfflinePage />} />
      <Route path='batterylow' element={<BatteryLowPage />} />
      <Route path='sensorerror' element={<SensorErrorPage />} />
      {/* any other subpath under /events -> redirect to index */}
      <Route path='*' element={<Navigate to='.' replace />} />
    </Routes>
  );
};
