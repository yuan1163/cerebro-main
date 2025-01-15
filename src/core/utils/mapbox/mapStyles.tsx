// types

import { CurrentTheme } from '@core/api/typesDesignSystem';
import { MapVersion, getMapStyles } from '../../../config/mapbox.config';

const mapVersion = import.meta.env.VITE_STYLE || 'base';

export const getMapStyle = (currentTheme: CurrentTheme): string => {
  const mapStyles = getMapStyles(mapVersion as MapVersion);
  if (currentTheme === 'light') {
    return mapStyles.light;
  } else if (currentTheme === 'dark') {
    return mapStyles.dark;
  } else {
    return mapStyles.light;
  }
};
