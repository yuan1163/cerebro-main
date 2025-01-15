import React from 'react';
import { useLocation } from 'react-router-dom';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { DrawerButtonMenu } from '@core/ui/components/DrawerButtonMenu';
import { Disclosure } from '@headlessui/react';

// icons

import ChevronDownLineIcon from '@assets/icons/line/chevron-down.svg?component';
import ChevronUpLineIcon from '@assets/icons/line/chevron-up.svg?component';
import BullSolidIcon from '@assets/icons/solid/bull.svg?component';

type Props = {
  categories?: { title?: string; url: string }[];
  icon?: React.ReactNode;
  iconSolid?: React.ReactNode;
  title?: string;
  updated?: boolean;
  url?: string;
};
export const DrawerButtonExpandedAccordion: React.FC<Props> = ({
  categories,
  icon,
  iconSolid,
  title,
  updated,
  url,
}) => {
  type FormulaStateType = Record<string, boolean>;

  const [accordionState, setAccordionState] = React.useState<FormulaStateType>({});
  const isShowAccordion = (field: string) => accordionState[field];

  const handleClickShowAccordion = (field: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAccordionState({
      ...accordionState,
      [field]: !accordionState[field],
    });
  };

  // ACTIVE STATE

  const location = useLocation();
  const currentPath = location.pathname;

  // TODO CHECK PATH
  const active = categories?.some((item) => currentPath.includes(item.url || '')) || false;

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button as='span' className={styles['disclosure-button']}>
            <Button
              align='start'
              color={active ? 'primary' : 'icon-secondary'}
              className={styles['button']}
              // dot={item.updated}
              fontSize='sm'
              fullWidth
              size='lg'
              startIcon={active ? iconSolid : icon}
              textColor={active ? '' : 'typography-secondary'}
              variant={active ? 'tint' : 'ghost'}
              endIcon={categories && (open ? <ChevronUpLineIcon /> : <ChevronDownLineIcon />)}
              onClick={handleClickShowAccordion(title || '')}
              type='button'
            >
              {title}
            </Button>
          </Disclosure.Button>
          <Disclosure.Panel className={styles['disclosure-panel']}>
            {isShowAccordion(title || '') && <DrawerButtonMenu categories={categories} />}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
