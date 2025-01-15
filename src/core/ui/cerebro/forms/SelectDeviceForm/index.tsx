import React from 'react';

// utils

import { t } from '@core/utils/translate';

import { Device } from '@core/api/types';

import { useUI } from '@core/storages/ui';
import { useModals } from '@core/storages/modals';
import { useDeviceItems } from '@core/storages/controllers/deviceItems';

import { Button } from '@core/ui/components/Button';

import { cn } from '@core/utils/classnames';
import styles from '../forms.module.scss';

type Props = {
  onSelect: (device: Device) => void;
  skip?: Device[];
};

export const SelectDeviceForm: React.FC<Props> = ({ onSelect, skip }) => {
  const ui = useUI();
  const modals = useModals();
  const devices = useDeviceItems({
    locationId: ui.currentFormation,
  });

  const select = (device: Device) => {
    return () => {
      onSelect(device);
      modals.close();
    };
  };

  return (
    <>
      <h2 className={styles.heading}>
        `${t('asset.selectDevice.label', 'Select device', 'Select a device from the list.')}:`
      </h2>
      <ul>
        {devices.hasData() &&
          devices.getData().map((device) => {
            if (skip && skip.filter((d) => d.deviceId === device.deviceId).length) return null;
            return (
              <li key={device.deviceId}>
                <button type='button' onClick={select(device)}>
                  {device.name}
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
