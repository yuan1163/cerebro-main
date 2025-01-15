import { createContext } from 'react';

const defaultValue = {
  currentTheme: 'light',
  changeCurrentTheme: (newColorMode: 'light' | 'dark') => {},
};

const ThemeContext = createContext(defaultValue);

export default ThemeContext;
