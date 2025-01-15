import React from 'react';

// utils

import { t } from '@core/utils/translate';

// types

import { AssetGroup } from '@core/api/types';
import { Location } from '@core/api/types';

// storages

import { useAssetGroups } from '@core/storages/controllers/assetGroups';
import { useLocations } from '@core/storages/controllers/locations';
import { useModals } from '@core/storages/modals';
import { useUI } from '@core/storages/ui';

// styles

import { cn } from '@core/utils/classnames';
import styles from '../forms.module.scss';

// components

import { Button } from '@core/ui/components/Button';

type Props = {
  onSelect: (location: Location) => void;
  skip?: Location[];
};

export const SelectLocationForm: React.FC<Props> = ({ onSelect, skip }) => {
  const ui = useUI();
  const modals = useModals();
  const locations = useLocations();

  const select = (location: Location) => {
    return () => {
      onSelect(location);
      modals.close();
    };
  };

  return (
    <>
      <h2 className={styles.heading}>
        {t('general.selectLocationFromList.label', 'Select location', 'Select location from the list.')}
      </h2>
      <ul>
        {locations.getSpaces().map((space) => {
          if (skip && skip.filter((l) => l.locationId === space.locationId).length) return null;
          return (
            <li key={space.locationId}>
              <button type='button' onClick={select(space)}>
                {space.name}
              </button>
            </li>
          );
        })}
      </ul>
      <Button onClick={() => modals.close()} size='lg' variant='outlined'>
        {t('general.closeButton.label', 'Close', 'Close button.')}
      </Button>
    </>
  );
};
