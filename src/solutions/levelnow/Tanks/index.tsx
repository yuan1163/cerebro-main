import { observer } from 'mobx-react';
import { useState, useCallback } from 'react';

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
import { useTanks } from '@core/storages/controllers/levelnow/tank';
import Tabs from '@core/ui/levelnow/Tabs';

export const Tanks = observer(() => {
  const [selectedTankId, setSelectedTankId] = useState<number | null>(null);
  const tanks = useTanks();

  const handleTankSelect = useCallback((tankId: number) => {
    setSelectedTankId(tankId);
  }, []);

  return (
    <>
      <Header
        icon={<TankLineIcon />}
        title={t('solutions.tanks.label', 'Tanks', 'Tanks page title.')}
        widgets={false}
      />
      <div className='flex items-center justify-between gap-5'>
        <Tabs tabs={['Admins', 'Contacts', 'Groups']} />
        <TankSearch />
      </div>
      <UnitContainer className='mt-5'>
        <Unit variant='list'>
          <TankList tanks={tanks} onTankSelect={handleTankSelect} selectedTankId={selectedTankId} />
        </Unit>
        <Unit>
          <TankInfo />
        </Unit>
      </UnitContainer>
    </>
  );
});
