// TYPES

export type MapVersion = 'base' | 'taiwan' | 'nobrand';

// BASE

const baseMapStyle = {
  light: 'mapbox://styles/iveda/clkwh8zde004801p8evdzewov',
  dark: 'mapbox://styles/mapbox/dark-v11',
};

// TAIWAN

const taiwanMapStyle = {
  light: 'mapbox://styles/mapbox/outdoors-v12',
  dark: 'mapbox://styles/mapbox/dark-v11',
};

// NOBRAND

const noBrandMapStyle = {
  light: 'mapbox://styles/iveda/clkwh8zde004801p8evdzewov',
  dark: 'mapbox://styles/mapbox/dark-v11',
};

export const getMapStyles = (version: 'base' | 'taiwan' | 'nobrand') => {
  const styleMap = {
    'taiwan': taiwanMapStyle,
    'nobrand': noBrandMapStyle,
    'base': baseMapStyle,
  };
  return styleMap[version] || baseMapStyle;
};
