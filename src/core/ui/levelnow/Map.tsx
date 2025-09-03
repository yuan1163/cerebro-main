import { useRef, useContext, useMemo, useEffect, createRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';

// route
import { useNavigate } from 'react-router-dom';

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

import { IssuePriority, Location, LocationClient, Locations } from '@core/api/types';
import { CurrentTheme, SeverityPalette } from '@core/api/typesDesignSystem';

// components

import { Icon } from '@core/ui/components/Icon';
import { Pin } from '@core/ui/components/Pin';
import { PinNeedle } from '@core/ui/components/PinNeedle';

// icons

import Building01SolidIcon from '@assets/icons/solid/building-01.svg?component';
import Map01LineIcon from '@assets/icons/solid/map-01.svg?component';
import TrackerLineIcon from '@assets/icons/line/tracker.svg?component';

export interface Point {
  clientId?: number;
  latitude: number;
  longitude: number;
}

type MapProps = {
  controls?: boolean;
  marker?: 'default' | 'dot' | 'needle';
  points: Point[];
  pointsNavigation?: boolean;
  zoom: number;
  className?: string;
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

const Marker: React.FC<Marker> = ({
  color,
  markerContent,
  markerIcon,
  markerLabel,
  onClick,
  point,
  variant = 'default',
}) => {
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

export default function Map({ controls, marker = 'default', points, pointsNavigation, zoom, className }: MapProps) {
  // console.log('Map points:', points);
  // console.log('Points length:', points.length);
  // console.log(
  //   'Sample points:',
  //   points.slice(0, 5).map((p, i) => ({
  //     index: i,
  //     lat: p.latitude,
  //     lng: p.longitude,
  //     riskLevel: (p as any)?.riskLevel,
  //   })),
  // );

  // Set Mapbox access token
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_TOKEN;

  // const { isDrawerExpanded } = useContext(DrawerContext);
  const { currentTheme } = useContext(ThemeContext);
  const ref = useRef<HTMLDivElement>(null);
  const center = useMemo(() => (points.length > 0 ? getCenter(points) : { latitude: 0, longitude: 0 }), [points]);

  const navigate = useNavigate();

  //   if (points.length === 0) {
  //     return (
  //       <div>
  //         <Icon disabled size='lg' variant='plain'>
  //           <Map01LineIcon />
  //         </Icon>
  //       </div>
  //     );
  //   }

  useEffect(() => {
    if (ref.current) {
      const map = new mapboxgl.Map({
        container: ref.current,
        style: getMapStyle(currentTheme as CurrentTheme),
        center: [center.longitude, center.latitude],
        projection: 'mercator' as any,
        zoom,
      });

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

      points.forEach((point, index) => {
        // Check if coordinates are valid
        if (
          typeof point.latitude !== 'number' ||
          typeof point.longitude !== 'number' ||
          isNaN(point.latitude) ||
          isNaN(point.longitude)
        ) {
          console.warn(`Invalid coordinates for point ${index}:`, point);
          return;
        }

        const markerElement = document.createElement('div');
        const root = createRoot(markerElement);

        root.render(
          <Marker
            color={getCommandCenterSeverity((point as any)?.riskLevel) as any}
            markerContent={marker === 'needle' ? (point as any)?.markerContent : 0}
            markerLabel={marker === 'needle' ? (point as any)?.markerLabel : ''}
            variant={marker}
            point={point}
            onClick={pointsNavigation ? () => navigate(`/levelnow/customers/${point?.clientId}`) : () => {}}
          />,
        );

        new mapboxgl.Marker(markerElement).setLngLat([point.longitude, point.latitude]).addTo(map);
      });

      //   shapes?.forEach((shapeCoords) => {
      //     const feature: Feature<Geometry, GeoJsonProperties> = {
      //       type: 'Feature',
      //       properties: {},
      //       geometry: {
      //         type: 'Polygon',
      //         coordinates: [shapeCoords],
      //       },
      //     };
      //     draw.add(feature);
      //   });

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
  }, [ref, center, points, zoom, currentTheme]);

  return (
    <div
      className={className}
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}
