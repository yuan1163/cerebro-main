import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

// core ui components
import { Card } from '@core/ui/components/Card';
import { CardHeader } from '@core/ui/components/CardHeader';
import { CardContent } from '@core/ui/components/CardContent';
import { Header } from '@core/ui/cerebro/Header';

// utils
import { t } from '@core/utils/translate';
import {
  formatTankLevelCounts,
  getTankBatteryRatio,
  getTankErorRatio,
  getTankGatewayRatio,
} from '@core/utils/levelnow/tankLevelCounts';

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
  const tankGatewayRatio = getTankGatewayRatio(tanks);
  const tankBatteryLowRatio = getTankBatteryRatio(tanks);
  const tankErrorRatio = getTankErorRatio(tanks);

  const levelLowAmounts = tankLevelCounts.find((item) => item.range === '<100L')?.value || 0;
  const offlineAmounts = tanks.filter((tank) => tank.deviceConnection === 1).length || 0;
  const batteryLowAmounts = tanks.filter((tank) => tank.deviceBattery === 1).length || 0;
  const errorAmounts = tanks.filter((tank) => tank.deviceFault === 1).length || 0;

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
        <Link to='levellow'>
          <Card className='rounded-[10px] shadow-card flex flex-col cursor-pointer relative overflow-hidden hover:outline outline-1 hover:outline-primary-500'>
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
          </Card>
        </Link>

        {/* Offline */}
        <Link to='offline'>
          <Card className='rounded-[10px] shadow-card flex flex-col cursor-pointer relative overflow-hidden hover:outline outline-1 hover:outline-primary-500'>
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
              <PieChartCard data={tankGatewayRatio} status='ratio' />
            </CardContent>
          </Card>
        </Link>

        {/* Battery Low */}
        <Link to='batterylow'>
          <Card className='rounded-[10px] shadow-card flex flex-col cursor-pointer relative overflow-hidden hover:outline outline-1 hover:outline-primary-500'>
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
              <PieChartCard data={tankBatteryLowRatio} status='ratio' />
            </CardContent>
          </Card>
        </Link>

        {/* Sensor Error */}
        <Link to='sensorerror'>
          <Card className='rounded-[10px] shadow-card flex flex-col cursor-pointer relative overflow-hidden hover:outline outline-1 hover:outline-primary-500'>
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
              <PieChartCard data={tankErrorRatio} status='ratio' />
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
});
export default SnapshotPage;
