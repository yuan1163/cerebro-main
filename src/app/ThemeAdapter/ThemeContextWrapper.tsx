import { useState, useEffect, FC, ReactNode } from 'react';

// components

import ThemeContext from './ThemeContext';

const ThemeContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [colorMode, setColorMode] = useState(localStorage.getItem('colorMode') || 'light');

  const changeCurrentTheme = (newColorMode: 'light' | 'dark') => {
    setColorMode(newColorMode);
    localStorage.setItem('colorMode', newColorMode);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.className = colorMode === 'light' ? 'light' : 'dark';
  }, [colorMode]);

  return (
    <ThemeContext.Provider value={{ currentTheme: colorMode, changeCurrentTheme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextWrapper;
