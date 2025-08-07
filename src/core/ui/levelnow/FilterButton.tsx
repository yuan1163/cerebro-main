import { Button } from '@core/ui/components/Button';
import FilterIcon from '@assets/icons/LevelNOW/filter.svg?component';

export default function FilterButton() {
  return (
    <Button
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
