import { useUI } from '@core/storages/ui';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Process } from '@solutions/ems/Reporting/data/process';
import { useProcess } from '@solutions/ems/Reporting/storages/controllers/process';

type Props = {
  inputId: string;
  className?: string;
  placeholder?: string;
  value: number | string;
  onSelect: (unit: number) => void;
  label?: string;
  disabled?: boolean;
  helperText?: string;
  severity?: 'error' | 'success' | 'warning' | (string & {});
};

export const ProcessSelect: React.FC<Props> = ({
  inputId,
  className,
  placeholder = 'Select category',
  value,
  onSelect,
  label,
  disabled,
  helperText,
  severity,
}) => {
  const ui = useUI();
  const controller = useProcess({
    locationId: ui.currentFormation,
  });

  const processOptions: Process[] | [] | undefined = controller.get({ locationId: ui.currentFormation });
  const options: number[] | undefined = processOptions?.map((process) => process.processId);

  return (
    <>
      <DataSelect
        className={className}
        disabled={disabled}
        helperText={helperText}
        id={inputId}
        label={label}
        onChange={(value) => {
          return onSelect(value);
        }}
        options={options}
        placeholder={placeholder}
        present={(item) =>
          processOptions ? processOptions.filter((process) => process.processId === item)[0]?.name : 'Select process'
        }
        severity={severity}
        value={value}
      />
    </>
  );
};
