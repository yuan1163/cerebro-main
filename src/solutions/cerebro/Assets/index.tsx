import React from 'react';
import { observer } from 'mobx-react';

// components

import { AssetsGroupSelection } from './AssetsGroupSelection';
import { AssetsPage } from './AssetsPage';
import { Navigate, Route, Routes } from 'react-router';

export const Assets = observer(() => {
  return (
    <Routes>
      <Route path='asset/*' element={<AssetsPage />} />
      <Route path='group/*' element={<AssetsGroupSelection />} />
      <Route path='/' element={<Navigate to='asset' />} />
    </Routes>
  );
});
