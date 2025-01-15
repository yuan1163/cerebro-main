import { useUI } from '@core/storages/ui';
import { DataSelect } from '@core/ui/components/DataSelect';
import { Unit } from '@solutions/ems/Reporting/data/unit';
import { useUnit } from '@solutions/ems/Reporting/storages/controllers/unit';

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

export const UnitSelect: React.FC<Props> = ({
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
  const controller = useUnit({
    locationId: ui.currentFormation,
  });
  const unitOptions: Unit[] | [] | undefined = controller.get({ locationId: ui.currentFormation });
  const options: number[] | undefined = unitOptions?.map((unit) => unit.unitId);

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
        present={(item) => {
          return unitOptions && unitOptions.filter((unit) => unit.unitId === item).length
            ? unitOptions.filter((unit) => unit.unitId === item)[0].name
            : 'Select unit';
        }}
        severity={severity}
        value={value}
      />
    </>
  );
};
