import { useNavigate } from 'react-router-dom';

// types

import { Location } from '@core/api/types';

// storages

import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';

// styles

import styles from './styles.module.scss';

// components

import { Map } from '@core/ui/cerebro/Map';
import { Icon } from '@core/ui/components/Icon';

// icons

import Map01LineIcon from '@assets/icons/solid/map-01.svg?component';

type Props = { className?: string; marker?: 'default' | 'dot' | 'needle'; points?: any };

export const BuildingsMap: React.FC<Props> = ({ className, marker, points }) => {
  const navigate = useNavigate();
  const locations = useLocations();
  const ui = useUI();
  const activeFormation = locations.getElementById(ui.currentFormation);
  //  const points = locations.getBuildings(activeFormation);
  const zoom = 16; // TODO get from Location's properties

  const invalid = (points: Location[]) => {
    return points.length && points.some((point) => !point.latitude || !point.longitude);
  };

  points = points.map((point: any) => ({
    ...point,
    markerLabel: point.name,
    markerContent: 86,
    markerSeverity: point.riskLevel,
  }));

  const shapes = points.map((point: any) => point.shape).filter((shape: any) => !!shape);

  if (invalid(points)) {
    return (
      <div className={styles['disabled-map-container']}>
        <Icon disabled size='lg' variant='plain'>
          <Map01LineIcon />
        </Icon>
      </div>
    );
  }

  return (
    <Map
      marker={marker}
      controls={true}
      points={points}
      zoom={zoom}
      className={className}
      shapes={shapes}
      onSelect={(point) => {
        ui.setEmsCurrentLocation(point.locationId);
        //navigate(`../scheme/${point.locationId}`);
        navigate('../scheme');
      }}
    />
  );
};
