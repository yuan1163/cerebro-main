import { observer } from 'mobx-react';
import { useState } from 'react';

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
import { Scrollbar } from '@core/ui/components/Scrollbar';

export const Tanks = observer(() => {
  const tanks = useTanks();
  console.log('tanks', tanks);

  return (
    <>
      <Header
        icon={<TankLineIcon />}
        title={t('solutions.tanks.label', 'Tanks', 'Tanks page title.')}
        widgets={false}
      />
      <TankSearch />
      <UnitContainer className='mt-5'>
        <Unit variant='list'>
          <TankList tanks={tanks} />
        </Unit>
        <Unit>
          <TankInfo />
        </Unit>
      </UnitContainer>
    </>
  );
});
