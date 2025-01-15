import React from 'react';
import { useNavigate } from 'react-router';
import { useUI } from '@core/storages/ui';

// utils

import { t } from '@core/utils/translate';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Box } from '@core/ui/components/Box';
import { IconButton } from '@core/ui/components/IconButton';
import { UtilusMap } from '@core/ui/utilus/UtilusMap';

// google

import { Map } from '@core/ui/utilus/Map';

// icons

import Expand03LineIcon from '@assets/icons/line/expand-03.svg?component';

// data

import { useSmartPoles } from '@solutions/utilus/api/data/useSmartPoles';

const DOMAIN_ZOOM = 11;

const CompanyMap = () => {
  const ui = useUI();
  const smartPoles = useSmartPoles();
  return smartPoles ? (
    // <Map
    //   points={smartPoles}
    //   zoom={DOMAIN_ZOOM}
    //   className={styles.map}
    //   onSelect={(pole) => ui.setCurrentFormation(pole.zone.formation.id)}
    // />
    <UtilusMap
      controls={true}
      points={smartPoles}
      zoom={DOMAIN_ZOOM}
      className={styles.map}
      onSelect={(pole) => ui.setCurrentFormation(pole.zone.formation.id)}
    />
  ) : null;
};

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const SmartPoleMap: React.FC<Props> = ({ children, ...props }) => {
  const navigate = useNavigate();
  return (
    <Box className={styles['map-container']}>
      <CompanyMap />
      {/* <Box className={styles['icon-container']}>
        <IconButton
          ariaLabel={t('general.expandView.label', 'Expand view', 'Expand view button.')}
          className={styles['icon-button']}
          size='lg'
          onClick={() => {
            navigate('smart-poles');
          }}
          variant='control'
        >
          <Expand03LineIcon />
        </IconButton>
      </Box> */}
    </Box>
  );
};
