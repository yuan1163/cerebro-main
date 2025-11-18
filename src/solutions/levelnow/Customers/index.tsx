import { observer } from 'mobx-react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

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

  const { pathname } = useLocation();
  console.log('pathname:', pathname);

  const tabs = [
    t('user.admins.label', 'Admins', 'Key overseers with elevated privileges.'),
    t('user.contacts.label', 'Contacts', 'User contacts.'),
    t('user.groups.label', 'Groups', 'User groups.'),
  ];

  // Extract client ID from pathname (e.g., /levelnow/customers/customer/123 -> 123)
  const selectedClientId = (() => {
    const lastSegment = pathname.split('/').pop();
    if (!lastSegment) return null;
    const id = Number(lastSegment);
    return isNaN(id) ? null : id;
  })();
  console.log('Selected Client ID:', selectedClientId);

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
        navigate(`/levelnow/customers/customer/${firstClient.clientId}`);
      }
    }
  }, [selectedClientId, clients, navigate]);

  return (
    <div className='flex flex-col h-[calc(100vh-20px)]'>
      <Header
        icon={<CustomerLineIcon />}
        title={t('solutions.customers.label', 'Customers', 'Customers page title.')}
        widgets={false}
      />
      <div className='flex items-center justify-between gap-5'>
        {/* <Tabs tabs={tabs} /> */}
        <SearchBar onChange={handleSearchChange} />
      </div>
      <UnitContainer className='flex-1 mt-5'>
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
    </div>
  );
});
