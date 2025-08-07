import { Badge } from '@core/ui/components/Badge';
import React from 'react';

export default function NumberBadge({ number }: { number: number }) {
  return <Badge variant='gray'>{number}</Badge>;
}
