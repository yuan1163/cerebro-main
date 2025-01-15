import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { AdminSelection } from './AdminSelection';
import { UserSelection } from './UserSelection';
import { GroupSelection } from './GroupSelection';

export const Users = () => {
  return (
    <Routes>
      <Route path='admin/*' element={<AdminSelection />} />
      <Route path='user/*' element={<UserSelection />} />
      <Route path='group/*' element={<GroupSelection />} />
      <Route path='/' element={<Navigate to='user' />} />
    </Routes>
  );
};
