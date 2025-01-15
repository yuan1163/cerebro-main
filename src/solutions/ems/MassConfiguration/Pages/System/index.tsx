import { Route, Routes, useNavigate } from 'react-router';

// components

import { CampusPage } from './Campus';
import { CompanyPage } from './Company';

export const System = () => {
  return (
    <Routes>
      <Route key={'system:company'} path={'company/*'} element={<CompanyPage />} />
      <Route key={'system:campus'} path={'campus/*'} element={<CampusPage />} />
    </Routes>
  );
};
