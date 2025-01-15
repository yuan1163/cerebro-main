import React from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

// types

import { Location } from '@core/api/types';

// styles

import styles from './styles.module.scss';

// components

import { Pin } from '@core/ui/components/Pin';
import { Point } from '@core/ui/pages/SmartPolesPage/Point';

// pin

// pins

const pinShield = '<circle fill={{fillColor}} stroke="hsl(0, 0%, 100%)" stroke-width="3" cx="50%" cy="50%" r="23" />';

const pinShadow =
  '<filter id="shadowPin"><feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="black" /></filter><circle fill="hsla(0, 0%, 0%, 0.25)" cx="50%" cy="50%" r="23" style="filter:url(#shadowPin);" />';

const hospitalIcon =
  '<path d="M23,18a3,3,0,0,0-3,3V36H19a1,1,0,0,0,0,2H37a1,1,0,0,0,0-2H36V21a3,3,0,0,0-3-3Zm3,13a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v5H26Zm-1-9a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm5,0a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-5,4a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm5,0a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Z" fill="#fff" fill-rule="evenodd"/>';

const hospitalPin = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">${pinShadow}${pinShield}${hospitalIcon}</svg>`;

interface Point {
  latitude: number;
  longitude: number;
}

type Props = {
  className?: string;
  points: Location[];
  zoom: number;
  onSelect?: (point: Location) => void;
};

export const getCenter = (points: Location[]): Point => {
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
    name: 'center',
    latitude: (min.latitude + max.latitude) / 2,
    longitude: (min.longitude + max.longitude) / 2,
  };
  return center;
};

export const Map: React.FC<Props> = ({ className, points, zoom, onSelect }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    const center = getCenter(points);
    if (ref.current && !map) {
      const gMap = new window.google.maps.Map(ref.current, {
        center: { lat: center.latitude, lng: center.longitude },
        zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        clickableIcons: false,
        keyboardShortcuts: false,
        gestureHandling: 'auto',
        fullscreenControl: false,
        backgroundColor: '#89B4F8',
        styles: [
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });
      setMap(gMap);
    }
  }, [ref, map]);

  React.useEffect(() => {
    const markers = points.map((point) => {
      const getIconAttributes = (iconFillColor: string) => {
        return {
          url:
            'data:image/svg+xml;charset=UTF-8;base64,' +
            btoa(hospitalPin.replace('{{fillColor}}', `'${iconFillColor}'`)),
        };
      };
      const marker = new google.maps.Marker({
        position: { lat: point.latitude, lng: point.longitude },
        map,
        title: point.name,
        icon: getIconAttributes('hsl(200, 82%, 50%)'),
      });
      marker.addListener('click', () => {
        onSelect?.(point);
      });
      return marker;
    });
    new MarkerClusterer({ markers, map });
    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [map, points]);

  return <div className={className} ref={ref} />;
};
