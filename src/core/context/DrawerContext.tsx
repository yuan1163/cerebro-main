import { createContext } from 'react';

const defaultValue = {
  isDrawerExpanded: false,
  toggleDrawerState: (newMode: boolean) => {},
};

export const DrawerContext = createContext(defaultValue);
