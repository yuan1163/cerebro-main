import React from 'react';

// utils

import { t } from '@core/utils/translate';

// types

import { AssetGroup } from '@core/api/types';

// storages

import { useUI } from '@core/storages/ui';
import { useModals } from '@core/storages/modals';
import { useAssetGroups } from '@core/storages/controllers/assetGroups';

// components

import { Button } from '@core/ui/components/Button';

// styles

import { cn } from '@core/utils/classnames';
import styles from '../forms.module.scss';

type Props = {
  onSelect: (group: AssetGroup) => void;
  skip?: AssetGroup[];
};

export const SelectGroupForm: React.FC<Props> = ({ onSelect, skip }) => {
  const ui = useUI();
  const modals = useModals();
  const groups = useAssetGroups({
    locationId: ui.currentFormation,
  });

  const select = (group: AssetGroup) => {
    return () => {
      onSelect(group);
      modals.close();
    };
  };

  return (
    <>
      <h2 className={styles.heading}>
        {t(
          'general.selectGroupFromList.label',
          'Select group',
          'Prompt used to instruct users to choose a specific group from a list.',
        )}
        :
      </h2>
      <ul>
        {groups.hasData() &&
          groups.getData().map((group) => {
            if (skip && skip.filter((g) => g.groupId === group.groupId).length) return null;
            return (
              <li key={group.groupId}>
                <button type='button' onClick={select(group)}>
                  {group.name}
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
