import { useNavigate } from 'react-router-dom';

import { useUI } from '@core/storages/ui';
import { Map } from './Map';
import { DeviceTypeItem } from './DeviceTypeItem';

// styles
import styles from './styles.module.scss';

//data
import { useLocations } from '@core/storages/controllers/locations';

type Props = {
  formationId?: number;
};

const DASHBOARD_ZOOM = 12;

export const FormationMap: React.FC<Props> = ({ formationId }) => {
  const locations = useLocations();
  const formation = locations.getElementById(formationId);
  const installations = locations.getInstallations(formation);
  const navigate = useNavigate();

  return (
    <div className={styles['map']}>
      {installations && (
        <Map
          points={installations}
          zoom={DASHBOARD_ZOOM}
          className='h-full'
          onSelect={(installation) => console.log(`navigate(...${installation.locationId})`)}
        />
      )}
      <div className={styles['stat']}>
        <DeviceTypeItem locationId={formationId} type={500} />
      </div>
    </div>
  );
};
