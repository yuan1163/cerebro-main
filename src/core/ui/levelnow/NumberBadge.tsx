import { Badge } from '@core/ui/components/Badge';

type NumberBadgeProps = {
  number: number;
  variant: 'gray' | 'actived';
  className?: string;
};

export default function NumberBadge({ number, variant = 'gray', className }: NumberBadgeProps) {
  return (
    <Badge variant={variant} className={className}>
      {number}
    </Badge>
  );
}
