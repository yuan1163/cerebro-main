import React from 'react';
import { observer } from 'mobx-react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';

// utils

import { t } from '@core/utils/translate';

// storages

import { useUI } from '@core/storages/ui';

// components

import { LocationList } from './LocationList';
import { LocationScheme } from './LocationScheme';

type Props = {};

export const Locations: React.FC<Props> = ({}) => {
  return (
    <Routes>
      {/* TODO Need Zones*/}
      <Route path='/' element={<Navigate to='locationScheme' />} />
      <Route path='/locationScheme' element={<LocationScheme />} />
      <Route path='/locationList' element={<LocationList />} />
      {/* <Route path='assets/*' element={<Navigate to='../../assets' />} /> */}
    </Routes>
  );
};
