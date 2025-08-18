import { observer } from 'mobx-react';
import { useState, useEffect } from 'react';

// icons
import TankLineIcon from '@assets/icons/line/tank-line.svg?component';

// core ui components
import { Header } from '@core/ui/cerebro/Header';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// utils
import { t } from '@core/utils/translate';

// components
import TankSearch from './TankSearch';
import TankList from './TankList';
import TankInfo from './TankInfo';
import { useTanks, useTank } from '@core/storages/controllers/levelnow/tank';
import { useClient } from '@core/storages/controllers/levelnow/client';
// tabs
import Tabs from '@core/ui/levelnow/Tabs';
import { useNavigate, useParams } from 'react-router-dom';

export const Tanks = observer(() => {
  const [searchQuery, setSearchQuery] = useState('');

  const tanks = useTanks();
  const params = useParams();
  const selectedTankId = params.current ? parseInt(params.current, 10) : null;
  const selectedTank = useTank(selectedTankId);
  const client = useClient(selectedTank?.clientId || null);

  const navigate = useNavigate();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (selectedTankId === null && tanks.length > 0) {
      const firstTank = tanks[0];
      if (firstTank) {
        navigate(`/levelnow/tanks/${firstTank.tankId}`);
      }
    }
  }, [selectedTankId, tanks, navigate]);

  return (
    <>
      <Header
        icon={<TankLineIcon />}
        title={t('solutions.tanks.label', 'Tanks', 'Tanks page title.')}
        widgets={false}
      />
      <div className='flex items-center justify-between gap-5'>
        <Tabs tabs={['Admins', 'Contacts', 'Groups']} />
        <TankSearch onChange={handleSearchChange} />
      </div>
      <UnitContainer className='mt-5'>
        <Unit variant='list'>
          <TankList tanks={tanks} selectedTankId={selectedTankId} searchQuery={searchQuery} />
        </Unit>
        <Unit>
          <TankInfo tank={selectedTank} client={client} />
        </Unit>
      </UnitContainer>
    </>
  );
});
