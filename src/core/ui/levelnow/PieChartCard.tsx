import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { PieChartData } from '@core/api/types';
import { Card } from '../components/Card';
import { CardContent } from '../components/CardContent';

type PieChartCardProps = {
  data: PieChartData;
  status: 'total' | 'ratio';
  total?: boolean;
  name?: string;
};

export default function PieChartCard({ data, status, total, name }: PieChartCardProps) {
  const amounts = (() => {
    switch (status) {
      case 'total':
        return 'Total';
      case 'ratio':
        return 'Ratio %';
      default:
        return 'Unknown';
    }
  })();

  return (
    <Card className='bg-neutral-50'>
      <CardContent className='flex flex-col gap-10 px-5 py-12'>
        <div className='relative flex items-center justify-center w-full'>
          <ResponsiveContainer height={144}>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={50.4}
                outerRadius={72}
                paddingAngle={2}
                dataKey='value'
                startAngle={0}
                endAngle={-360}
              >
                {data.map((entry) => (
                  <Cell key={entry.range} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {total && (
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <span className='text-base font-medium tracking-32 text-neutral-900'>Total {name}</span>
              <span className='text-[40px] font-medium tracking-[0.8px] text-neutral-900'>{0}</span>
            </div>
          )}
        </div>
        {/* Legend */}
        <div className='flex flex-col gap-4 p-2'>
          <div className='flex items-center justify-between pb-3 font-medium border-b border-neutral-200 text-md tracking-32 text-neutral-900'>
            <div>Status</div>
            <div>{amounts}</div>
          </div>
          <div className='flex flex-col gap-4'>
            {data.map((item) => (
              <div key={item.range} className='flex items-center justify-between gap-2'>
                <div className='w-2.5 aspect-square rounded-full' style={{ backgroundColor: item.color }} />
                <span className='grow text-sm font-medium text-secondary-500 min-w-[85px]'>{item.range}</span>
                <span className='text-sm font-medium text-neutral-900'>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
