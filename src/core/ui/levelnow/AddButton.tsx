import { Button } from '@core/ui/components/Button';
import AddIcon from '@assets/icons/LevelNOW/add.svg?component';

type AddButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};
export default function AddButton({ label, onClick, disabled }: AddButtonProps) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant='solid'
      iconColor='white'
      fontSize='md'
      fontWeight='medium'
      className='px-3 text-white tracking-32 disabled:bg-primary-600'
    >
      <AddIcon className='mr-2' />
      Add {label}
    </Button>
  );
}
