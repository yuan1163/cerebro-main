import React from 'react';
import { useLocation } from 'react-router-dom';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { DrawerButtonMenu } from '@core/ui/components/DrawerButtonMenu';
import { IconButton } from '@core/ui/components/IconButton';
import { MenuList } from '@core/ui/components/MenuList';
import { Tooltip } from '@core/ui/components/Tooltip';
import { Popover } from '@headlessui/react';

type Props = {
  categories?: { title?: string; url: string }[];
  icon?: React.ReactNode;
  iconSolid?: React.ReactNode;
  title?: string;
  updated?: boolean;
};

export const DrawerButtonCollapsedAccordion: React.FC<Props> = ({ categories, icon, iconSolid, title, updated }) => {
  const buttonRef = React.useRef(null);
  const [visible, setVisibility] = React.useState(false);

  let timeoutId: NodeJS.Timeout | undefined;

  const showTooltip = () => {
    timeoutId = setTimeout(() => setVisibility(true), 800);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutId);
    setVisibility(false);
  };

  // ACTIVE STATE

  const location = useLocation();
  const currentPath = location.pathname;

  // TODO CHECK PATH
  const active = categories?.some((item) => currentPath.includes(item.url || '')) || false;

  return (
    <>
      <Popover className={styles['popover']}>
        <Popover.Button as='span'>
          <IconButton
            ariaLabel={title}
            // badge={item.updated}
            color={active ? 'primary' : 'icon-secondary'}
            component='button'
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            ref={buttonRef}
            size='lg'
            type='button'
            variant={active ? 'tint' : 'ghost'}
          >
            {active ? iconSolid : icon}
          </IconButton>
        </Popover.Button>
        <Popover.Panel className={styles['popover-panel']}>
          <MenuList>
            <Card elevation='lg'>
              <CardContent size='xxxs'>
                <DrawerButtonMenu categories={categories} />
              </CardContent>
            </Card>
          </MenuList>
        </Popover.Panel>
      </Popover>
      <Tooltip isVisible={visible} placement='right' targetRef={buttonRef} title={title} />
    </>
  );
};
