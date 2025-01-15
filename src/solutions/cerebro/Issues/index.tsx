import { Navigate, Route, Routes } from 'react-router';
import { IssuesPage } from './IssuesPage';
import { IssuePage } from './IssuePage';

export const Issues = () => {
  return (
    <Routes>
      <Route path='all/*' element={<IssuesPage />} />
      <Route path='my/*' element={<IssuesPage my />} />
      <Route path='/' element={<Navigate to='all' />} />
      <Route path='issue/:issueId' element={<IssuePage />} />
    </Routes>
  );
};
