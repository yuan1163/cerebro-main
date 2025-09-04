import { Button } from '@core/ui/components/Button';
import FilterIcon from '@assets/icons/LevelNOW/filter.svg?component';

import NumberBadge from '@core/ui/levelnow/NumberBadge';
// utils
import { t } from '@core/utils/translate';

type FilterButtonProps = {
  counts?: number;
  onClick?: () => void;
  onClear?: () => void;
};

export default function FilterButton({ counts = 0, onClick, onClear }: FilterButtonProps) {
  const isActived = counts > 0;
  return (
    <div className='flex items-center gap-3'>
      {isActived && (
        <span onClick={onClear} className='font-medium cursor-pointer text-md text-primary-500'>
          {t('solutions.events.clearFilters', 'Clear', 'Clear all active filters.')}
        </span>
      )}
      <Button
        onClick={onClick}
        variant='outlined'
        iconColor='neutral-900'
        fontSize='md'
        fontWeight='medium'
        className='px-3 tracking-32 text-neutral-900'
      >
        <FilterIcon className='mr-2' />
        {t('general.filters.label', 'Filters', 'Various options hat users can apply to refine the displayed content.')}
        {isActived && <NumberBadge variant='actived' number={counts} className='ml-2' />}
      </Button>
    </div>
  );
}
