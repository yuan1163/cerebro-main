# MapBox Guide

See specific instructions in [TAIWAN_CONFIG.md](https://github.com/ivedadigital/cerebro/blob/dev/docs/TAIWAN_CONFIG.md)

The project includes variables that control the visual appearance of the **Mapbox** map. These variables can be found in the **mapbox configuration file**.

```ts
// config > mapbox.config.ts

const taiwanMapStyle = {
  light: 'mapbox://styles/mapbox/outdoors-v12',
  dark: 'mapbox://styles/mapbox/dark-v11',
};
```

You can choose one of several Mapbox themes.

Themes: [THEMES](https://docs.mapbox.com/api/maps/styles/)

To determine the **Mapbox** map style in a React component, the **getMapStyle** function is used, which checks for the presence of the **VITE_STYLE** variable and, depending on its value, returns the corresponding style URL.

```ts
import { getMapStyles } from '@config/mapbox.config';

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
```

During the development or build process, the necessary variable will be used.

```bash
"dev:taiwan": "cross-env VITE_STYLE=taiwan vite"
```
