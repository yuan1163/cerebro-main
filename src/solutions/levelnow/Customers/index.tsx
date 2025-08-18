import { observer } from 'mobx-react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCustomer, setIsAddCustomer] = useState(false);
  // react-router hooks
  const navigate = useNavigate();
  // custom hooks
  const clients = useClients();

  const params = useParams();
  const selectedClientId = params.current ? parseInt(params.current, 10) : null;

  const selectedClient = clients.find((client) => client.clientId === selectedClientId) || null;

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleToggleAdd = () => {
    setIsAddCustomer((prev) => !prev);
  };

  // if no selected client id, set it to the first client
  useEffect(() => {
    if (selectedClientId === null && clients.length > 0) {
      const firstClient = clients[0];
      if (firstClient) {
        navigate(`/levelnow/customers/${firstClient.clientId}`);
      }
    }
  }, [selectedClientId, clients, navigate]);

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
