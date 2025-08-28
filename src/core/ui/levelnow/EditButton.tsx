import { Button } from '../components/Button';
import EditIcon from '@assets/icons/LevelNOW/edit.svg?component';

type EditButtonProps = {
  onEdit?: () => void;
};

export default function EditButton({ onEdit }: EditButtonProps) {
  return (
    <Button onClick={onEdit} variant='outlined' className='p-0 w-9 h-9 aspect-square border-neutral-200'>
      <EditIcon />
    </Button>
  );
}
