import React, { FC } from 'react';
import { observer } from 'mobx-react';

// utils

import { t } from '@core/utils/translate';

// storages

import { useUI } from '@core/storages/ui';
import { useAuth } from '@core/storages/auth';

// types

import { Solutions } from '@core/ui/types';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';
import menuItemStyles from '@core/ui/components/MenuItem/styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { Link } from '@core/ui/components/Link';
import { ListDivider } from '@core/ui/components/ListDivider';
import { Menu } from '@core/ui/components/Menu';
import { MenuItem } from '@core/ui/components/MenuItem';
import { MenuItemButton } from '@core/ui/components/MenuItemButton';
import { MenuItemIcon } from '@core/ui/components/MenuItemIcon';
import { MenuItemText } from '@core/ui/components/MenuItemText';
import { MenuList } from '@core/ui/components/MenuList';

// icons

import ArrowRightLineIcon from '@assets/icons/line/arrow-right.svg?component';
import DotsGridRectanglesLineIcon from '@assets/icons/line/dots-grid-rectangles.svg?component';
import LightningLineIcon from '@assets/icons/line/lightning-01.svg?component';
import SmartPoleLineIcon from '@assets/icons/line/smart-pole.svg?component';
import TrackerLineIcon from '@assets/icons/line/tracker.svg?component';
import VideoRecorderLineIcon from '@assets/icons/line/video-recorder.svg?component';

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

interface CloseProps {
  close: () => void;
}

export const SolutionsSelector: React.FC<Props> = observer(({ children, className, title, ...props }) => {
  const ui = useUI();
  const auth = useAuth();

  const Titles: Record<Solutions, string> = {
    ai: t('solutions.ai.label', 'IvedaAI', 'Title of AI Solution.'),
    ivedartls: t('solutions.pinPoint.label', 'IvedaRTLS', 'Title of IvedaRTLS Solution.'),
    connect: t('solutions.connects.label', 'Connects', 'Title of Connects Solution.'),
    ems: t('solutions.ems.label', 'EMS', 'Title of EMS Solution.'),
    utilus: t('solutions.utilus.label', 'Utilus', 'Title of Utilus Solution.'),
  };
  
  const getTitle = (solution?: Solutions) => {
    switch (solution) {
      case Solutions.ai:
        return Titles.ai;
      case Solutions.pinpoint:
        return Titles.ivedartls;
      case Solutions.connect:
        return Titles.connect;
      case Solutions.ems:
        return Titles.ems;
      case Solutions.utilus:
        return Titles.utilus;
      default:
        return 'Choose solution';
    }
  };

  const menuItems = [
    {
      id: 1,
      title: Solutions.pinpoint,
      subtitle: t(
        'solutions.solutionsSelector.cerebro.listItem.caption',
        'Asset and personal tracking',
        'Label for asset and personal tracking menu item.',
      ),
      icon: <TrackerLineIcon />,
    },
    {
      id: 2,
      title: Solutions.utilus,
      subtitle: t(
        'solutions.solutionsSelector.utilus.listItem.caption',
        'Energy and lightning control',
        'Label for energy and lightning control menu item.',
      ),
      icon: <SmartPoleLineIcon />,
    },
    {
      id: 3,
      title: Solutions.ems,
      subtitle: t(
        'solutions.solutionsSelector.ems.listItem.caption',
        'Energy management system',
        'Label for energy managment system menu item.',
      ),
      icon: <LightningLineIcon />,
    },
    {
      id: 3,
      title: Solutions.ai,
      subtitle: t('solutions.solutionsSelector.ai.listItem.caption', 'IvedaAI', 'Label for IvedaAI menu item.'),
      icon: <VideoRecorderLineIcon />,
    },
  ];

  return (
    <Menu
      button={
        <Button component='div' startIcon={<DotsGridRectanglesLineIcon />}>
          {getTitle(ui.activeSolution)}
        </Button>
      }
      placement='bottom-end'
    >
      {({ close }: CloseProps) => (
        <>
          <MenuList>
            {menuItems
              .filter((item) => auth.solutions.includes(item.title))
              .map((item) => (
                <MenuItem key={item.id}>
                  <MenuItemButton
                    active={ui.activeSolution === item.title ? true : false}
                    onClick={() => {
                      ui.setActiveSolution(item.title);
                      ui.goto(`${item.title}/`);
                      close();
                    }}
                  >
                    <MenuItemIcon>{item.icon}</MenuItemIcon>
                    <MenuItemText title={getTitle(item.title)} subtitle={item.subtitle} />
                  </MenuItemButton>
                </MenuItem>
              ))}
            <ListDivider />
            <MenuItem>
              <MenuItemButton variant='action'>
                <Button component={Link} endIcon={<ArrowRightLineIcon />} to='/solutions' variant='text'>
                  {t(
                    'solutions.solutionsSelector.exploreButton.label',
                    'Explore solutions',
                    'Label for explore solutions button.',
                  )}
                </Button>
              </MenuItemButton>
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
});
