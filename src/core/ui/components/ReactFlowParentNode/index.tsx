import React, { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

// components

import { Text } from '@core/ui/components/Text';

export type ReactFlowParentNodeData = {
  label?: string;
};

export const ReactFlowParentNode = memo(
  ({ data }: NodeProps<ReactFlowParentNodeData>) => {
    return (
      <>
        <Handle
          className="react-flow__parent-handle"
          type="target"
          position={Position.Left}
          isConnectable={false}
        />
        {data?.label && (
          <div className="label">
            <Text
              casing="capitalize"
              overflow="hidden"
              textOverflow="ellipsis"
              variant="xs"
              weight="medium"
              whiteSpace="nowrap"
            >
              {data.label}
            </Text>
          </div>
        )}
        <Handle
          className="react-flow__parent-handle"
          type="source"
          position={Position.Right}
          isConnectable={false}
        />
      </>
    );
  }
);
