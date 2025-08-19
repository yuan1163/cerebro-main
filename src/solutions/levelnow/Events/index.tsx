import { Route, Routes, Navigate } from 'react-router-dom';

import EventsPage from './EventsPage';
import EventPage from './EventPage';

export const Events = () => {
  return (
    <Routes>
      {/* index ( /levelnow/events ) */}
      <Route index element={<EventsPage />} />
      {/* detail view /levelnow/events/event/* (catch-all for any subpath under /events/event) */}
      <Route path='event' element={<EventPage />} />
      {/* detail view /levelnow/events/event/:eventId */}
      <Route path='event/:eventId' element={<EventPage />} />
      {/* any other subpath under /events -> redirect to index */}
      <Route path='*' element={<Navigate to='.' replace />} />
    </Routes>
  );
};
