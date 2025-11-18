import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { t } from '@core/utils/translate';
import { useState, useMemo, useRef, useEffect } from 'react';
import Total from './Total';
import ObjectCountingStatistic from './Object Counting Statistic';

// Mock data for the chart
const chartData = [
  { time: '20:09', value: 150 },
  { time: '20:10', value: 160 },

  { time: '20:11', value: 155 },
  { time: '20:12', value: 200 },
  { time: '20:13', value: 110 },
  { time: '20:14', value: 150 },
  { time: '20:15', value: 145 },
  { time: '20:16', value: 185 },
  { time: '20:17', value: 165 },
  { time: '20:18', value: 175 },
  { time: '20:19', value: 150 },
  { time: '20:20', value: 140 },
  { time: '20:21', value: 145 },
  { time: '20:22', value: 155 },
];

export default function Counting() {
  const MAX_VISIBLE_TICKS = 8;
  const [startIndex, setStartIndex] = useState(Math.max(0, chartData.length - MAX_VISIBLE_TICKS));
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const visibleData = useMemo(() => {
    if (chartData.length <= MAX_VISIBLE_TICKS) {
      return chartData;
    }
    return chartData.slice(startIndex, startIndex + MAX_VISIBLE_TICKS);
  }, [startIndex]);

  // Additional wheel event listener to ensure no page scrolling
  useEffect(() => {
    const handleWheelNative = (e: WheelEvent) => {
      if (chartContainerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();

        if (chartData.length <= MAX_VISIBLE_TICKS) return;

        const delta = e.deltaY > 0 ? 1 : -1;
        setStartIndex((prevIndex) => {
          const newIndex = prevIndex + delta;
          const maxIndex = chartData.length - MAX_VISIBLE_TICKS;
          return Math.max(0, Math.min(maxIndex, newIndex));
        });
      }
    };

    const chartContainer = chartContainerRef.current;
    if (chartContainer) {
      chartContainer.addEventListener('wheel', handleWheelNative, { passive: false });

      return () => {
        chartContainer.removeEventListener('wheel', handleWheelNative);
      };
    }
  }, [chartData.length, MAX_VISIBLE_TICKS]);
  return (
    <div className='flex flex-col w-full h-[calc(100vh-205px)] gap-7 overflow-hidden'>
      {/* Total Section */}
      <Total />

      {/* Object Counting Statistic Section */}
      <ObjectCountingStatistic />

      {/* Object Counting Timespan Section */}
      <div className='flex flex-col gap-5'>
        <p className='w-full text-base font-medium text-neutral-900'>
          {t('counting.timespan.label', 'Object Counting Timespan', 'Label for object counting timespan section')}
        </p>
        <div ref={chartContainerRef} className='w-full h-64 overflow-hidden'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={visibleData} margin={{ top: 0, right: 16, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray='0' stroke='#EFF1F4' vertical={false} />
              <XAxis
                dataKey='time'
                tick={{ fill: '#1A1A1A', fontSize: 12, fontFamily: 'Poppins' }}
                tickMargin={15}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={0}
              />
              <YAxis
                tick={{ fill: '#657989', fontSize: 12, fontFamily: 'Poppins' }}
                tickMargin={15}
                axisLine={false}
                tickLine={false}
                domain={[-50, 250]}
                ticks={[-50, 0, 50, 100, 150, 200, 250]}
                type='number'
                allowDataOverflow={false}
              />
              <ReferenceLine y={0} stroke='#657989' strokeWidth={1} />
              {/* <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EAEBEC',
                  borderRadius: '8px',
                  padding: '8px',
                }}
                labelStyle={{
                  color: '#1A1A1A',
                  fontSize: 12,
                  fontFamily: 'Poppins',
                }}
                itemStyle={{
                  color: '#1A1A1A',
                  fontSize: 12,
                  fontFamily: 'Poppins',
                }}
              /> */}
              <Line
                type='monotone'
                dataKey='value'
                stroke='#C5C5C5'
                strokeWidth={2}
                dot={{ stroke: '#C5C5C5', strokeWidth: 3, fill: '#FFFFFF', r: 6 }}
                activeDot={{ stroke: '#00AAF3', strokeWidth: 3, fill: '#FFFFFF', r: 6 }}
                isAnimationActive={false}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
