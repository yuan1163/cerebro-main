import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Button } from '@core/ui/components/Button';
import { ButtonGroup } from '@core/ui/components/ButtonGroup';

type Props = {
  className?: string;
};

export const ViewSwitcher: React.FC<Props> = ({ className }) => {
  return (
    <ButtonGroup
      aria-label={t(
        'general.screenSelection.label',
        'Screen selection',
        'Process of choosing a particular section of a webpage.',
      )}
    >
      <Button component={NavLink} to='map' variant='ghost'>
        {t('map.map.label', 'Map', 'Map title.')}
      </Button>
      <Button component={NavLink} to='list' variant='ghost'>
        {t('general.list.label', 'List', 'Collection of items.')}
      </Button>
    </ButtonGroup>
  );
};
