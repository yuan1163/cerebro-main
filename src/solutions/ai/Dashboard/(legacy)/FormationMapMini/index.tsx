import { useNavigate } from 'react-router-dom';

import { AlertPriority, Notification } from '@core/api/types';

import { useUI } from '@core/storages/ui';

// styles
import styles from '../FormationMap/styles.module.scss';

//data
import { useLocations } from '@core/storages/controllers/locations';

// components

import { Map } from '../FormationMap/Map';

type Props = {
  // TODO
  event?: any;
};

const DASHBOARD_ZOOM = 16;

export const FormationMapMini: React.FC<Props> = ({ event }) => {
  // const locations = useLocations();
  // const formation = locations.getElementById(formationId);
  // const installations = locations.getInstallations(formation);
  // const navigate = useNavigate();

  return (
    <div className={styles['map']}>
      {event && (
        <Map
          points={event}
          zoom={DASHBOARD_ZOOM}
          className='h-full'
          // onSelect={(installation) => console.log(`navigate(...${installation.locationId})`)}
        />
      )}
    </div>
  );
};
