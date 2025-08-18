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
import { useClients } from '@core/storages/controllers/levelnow/client';
// tabs
import Tabs from '@core/ui/levelnow/Tabs';
import CustomerList from './CustomerList';
import CustomerInfo from './CustomerInfo';

export const Customers = observer(() => {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCustomer, setIsAddCustomer] = useState(false);

  const clients = useClients();
  const selectedClient = clients.find((client) => client.clientId === selectedClientId) || null;

  const handleCustomerSelect = useCallback((clientId: number) => {
    setSelectedClientId(clientId);
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleToggleAdd = () => {
    setIsAddCustomer((prev) => !prev);
  };

  useEffect(() => {
    setSelectedClientId(clients[0]?.clientId);
  }, [clients]);

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
          <CustomerList
            customers={clients}
            selectedClientId={selectedClientId}
            onCustomerSelect={handleCustomerSelect}
            searchQuery={searchQuery}
            isAdd={isAddCustomer}
            onToggleAdd={handleToggleAdd}
          />
        </Unit>
        <Unit>
          <CustomerInfo customer={selectedClient} isAdd={isAddCustomer} onToggleAdd={handleToggleAdd} />
        </Unit>
      </UnitContainer>
    </>
  );
});
