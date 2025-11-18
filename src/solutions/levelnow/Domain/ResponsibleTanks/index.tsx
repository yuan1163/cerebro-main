import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useAuth } from '@core/storages/auth';
import { useNavigate } from 'react-router-dom';
import { Listbox } from '@headlessui/react';
import { useResponsibleTanks } from '@core/storages/controllers/levelnow/responsibleTanks';

// UI components
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Text } from '@core/ui/components/Text';
import { Button } from '@core/ui/components/Button';
import { Link } from '@core/ui/components/Link';

// Utils
import { t } from '@core/utils/translate';

// Icons
import CheckIcon from '@assets/icons/LevelNOW/check.svg?component';
import { cn } from '@core/utils/classnames';
import { formatTankLevelCounts } from '@core/utils/levelnow/tankLevelCounts';

type Person = {
  id: string;
  name: string;
};

export default observer(function ResponsibleTanks() {
  const [selectedPerson, setSelectedPerson] = useState<Person | undefined>(undefined);

  const navigate = useNavigate();
  const { profile } = useAuth();
  if (!profile) {
    navigate('/login');
    return null;
  }

  const responsibleTanks = useResponsibleTanks({ userId: profile.userId });

  const users =
    responsibleTanks && Array.isArray(responsibleTanks)
      ? responsibleTanks.map((item) => ({ id: item.userId, name: item.userName }))
      : [];

  useEffect(() => {
    if (!selectedPerson) {
      if (users.length > 0) {
        setSelectedPerson(users[0]);
      }
    }
  }, [users]);

  const tankLevelCounts =
    responsibleTanks && Array.isArray(responsibleTanks)
      ? responsibleTanks.find((item) => item.userId === selectedPerson?.id)?.tankLevelCounts || []
      : [];

  const data = formatTankLevelCounts(tankLevelCounts);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card fullWidth fullHeight elevation='xs' className='flex flex-col'>
      <CardHeader className='flex items-center justify-between'>
        <Text component='h3' variant='lg' weight='medium' className='flex items-center tracking-32 text-[#000]'>
          {t(
            'domain.responsibletanks.label',
            'Responsible Tanks',
            "A list of tanks responsible for the domain's operations.",
          )}
        </Text>

        {/* Select */}
        <div className='relative flex items-center ml-auto'>
          <Listbox value={selectedPerson} onChange={setSelectedPerson} by='id'>
            {({ open }) => (
              <>
                <Listbox.Button
                  className={cn(
                    open ? 'border-primary-500' : 'border-neutral-200 hover:border-neutral-300',
                    'flex bg-[#FFF] hover:bg-hover items-center gap-2 px-3 py-1 border rounded-md',
                  )}
                >
                  {selectedPerson?.name}
                </Listbox.Button>
                <Listbox.Options
                  className={cn(
                    'absolute bottom-0 right-0 z-10 gap-3 p-3 bg-[#FFF] rounded-lg shadow-select min-w-56 -translate-y-[50px]',
                  )}
                >
                  {users.map((user, index) => {
                    return (
                      <Listbox.Option key={index} value={user}>
                        {({ active, selected }) => (
                          <li
                            className={cn(
                              'flex items-center justify-between p-3 rounded cursor-pointer',
                              active && 'bg-hover',
                              selected && 'bg-primary-50 text-primary-500',
                            )}
                          >
                            <span>{user.name}</span>
                            {selected && <CheckIcon className='text-primary-500' />}
                          </li>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </>
            )}
          </Listbox>
        </div>
      </CardHeader>
      <CardContent disablePaddingTop className='flex-1'>
        <div className='px-5 pb-5 bg-neutral-50 rounded-[10px] flex flex-col justify-between h-full'>
          <div className='flex-1 flex items-center justify-center gap-[60px]'>
            {/* Total Counts */}
            <div className='flex flex-col items-center flex-1'>
              <span className='text-base font-medium tracking-32 text-neutral-900'>
                {t('general.tanks.label', 'Tanks', 'Tanks')}
              </span>
              <span className='text-[40px] font-medium tracking-[0.8px] text-neutral-900'>{total}</span>
            </div>

            {/* Each Counts */}
            <div className='flex flex-1'>
              <div className='flex flex-col gap-5'>
                {data.map((item) => (
                  <div key={item.range} className='flex items-center justify-between gap-2'>
                    <div className='w-2.5 aspect-square rounded-full' style={{ backgroundColor: item.color }} />
                    <span className='text-sm font-medium text-secondary-500 min-w-[85px]'>{item.range}</span>
                    <div className='flex items-center justify-center min-w-3'>
                      <span className='text-sm font-medium text-neutral-900'>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button
            component={Link}
            fullWidth
            to={`/levelnow/domain/responsibletanks?salesRep=${selectedPerson?.id}`}
            variant='outlined'
            className='text-[18px] font-medium tracking-32 text-neutral-900 rounded-md border-[#0000001F]'
          >
            {t('general.details.label', 'More Details', 'Button or link that allows to access additional information.')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});
