import React, { useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';

// context

import ThemeContext from '@app/ThemeAdapter/ThemeContext';
import { DrawerContext } from '@core/context/DrawerContext';

// language

import { languages } from '@core/utils/translations/config';
import { transformLanguageCode } from '@core/utils/translations/config';
import { useTranslation } from '@core/storages/translation';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

// utils

import { getCommandCenterSeverity } from '@core/utils/getCommandCenterSeverity';
import { getMapStyle } from '@core/utils/mapbox/mapStyles';

// DOM

import { createRoot } from 'react-dom/client';

// types

import { IssuePriority, Location } from '@core/api/types';
import { CurrentTheme, SeverityPalette } from '@core/api/typesDesignSystem';

// styles

import styles from './styles.module.scss';

// components

import { Icon } from '@core/ui/components/Icon';
import { Pin } from '@core/ui/components/Pin';
import { PinNeedle } from '@core/ui/components/PinNeedle';

// icons

import Building01SolidIcon from '@assets/icons/solid/building-01.svg?component';
import Map01LineIcon from '@assets/icons/solid/map-01.svg?component';
import TrackerLineIcon from '@assets/icons/line/tracker.svg?component';

// image

import PinIcon from './pin_2.png';

interface Point {
  latitude: number;
  longitude: number;
}

type Props = {
  className?: string;
  controls?: boolean;
  marker?: 'default' | 'dot' | 'needle';
  onSelect?: (point: Location) => void;
  points: Location[];
  zoom: number;
  shapes?: number[][][];
};

const getCenter = (points: Point[]): Point => {
  const min = points.reduce(
    (min, point) => ({
      latitude: Math.min(min.latitude, point.latitude),
      longitude: Math.min(min.longitude, point.longitude),
    }),
    { latitude: Infinity, longitude: Infinity },
  );

  const max = points.reduce(
    (max, point) => ({
      latitude: Math.max(max.latitude, point.latitude),
      longitude: Math.max(max.longitude, point.longitude),
    }),
    { latitude: -Infinity, longitude: -Infinity },
  );

  const center = {
    latitude: (min.latitude + max.latitude) / 2,
    longitude: (min.longitude + max.longitude) / 2,
  };

  return center;
};

// Custom marker

type Marker = {
  color?: IssuePriority;
  children?: React.ReactNode;
  markerContent?: number;
  markerIcon?: React.ReactNode;
  markerLabel?: string;
  onClick?: () => void;
  point?: Point;
  variant?: 'default' | 'dot' | 'needle';
};

const Marker: React.FC<Marker> = ({ color, markerContent, markerIcon, markerLabel, onClick, variant = 'default' }) => {
  return (
    <>
      {variant === 'default' && <Pin color={color} onClick={onClick} icon={<Building01SolidIcon />} />}
      {variant === 'needle' && (
        <PinNeedle
          color={color}
          markerLabel={markerLabel}
          markerContent={markerContent}
          onClick={onClick}
          icon={markerIcon}
        />
      )}
    </>
  );
};

export const Map: React.FC<Props> = ({ className, controls, marker = 'default', onSelect, points, zoom, shapes }) => {
  const { isDrawerExpanded } = useContext(DrawerContext);
  const { currentTheme, changeCurrentTheme } = useContext(ThemeContext);
  const ref = React.useRef<HTMLDivElement>(null);

  if (points.length === 0) {
    return (
      <div className={styles['disabled-map-container']}>
        <Icon disabled size='lg' variant='plain'>
          <Map01LineIcon />
        </Icon>
      </div>
    );
  }

  const center = React.useMemo(() => getCenter(points), [points]);

  React.useEffect(() => {
    if (ref.current) {
      const map = new mapboxgl.Map({
        container: ref.current,
        style: getMapStyle(currentTheme as CurrentTheme),
        center: [center.longitude, center.latitude],
        projection: 'mercator' as any,
        zoom,
      });

      // CONTROLS

      // translations draft

      const translation = useTranslation();
      const currentLanguageName = transformLanguageCode(translation.language);

      const language = new MapboxLanguage({
        defaultLanguage: currentLanguageName,
      });

      {
        controls
          ? (map.addControl(new mapboxgl.FullscreenControl()),
            map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right'))
          : null;
      }

      const draw = new MapboxDraw({
        displayControlsDefault: false,
        // controls: {
        //   polygon: true,
        //   trash: true,
        // },
      });
      map.addControl(draw);
      map.addControl(language);

      // geoJson.features > points
      // feature.geometry.coordinates > [point.longitude, point.latitude]

      // Add simple markers for each point

      // points.forEach((point) => {
      //   const marker = new mapboxgl.Marker({ anchor: 'bottom' })
      //     .setLngLat([point.longitude, point.latitude])
      //     .addTo(map);
      //   // Attach click event handler to the marker
      //   marker.getElement()?.addEventListener('click', () => {
      //     if (onSelect) {
      //       onSelect(point);
      //     }
      //   });
      // });

      // Add custom marker

      points.forEach((point) => {
        const ref = React.createRef<HTMLDivElement>();
        let markerElement = ref.current;
        markerElement = document.createElement('div');
        createRoot(markerElement).render(
          <Marker
            color={getCommandCenterSeverity((point as any)?.riskLevel) as any}
            markerContent={marker === 'needle' ? (point as any)?.markerContent : 0}
            markerLabel={marker === 'needle' ? (point as any)?.markerLabel : ''}
            variant={marker}
            onClick={() => {
              if (onSelect) {
                onSelect(point);
              }
            }}
            point={point}
          />,
        );
        new mapboxgl.Marker(markerElement).setLngLat([point.longitude, point.latitude]).addTo(map);
      });

      shapes?.forEach((shapeCoords) => {
        const feature: Feature<Geometry, GeoJsonProperties> = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [shapeCoords],
          },
        };
        draw.add(feature);
      });

      // Add symbol marker

      // map.on('load', function () {
      //   map.loadImage(PinIcon, function (error, image) {
      //     if (error) throw error;
      //     map.addImage('custom-marker', image as HTMLImageElement);
      //     map.addSource('points', {
      //       type: 'geojson',
      //       data: {
      //         type: 'FeatureCollection',
      //         features: Array.from(points).map((point) => ({
      //           'type': 'Feature',
      //           'geometry': { 'type': 'Point', 'coordinates': [point.longitude, point.latitude] },
      //         })) as any,
      //       },
      //     });
      //     map.addLayer({
      //       id: 'points',
      //       type: 'symbol',
      //       source: 'points',
      //       layout: {
      //         'icon-image': 'custom-marker',
      //         'icon-size': 0.5,
      //       },
      //     });
      //   });
      // });

      return () => map.remove();
    }
  }, [ref, center, points, zoom, shapes, currentTheme, isDrawerExpanded]);

  return <div className={className} ref={ref} />;
};

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_TOKEN;
