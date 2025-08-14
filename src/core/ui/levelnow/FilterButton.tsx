import { Button } from '@core/ui/components/Button';
import FilterIcon from '@assets/icons/LevelNOW/filter.svg?component';

type FilterButtonProps = {
  onClick?: () => void;
};

export default function FilterButton({ onClick }: FilterButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant='outlined'
      iconColor='neutral-900'
      fontSize='md'
      fontWeight='medium'
      className='px-3 tracking-32 text-neutral-900'
    >
      <FilterIcon className='mr-2' />
      Filters
    </Button>
  );
}
