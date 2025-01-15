import React from 'react';
import { Cluster, ClusterStats, MarkerClusterer, Renderer } from '@googlemaps/markerclusterer';

// styles

import styles from './styles.module.scss';

// api

import { SmartPolesQuery } from '@solutions/utilus/api/generated';

// pins

const pinShield = '<circle fill={{fillColor}} stroke="hsl(0, 0%, 100%)" stroke-width="3" cx="50%" cy="50%" r="23" />';

const pinShadow =
  '<filter id="shadowPin"><feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="black" /></filter><circle fill="hsla(0, 0%, 0%, 0.25)" cx="50%" cy="50%" r="23" style="filter:url(#shadowPin);" />';

const smartPoleIcon =
  '<path d="M35.8,29.4a2.93,2.93,0,0,0,.2-.9,2.225,2.225,0,0,0-.9-1.7,6.358,6.358,0,0,0-1.8-1,1.888,1.888,0,0,0-.8-.2,5.27,5.27,0,0,1-2,1.6,15.948,15.948,0,0,1,2.1.5,3.388,3.388,0,0,1,1.2.6l.2.2a.215.215,0,0,1-.2.2,3.388,3.388,0,0,1-1.2.6,11.332,11.332,0,0,1-3.6.6V25.8a4.026,4.026,0,1,0-4.9-2.9A4.23,4.23,0,0,0,27,25.8V30a15.051,15.051,0,0,1-3.6-.6,3.388,3.388,0,0,1-1.2-.6l-.2-.2a.215.215,0,0,1,.2-.2,3.388,3.388,0,0,1,1.2-.6,15.948,15.948,0,0,1,2.1-.5,5.27,5.27,0,0,1-2-1.6,2.36,2.36,0,0,1-.8.2,4,4,0,0,0-1.8,1,2.4,2.4,0,0,0-.9,1.7,2.93,2.93,0,0,0,.2.9C18.8,30,18,30.9,18,32c0,2.4,3.9,3.8,9,4v2h2V36c5.1-.2,9-1.6,9-4C38,30.9,37.2,30,35.8,29.4ZM20,32c0-.4.7-.8,1.8-1.2.3.1.6.3.9.4A15.559,15.559,0,0,0,27,32v2C23.1,33.8,20,32.7,20,32Zm9,2V32a12.61,12.61,0,0,0,4.3-.8,3.575,3.575,0,0,0,.9-.4Q36,31.4,36,32C36,32.7,32.9,33.8,29,34Z" fill="#fff"/>';

const bellIcon =
  '<path d="M36.538,31.291c-.026-.027-.119-.113-.241-.226-.265-.243-.664-.612-.811-.772-.864-.945-1.332-2.244-1.332-4.551,0-3.569-1.968-6.046-4.514-6.79a1.758,1.758,0,0,0-3.279,0c-2.55.74-4.515,3.212-4.515,6.791,0,2.315-.467,3.613-1.331,4.553-.145.157-.536.517-.8.761-.126.116-.223.2-.252.235l-.254.257v3H36.792v-3Z" fill="#fff"/><path d="M26.165,37.313a3.531,3.531,0,0,0,4.892-1.25H24.868A3.46,3.46,0,0,0,26.165,37.313Z" fill="#fff"/>';

const smartPolePin = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">${pinShadow}${pinShield}${smartPoleIcon}</svg>`;

const bellPin = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">${pinShadow}${pinShield}${bellIcon}</svg>`;

interface Point {
  latitude: number;
  longitude: number;
}

type Props<DataType extends Point = any> = {
  className?: string;
  points: SmartPolesQuery['smartPoles'];
  zoom: number;
  gestureHandling?: google.maps.MapOptions['gestureHandling'];
  onSelect?: (point: DataType) => void;
  onClick?: () => void;
};

export const getCenter = (points: SmartPolesQuery['smartPoles']): Point => {
  const min = points
    .filter((point) => !!point.latitude && !!point.longitude)
    .reduce(
      (min, point) => ({
        latitude: Math.min(min.latitude, point.latitude!),
        longitude: Math.min(min.longitude, point.longitude!),
      }),
      { latitude: Infinity, longitude: Infinity },
    );
  const max = points.reduce(
    (max, point) => ({
      latitude: Math.max(max.latitude, point.latitude!),
      longitude: Math.max(max.longitude, point.longitude!),
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

const getInfoContent = (point: ElementOf<SmartPolesQuery['smartPoles']>) => `
  <h3 class="${styles.title}">${point.name}</h3>
  <p class="${styles.zone}">${point.zone?.name}</p>
  <p class="${styles.formation}">${point.zone?.formation?.name}</p>
  `;

class ClusterMarkerIcon implements google.maps.Icon {
  labelOrigin = new google.maps.Point(50, 5);
  url: string = `${
    'data:image/svg+xml;charset=UTF-8;base64,' + btoa(bellPin.replace('{{fillColor}}', '"hsl(42, 100%, 50%)"'))
  }`;
}

class ClusterMarkerLabel implements google.maps.MarkerLabel {
  className = styles['cluster-label'];
  color = '#41475a'; // gray-900
  fontFamily = 'Inter var';
  fontSize = '16px';
  fontWeight = '700';
  text: string;
  constructor(text: string) {
    this.text = text;
  }
}

class ClusterRenderer implements Renderer {
  render(cluster: Cluster, stats: ClusterStats): google.maps.Marker {
    return new google.maps.Marker({
      position: cluster.position,
      icon: new ClusterMarkerIcon(),
      label: new ClusterMarkerLabel(cluster.count.toString()),
    });
  }
}

export const Map: React.FC<Props> = ({ className, points, zoom, gestureHandling = 'auto', onSelect, onClick }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  const center = React.useMemo(() => getCenter(points), [points]);

  const [info] = React.useState<google.maps.InfoWindow>(() => new google.maps.InfoWindow());
  const closeInfo = React.useCallback(() => info.close(), [info]);

  //console.log('Map:render');

  React.useEffect(() => {
    if (ref.current) {
      const gMap = new window.google.maps.Map(ref.current, {
        center: { lat: center.latitude, lng: center.longitude },
        zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        clickableIcons: false,
        keyboardShortcuts: false,
        gestureHandling,
        styles: [
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });
      setMap(gMap);
      gMap.addListener('zoom_changed', closeInfo);
    }
  }, [ref]);

  React.useEffect(() => {
    if (map) {
      let markers = points
        .filter((point) => !!point.latitude && !!point.longitude)
        .map((point) => {
          const getIconAttributes = (iconFillColor: string) => {
            return {
              url:
                'data:image/svg+xml;charset=UTF-8;base64,' +
                btoa(smartPolePin.replace('{{fillColor}}', `'${iconFillColor}'`)),
            };
          };
          const marker = new google.maps.Marker({
            position: { lat: point.latitude!, lng: point.longitude! },
            map,
            title: point.name,
            icon:
              point.devices.filter((device) => device.alerts.length > 0).length > 0
                ? getIconAttributes('hsl(4, 83%, 63%)')
                : getIconAttributes('hsl(200, 82%, 50%)'),
          });
          marker.addListener('click', () => {
            info.setContent(getInfoContent(point));
            info.open(map, marker);
            onSelect?.(point);
            onClick?.();
          });
          return marker;
        });

      let clusterer: MarkerClusterer | undefined = new MarkerClusterer({
        markers,
        map,
        renderer: new ClusterRenderer(),
      });
      clusterer.addListener('click', () => onClick?.());
      return () => {
        markers.forEach((marker) => marker.setMap(null));
        markers = [];
        clusterer = undefined;
      };
    }
  }, [map, points]);

  React.useEffect(() => {
    if (map && map.getZoom() !== zoom) {
      map.setZoom(zoom);
    }
  }, [map, zoom]);

  React.useEffect(() => {
    if (map) {
      map.setCenter({ lat: center.latitude, lng: center.longitude });
    }
  }, [map, center]);

  return <div className={className} ref={ref} />;
};
