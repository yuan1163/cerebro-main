import { observer } from 'mobx-react';
import { useState, useCallback, useEffect } from 'react';

// icons
import CustomerLineIcon from '@assets/icons/LevelNOW/sidebar/customer-line.svg?component';

// core ui components
import { Header } from '@core/ui/cerebro/Header';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';

// utils
import { t } from '@core/utils/translate';

// components
import SearchBar from '@core/ui/levelnow/SearchBar';
// import TankList from './TankList';
// import TankInfo from './TankInfo';
import { useTanks, useTank } from '@core/storages/controllers/levelnow/tank';
import { useClient } from '@core/storages/controllers/levelnow/client';
import { useClients } from '@core/storages/controllers/levelnow/client';
// tabs
import Tabs from '@core/ui/levelnow/Tabs';
import CustomerList from './CustomerList';

export const Customers = observer(() => {
  //   const [selectedTankId, setSelectedTankId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  //   const tanks = useTanks();
  //   const selectedTank = useTank(selectedTankId);
  //   const client = useClient(selectedTank?.clientId || null);
  const clients = useClients();
  console.log('clients', clients);

  //   const handleTankSelect = useCallback((tankId: number) => {
  //     setSelectedTankId(tankId);
  //   }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  //   useEffect(() => {
  //     setSelectedTankId(tanks[0]?.tankId);
  //   }, [tanks]);

  return (
    <>
      <Header
        icon={<CustomerLineIcon />}
        title={t('solutions.customers.label', 'Customers', 'Customers page title.')}
        widgets={false}
      />
      <div className='flex items-center justify-between gap-5'>
        <Tabs tabs={['Admins', 'Contacts', 'Groups']} />
        <SearchBar onChange={handleSearchChange} />
      </div>
      <UnitContainer className='mt-5'>
        <Unit variant='list'>
          <CustomerList customers={clients} searchQuery={searchQuery} />
          {/* <TankList
            tanks={tanks}
            onTankSelect={handleTankSelect}
            selectedTankId={selectedTankId}
            searchQuery={searchQuery}
          /> */}
        </Unit>
        <Unit>{/* <TankInfo tank={selectedTank} client={client} /> */}</Unit>
      </UnitContainer>
    </>
  );
});
