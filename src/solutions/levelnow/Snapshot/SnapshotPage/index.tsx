import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

// core ui components
import { Card } from '@core/ui/components/Card';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import { Header } from '@core/ui/cerebro/Header';

// utils
import { t } from '@core/utils/translate';
import { formatTankLevelCounts } from '@core/utils/levelnow/tankLevelCounts';

// icons
import SnapshotLineIcon from '@assets/icons/LevelNOW/sidebar/snapshot-line.svg?component';
import LevelLowIcon from '@assets/icons/LevelNOW/snapshot/level-low.svg?component';
import OfflineIcon from '@assets/icons/LevelNOW/snapshot/offline.svg?component';
import BatteryLowIcon from '@assets/icons/LevelNOW/snapshot/battery-low.svg?component';
import ErrorIcon from '@assets/icons/LevelNOW/snapshot/error.svg?component';

// hools
import { useTanks } from '@core/storages/controllers/levelnow/tank';
import PieChartCard from '@core/ui/levelnow/PieChartCard';
import { Link } from '@nodemodules/react-router-dom/dist';
import { observer } from 'mobx-react';
import { useEvents } from '@core/storages/controllers/levelnow/event';

// types
import { EventType, PieChartData } from '@core/api/types';

/* Mock network ratio data, replace this with actual data from tanks,
and use function in @core/utils/levelnow/tankLevelCounts.ts
*/
const MOCK_NETWORK_RATIO = [
  { range: 'Wifi', value: 0, color: '#00AAF3' },
  { range: 'Sims 4G', value: 100, color: '#FFC9C9' },
];
const SnapshotPage = observer(() => {
  const tanks = useTanks();
  const tankLevelCounts = formatTankLevelCounts(tanks);

  const events = useEvents();
  const levelLowEvents = useEvents({ eventType: EventType.LowLevel });
  const offlineEvents = useEvents({ eventType: EventType.Offline });
  const batteryLowEvents = useEvents({ eventType: EventType.BatteryLow });
  const sensorErrorEvents = useEvents({ eventType: EventType.SensorError });

  const totalEvents = events.length || 0;
  const levelLowAmounts = levelLowEvents.length || 0;
  const offlineAmounts = offlineEvents.length || 0;
  const batteryLowAmounts = batteryLowEvents.length || 0;
  const errorAmounts = sensorErrorEvents.length || 0;

  const getRatio = (labels: string[], amounts: number, total: number): PieChartData => {
    const restAmounts = total - amounts;
    const data: PieChartData = [
      {
        range: labels[0],
        value: total === 0 ? 0 : parseFloat(((restAmounts / total) * 100).toFixed(1)),
        color: '#00AAF3',
      },
      {
        range: labels[1],
        value: total === 0 ? 0 : parseFloat(((amounts / total) * 100).toFixed(1)),
        color: '#FFC9C9',
      },
    ];
    return data;
  };

  const gatewayRatio = getRatio(['On-line', 'Off-line'], offlineAmounts, totalEvents);
  const batteryRatio = getRatio(['High', 'Low'], batteryLowAmounts, totalEvents);
  const sensorRatio = getRatio(['OK', 'Sensor Error'], errorAmounts, totalEvents);

  return (
    <>
      <Header
        icon={<SnapshotLineIcon />}
        title={t('snapshot.snapshot.label', 'Snapshot', 'Snapshot title.')}
        widgets={false}
      />
      <div className='grid grid-cols-[minmax(400px,_1fr)_1fr_1fr_1fr_1fr] flex-1 gap-5'>
        {/* Overview */}
        <Card className='rounded-[10px] shadow-card flex flex-col min-w-[400px]'>
          <CardHeader justifyContent='between'>
            <div className='flex items-center gap-3'>
              <h1 className='text-lg font-medium tracking-36 text-neutral-900'>
                {t('snapshot.overview.label', 'Overview', 'Snapshot overview.')}
              </h1>
            </div>
          </CardHeader>
          <CardContent className='flex flex-col flex-1 gap-8 p-5'>
            <h3 className='font-medium text-md tracking-32 text-neutral-900'>
              {t('snapshot.oillevel.label', 'Oil Level', 'Oil Level title.')}
            </h3>
            {/* Center donut chart */}
            <div className='relative flex items-center justify-center w-full'>
              <ResponsiveContainer width={240} height={240}>
                <PieChart>
                  <Pie
                    data={tankLevelCounts}
                    cx='50%'
                    cy='50%'
                    innerRadius={84}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey='value'
                    startAngle={0}
                    endAngle={-360}
                  >
                    {tankLevelCounts.map((entry) => (
                      <Cell key={entry.range} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <span className='text-base font-medium tracking-32 text-neutral-900'>
                  {t('snapshot.totaltanks.label', 'Total Tanks', 'Total tanks in the system.')}
                </span>
                <span className='text-[40px] font-medium tracking-[0.8px] text-neutral-900'>{tanks.length}</span>
              </div>
            </div>

            {/* Legend */}
            <div className='flex flex-col gap-5'>
              <div className='flex items-center justify-between pb-3 font-medium border-b border-neutral-200 text-md tracking-32 text-neutral-900'>
                <div>{t('general.status.label', 'Status', 'Status label in table header.')}</div>
                <div>{t('general.total.label', 'Total', 'Total label in table header.')}</div>
              </div>
              <div className='flex flex-col gap-5'>
                {tankLevelCounts.map((level) => (
                  <div key={level.range} className='flex items-center justify-between gap-2'>
                    <div className='w-2.5 aspect-square rounded-full' style={{ backgroundColor: level.color }} />
                    <span className='grow text-sm font-medium text-secondary-500 min-w-[85px]'>{level.range}</span>
                    <span className='text-sm font-medium text-neutral-900'>{level.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Level Low */}
        <Card className='rounded-[10px] shadow-card flex flex-col cursor-pointer relative overflow-hidden hover:outline outline-1 hover:outline-primary-500'>
          <Link to='levellow'>
            <CardHeader justifyContent='between' borderBottom>
              <div className='flex items-center gap-3'>
                <h1 className='text-lg font-medium tracking-36 text-neutral-900'>
                  {t('snapshot.levellow.label', 'Level Low', 'Level Low title.')}
                </h1>
              </div>
              <div className='absolute -top-3 -right-2 w-[60px] aspect-square rounded-full bg-primary-50 flex items-center justify-center'>
                <LevelLowIcon />
              </div>
            </CardHeader>
            <CardContent className='flex flex-col flex-1 gap-5 p-5'>
              <div className='flex items-center justify-center h-[200px] text-[52px] font-medium text-secondary-500'>
                {levelLowAmounts}
              </div>
              <h3 className='font-medium text-md tracking-32 text-neutral-900'>
                {t('snapshot.networkconnection.label', 'Network Connection', 'Network Connection title.')}
              </h3>
              <PieChartCard data={MOCK_NETWORK_RATIO} status='ratio' />
            </CardContent>
          </Link>
        </Card>

        {/* Offline */}
        <Card className='rounded-[10px] shadow-card flex flex-col cursor-pointer relative overflow-hidden hover:outline outline-1 hover:outline-primary-500'>
          <Link to='offline'>
            <CardHeader justifyContent='between' borderBottom>
              <div className='flex items-center gap-3'>
                <h1 className='text-lg font-medium tracking-36 text-neutral-900'>
                  {t('snapshot.offline.label', 'Off-line', 'Offline title.')}
                </h1>
              </div>
              <div className='absolute -top-3 -right-2 w-[60px] aspect-square rounded-full bg-primary-50 flex items-center justify-center'>
                <OfflineIcon />
              </div>
            </CardHeader>
            <CardContent className='flex flex-col flex-1 gap-5 p-5'>
              <div className='flex items-center justify-center h-[200px] text-[52px] font-medium text-secondary-500'>
                {offlineAmounts}
              </div>
              <h3 className='font-medium text-md tracking-32 text-neutral-900'>
                {t('snapshot.gatewaystatus.label', 'Gateway Status', 'Gateway Status title.')}
              </h3>
              <PieChartCard data={gatewayRatio} status='ratio' />
            </CardContent>
          </Link>
        </Card>

        {/* Battery Low */}
        <Card className='rounded-[10px] shadow-card flex flex-col cursor-pointer relative overflow-hidden hover:outline outline-1 hover:outline-primary-500'>
          <Link to='batterylow'>
            <CardHeader justifyContent='between' borderBottom>
              <div className='flex items-center gap-3'>
                <h1 className='text-lg font-medium tracking-36 text-neutral-900'>
                  {t('snapshot.batterylow.label', 'Battery Low', 'Battery Low title.')}
                </h1>
              </div>
              <div className='absolute -top-3 -right-2 w-[60px] aspect-square rounded-full bg-primary-50 flex items-center justify-center'>
                <BatteryLowIcon />
              </div>
            </CardHeader>
            <CardContent className='flex flex-col flex-1 gap-5 p-5'>
              <div className='flex items-center justify-center h-[200px] text-[52px] font-medium text-secondary-500'>
                {batteryLowAmounts}
              </div>
              <h3 className='font-medium text-md tracking-32 text-neutral-900'>
                {t('snapshot.batterylevel.label', 'Battery Level', 'Battery Level title.')}
              </h3>
              <PieChartCard data={batteryRatio} status='ratio' />
            </CardContent>
          </Link>
        </Card>

        {/* Sensor Error */}
        <Card className='rounded-[10px] shadow-card flex flex-col cursor-pointer relative overflow-hidden hover:outline outline-1 hover:outline-primary-500'>
          <Link to='sensorerror'>
            <CardHeader justifyContent='between' borderBottom>
              <div className='flex items-center gap-3'>
                <h1 className='text-lg font-medium tracking-36 text-neutral-900'>
                  {t('snapshot.sensorerror.label', 'Sensor Error', 'Sensor Error title.')}
                </h1>
              </div>
              <div className='absolute -top-3 -right-2 w-[60px] aspect-square rounded-full bg-primary-50 flex items-center justify-center'>
                <ErrorIcon />
              </div>
            </CardHeader>
            <CardContent className='flex flex-col flex-1 gap-5 p-5'>
              <div className='flex items-center justify-center h-[200px] text-[52px] font-medium text-secondary-500'>
                {errorAmounts}
              </div>
              <h3 className='font-medium text-md tracking-32 text-neutral-900'>
                {t('snapshot.sensors.label', 'Sensors', 'Sensors title.')}
              </h3>
              <PieChartCard data={sensorRatio} status='ratio' />
            </CardContent>
          </Link>
        </Card>
      </div>
    </>
  );
});
export default SnapshotPage;
