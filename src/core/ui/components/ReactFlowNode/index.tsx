import React, { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

// utils

import { getCommandCenterSeverity } from '@core/utils/getCommandCenterSeverity';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

// icons

import CpuChip01LineIcon from '@assets/icons/line/cpu-chip-01.svg?component';
import FloorPlanLineIcon from '@assets/icons/line/floor-plan.svg?component';
import MinusLineIcon from '@assets/icons/line/minus.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';
import RouteLineIcon from '@assets/icons/line/route.svg?component';
import Server02LineIcon from '@assets/icons/line/server-02.svg?component';
import ZoneLineIcon from '@assets/icons/line/zone.svg?component';

export type ReactFlowNodeData = {
  arrayType?: string;
  firstElement?: boolean;
  handlePosition?: Position;
  icon?: React.ReactNode;
  iconState?: boolean;
  riskLevel?: number;
  severity?: string;
  title?: string;
  variant?: 'output' | 'input' | 'basic';
};

export const ReactFlowNode = memo(({ data }: NodeProps<ReactFlowNodeData>) => {
  const handleIcon = data.iconState ? <MinusLineIcon /> : <PlusLineIcon />;
  let nodeIcon;
  switch (data.arrayType) {
    case 'initialNodes':
      nodeIcon = <FloorPlanLineIcon />;
      break;
    case 'gateways':
      nodeIcon = <Server02LineIcon />;
      break;
    case 'zones':
      nodeIcon = <ZoneLineIcon />;
      break;
    case 'devices':
      nodeIcon = <CpuChip01LineIcon />;
      break;
    case 'curcuits':
      nodeIcon = <RouteLineIcon />;
      break;
    default:
      nodeIcon = <ZoneLineIcon />;
  }

  return (
    <>
      <div className={cn(styles['node-wrapper'])}>
        <Icon color={getCommandCenterSeverity(data.riskLevel || 0)} rounded size='xs' variant='tint'>
          {nodeIcon}
        </Icon>
        {data.title && (
          <Text overflow='hidden' textOverflow='ellipsis' variant='xs' weight='medium' whiteSpace='nowrap'>
            {data.title}
          </Text>
        )}
      </div>
      {data.variant !== 'output' && data.variant !== 'basic' && (
        <Handle type='target' position={Position.Left} isConnectable={false} />
      )}
      {data.variant !== 'input' && data.variant !== 'basic' && (
        <Handle className='react-flow__handle-array' isConnectable={false} position={Position.Right} type='source'>
          <Icon className={styles['icon-array']} color='icon-secondary' rounded size='xxs' variant='plain'>
            {handleIcon}
          </Icon>
        </Handle>
      )}
    </>
  );
});
