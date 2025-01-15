import React from 'react';
import { observer } from 'mobx-react';
import { Route, Routes } from 'react-router-dom';

// components

import { DetailsView } from './DetailsView';
import { MapListView } from './MapListView';

export const SmartPoles = observer(() => {
  return (
    <Routes>
      <Route path='details/:id' element={<DetailsView />} />
      <Route path='*' element={<MapListView />} />
    </Routes>
  );
});
