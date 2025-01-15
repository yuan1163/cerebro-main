import { useUI } from '@core/storages/ui';

import { Box } from '@core/ui/components/Box';
import { Map } from '@core/ui/utilus/Map';
import { DeviceTypeItem } from './DeviceTypeItem';

// styles
import styles from './styles.module.scss';

//data
import { useSmartPolesFormation } from '@solutions/utilus/api/data/useSmartPolesFormation';
import { useDeviceTypes } from '@solutions/utilus/api/data/useDeviceTypes';
import { useNavigate } from 'react-router-dom';

type Props = {
  formationId?: number;
  zoneId?: number;
};

const DASHBOARD_ZOOM = 17;

export const FormationMap: React.FC<Props> = ({ formationId, zoneId }) => {
  const smartPoles = useSmartPolesFormation(formationId, zoneId);
  const deviceTypes = useDeviceTypes();
  const showDeviceType = deviceTypes && deviceTypes.slice(0, 3); // not more than three the first only
  const navigate = useNavigate();

  return (
    <Box className={styles.map}>
      {smartPoles && (
        <Map
          points={smartPoles}
          zoom={DASHBOARD_ZOOM}
          className='h-full'
          onSelect={(pole) => navigate(`/utilus/poles/${formationId}/details/${pole.id}`)}
        />
      )}
      <Box className={styles.stat}>
        {showDeviceType && showDeviceType.map((type) => <DeviceTypeItem key={type.id} type={type} />)}
      </Box>
    </Box>
  );
};
