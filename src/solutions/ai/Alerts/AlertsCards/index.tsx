import AlertsCard from '../AlertsCard';

type AlertCardProps = {
  className?: string;
};

export default function AlertCards({ className }: AlertCardProps) {
  return (
    <div className={className}>
      <AlertsCard className='absolute top-4 right-4 w-[380px]' />
      <AlertsCard className='w-[380px]' />
    </div>
  );
}
