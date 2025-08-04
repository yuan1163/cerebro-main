import { observer } from 'mobx-react';
import { useAuth } from '@core/storages/auth';
import { useNavigate } from 'react-router-dom';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Text } from '@core/ui/components/Text';
import { t } from '@core/utils/translate';
import { useSummary } from '@core/storages/controllers/summary';
import { Summary } from '@core/api/types';

export default observer(function Overview() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  if (!profile) {
    navigate('/login');
    return null;
  }
  const summary: Summary | undefined = useSummary({ userId: profile.userId });

  const stats = [
    { label: 'Customers', value: summary?.customerCount || 0 },
    { label: 'Locations', value: summary?.locationsCount || 0 },
    { label: 'Off-line', value: summary?.offlineDeviceCount || 0 },
    { label: 'Battery Low', value: summary?.batteryLowCount || 0 },
  ];

  const levelHighCounts =
    summary?.tankLevelCounts
      ?.filter((item) => item.range === '>205L' || item.range === 'Full')
      .reduce((sum, item) => sum + item.count, 0) || 0;
  const levelMediumCounts = summary?.tankLevelCounts?.find((item) => item.range === '100~205L')?.count || 0;
  const levelLowCounts = summary?.tankLevelCounts?.find((item) => item.range === '<100L')?.count || 0;

  const data = [
    { range: '>205L', value: levelHighCounts, color: '#2CD232' },
    { range: '100~205L', value: levelMediumCounts, color: '#FF982F' },
    { range: '<100L', value: levelLowCounts, color: '#FF4545' },
  ];

  const total = summary?.totalTanks || 0;

  return (
    <Card fullWidth fullHeight elevation='xs'>
      <CardHeader className='flex items-center justify-between'>
        <Text
          component='h3'
          variant='lg'
          weight='medium'
          className='flex items-center tracking-32 text-[#000] h-[34px]'
        >
          {t(
            'solutions.domainOverview.overview',
            'Overview',
            "A summary of the domain's key features and functionalities.",
          )}
        </Text>
      </CardHeader>
      <CardContent disablePaddingTop>
        <div className='flex items-center justify-between bg-neutral-50 rounded-[10px] px-5 py-10'>
          {/* Left side stats */}
          <div className='flex flex-col gap-5'>
            {stats.map((stat) => (
              <div key={stat.label} className='flex items-center justify-between min-w-[135px]'>
                <span className='text-sm font-medium tracking-wide text-secondary-500'>{stat.label}</span>
                <span className='text-sm font-medium text-neutral-900'>{stat.value}</span>
              </div>
            ))}
          </div>
          <div className='flex items-center gap-5'>
            {/* Center donut chart */}
            <div className='relative'>
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={data} cx='50%' cy='50%' innerRadius={56} outerRadius={80} paddingAngle={2} dataKey='value'>
                    {data.map((entry) => (
                      <Cell key={entry.range} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <span className='text-base font-medium tracking-32 text-neutral-900'>Tanks</span>
                <span className='text-[40px] font-medium tracking-[0.8px] text-neutral-900'>{total}</span>
              </div>
            </div>

            {/* Right side legend */}
            <div className='flex flex-col gap-5'>
              {data.map((item) => (
                <div key={item.range} className='flex items-center justify-between gap-2'>
                  <div className='w-2.5 aspect-square rounded-full' style={{ backgroundColor: item.color }} />
                  <span className='text-sm font-medium text-secondary-500 min-w-[85px]'>{item.range}</span>
                  <span className='text-sm font-medium text-neutral-900'>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
