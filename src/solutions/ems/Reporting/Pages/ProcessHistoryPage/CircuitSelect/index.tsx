import { useUI } from '@core/storages/ui';
import { DataSelect } from '@core/ui/components/DataSelect';
import { getDeviceCircuitById } from '@solutions/ems/Reporting/data/processHistory';

// utils

import { t } from '@core/utils/translate';

type Props = {
  className?: string;
  placeholder?: string;
  value: number | string;
  onSelect: (unit: number) => void;
  label?: string;
  disabled?: boolean;
  helperText?: string;
  severity?: 'error' | 'success' | 'warning' | (string & {});
};

export const CircuitSelect: React.FC<Props> = ({
  className,
  placeholder = t(
    'general.selectCategory.label',
    'Select Category',
    'Prompt instructs users to choose a specific category from a list.',
  ),
  value,
  onSelect,
  label,
  disabled,
  helperText,
  severity,
}) => {
  const ui = useUI();
  const deviceCircuit = getDeviceCircuitById(ui.currentFormation);

  const options: string[] = deviceCircuit.map(
    (circuit) => `${circuit ? circuit.deviceId : '-'}_${circuit ? circuit.index : '-'}`,
  );

  const present = (value: string) => {
    const [deviceId, index] = value.split('_', 2);

    const circuit = deviceCircuit.filter((item) => item.deviceId === deviceId && item.index === index)[0];

    return circuit ? `${circuit?.partLocationName} - ${circuit?.description}` : 'Select circuit loop';
  };

  return (
    <>
      <DataSelect
        className={className}
        options={options}
        placeholder={placeholder}
        present={present}
        value={value}
        onChange={(value) => {
          return onSelect(value);
        }}
        label={label}
        severity={severity}
        helperText={helperText}
        disabled={disabled}
      />
    </>
  );
};
