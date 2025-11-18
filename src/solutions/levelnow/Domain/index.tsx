import { Route, Routes, Navigate } from 'react-router-dom';

import DomainPage from '@solutions/levelnow/Domain/DomainPage';
import ResponsibleTanksPage from '@solutions/levelnow/Domain/ResponsibleTanksPage';

export const Domain = () => {
  return (
    <Routes>
      {/* index ( /levelnow/domain ) */}
      <Route index element={<DomainPage />} />
      <Route path='responsibletanks' element={<ResponsibleTanksPage />} />
      {/* any other subpath under /domain -> redirect to index */}
      <Route path='*' element={<Navigate to='.' replace />} />
    </Routes>
  );
};
