import { Button } from '@core/ui/components/Button';
import AddIcon from '@assets/icons/LevelNOW/add.svg?component';

export default function AddButton({ label }: { label: string }) {
  return (
    <Button
      variant='solid'
      //   startIcon={<AddIcon />}
      iconColor='white'
      fontSize='md'
      fontWeight='medium'
      className='px-3 tracking-32 text-common-white'
    >
      <AddIcon className='mr-2' />
      Add {label}
    </Button>
  );
}
