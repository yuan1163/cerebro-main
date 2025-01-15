import React, { useContext } from 'react';
import mapboxgl from 'mapbox-gl';

// context

import ThemeContext from '@app/ThemeAdapter/ThemeContext';
import { DrawerContext } from '@core/context/DrawerContext';

// DOM

import { createRoot } from 'react-dom/client';

// types

import { CurrentTheme } from '@core/api/typesDesignSystem';

// utils

import { getMapStyle } from '@core/utils/mapbox/mapStyles';

// styles

import styles from './styles.module.scss';

// api

import { SmartPolesQuery } from '@solutions/utilus/api/generated';

// components

import { Pin } from '@core/ui/components/Pin';

// icons

import TrackerLineIcon from '@assets/icons/line/tracker.svg?component';

interface Point {
  latitude: number;
  longitude: number;
}

type Props<DataType extends Point = any> = {
  className?: string;
  controls?: boolean;
  // TODO any
  points?: any;
  // points: SmartPolesQuery['smartPoles'];
  zoom: number;
  onSelect?: (point: DataType) => void;
  onClick?: () => void;
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

type Marker<DataType extends Point = any> = {
  children?: React.ReactNode;
  color?: number;
  onClick?: () => void;
  onSelect?: (point: DataType) => void;
  point?: Point;
};

const Marker: React.FC<Marker> = ({ onClick, onSelect, children, color, point }) => {
  return <Pin color={color} onClick={onClick} onSelect={onSelect} icon={<TrackerLineIcon />} />;
};

export const UtilusMap: React.FC<Props> = ({ controls, className, points, zoom, onSelect, onClick }) => {
  const { isDrawerExpanded } = useContext(DrawerContext);
  const { currentTheme, changeCurrentTheme } = useContext(ThemeContext);
  const ref = React.useRef<HTMLDivElement>(null);

  const center = React.useMemo(() => getCenter(points), [points]);

  // const [info] = React.useState<google.maps.InfoWindow>(() => new google.maps.InfoWindow());
  // const closeInfo = React.useCallback(() => info.close(), [info]);

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

      {
        controls
          ? (map.addControl(new mapboxgl.FullscreenControl()),
            map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right'))
          : null;
      }
      // TODO any
      points.forEach((point: any) => {
        const ref = React.createRef<HTMLDivElement>();
        let markerElement = ref.current;
        markerElement = document.createElement('div');
        createRoot(markerElement).render(
          <Marker
            onClick={onClick}
            onSelect={onSelect}
            point={point}
            color={point.devices.filter((device: any) => device.alerts.length > 0).length > 0 ? 3 : 0}
          />,
        );
        new mapboxgl.Marker(markerElement).setLngLat([point.longitude, point.latitude]).addTo(map);
      });

      return () => map.remove();
    }
  }, [ref, center, points, zoom, currentTheme, isDrawerExpanded]);

  return <div className={className} ref={ref} />;
};

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_TOKEN;
