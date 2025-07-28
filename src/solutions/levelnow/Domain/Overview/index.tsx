// import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';

const data = [
  { name: '>205L', value: 3, color: '#22c55e' },
  { name: '100-250L', value: 6, color: '#f97316' },
  { name: '<100L', value: 3, color: '#ef4444' },
];

const stats = [
  { label: 'Customers', value: 5 },
  { label: 'Locations', value: 4 },
  { label: 'Off-line', value: 0 },
  { label: 'Battery Low', value: 1 },
];

export default function Overview() {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <Card>
      <CardContent>
        <div className='flex items-center justify-between'>
          {/* Left side stats */}
          <div className='flex flex-col gap-5'>
            {stats.map((stat) => (
              <div key={stat.label} className='flex items-center justify-between min-w-[135px]'>
                <span className='text-sm font-medium tracking-wide text-secondary-500'>{stat.label}</span>
                <span className='text-sm font-medium text-neutral-900'>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Center donut chart */}
          {/* <div className='relative'>
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie data={data} cx='50%' cy='50%' innerRadius={60} outerRadius={80} paddingAngle={2} dataKey='value'>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <span className='text-sm text-muted-foreground'>Tanks</span>
              <span className='text-3xl font-bold'>{total}</span>
            </div>
          </div> */}

          {/* Right side legend */}
          <div className='flex flex-col gap-5'>
            {data.map((item) => (
              <div key={item.name} className='flex items-center justify-between gap-2'>
                <div className='w-2.5 aspect-square rounded-full' style={{ backgroundColor: item.color }} />
                <span className='text-sm font-medium text-secondary-500 min-w-[85px]'>{item.name}</span>
                <span className='text-sm font-medium text-neutral-900'>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
