import { Search } from '@core/ui/components/Search';

type SearchBarProps = { onChange: (query: string) => void };

export default function SearchBar({ onChange }: SearchBarProps) {
  return <Search onChange={onChange} customSize className='h-8' />;
}
