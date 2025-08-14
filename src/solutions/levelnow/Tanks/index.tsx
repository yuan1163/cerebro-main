import { observer } from 'mobx-react';
import { useState, useCallback, useEffect } from 'react';

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

export const Tanks = observer(() => {
  const [selectedTankId, setSelectedTankId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const tanks = useTanks();
  const selectedTank = useTank(selectedTankId);
  const client = useClient(selectedTank?.clientId || null);

  const handleTankSelect = useCallback((tankId: number) => {
    setSelectedTankId(tankId);
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    setSelectedTankId(tanks[0]?.tankId);
  }, [tanks]);

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
          <TankList
            tanks={tanks}
            onTankSelect={handleTankSelect}
            selectedTankId={selectedTankId}
            searchQuery={searchQuery}
          />
        </Unit>
        <Unit>
          <TankInfo tank={selectedTank} client={client} />
        </Unit>
      </UnitContainer>
    </>
  );
});
