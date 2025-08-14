import { Search } from '@core/ui/components/Search';

type TankSearchProps = { onChange: (query: string) => void };

export default function TankSearch({ onChange }: TankSearchProps) {
  return <Search onChange={onChange} customSize className='h-8' />;
}
