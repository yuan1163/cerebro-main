import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  Connection,
  NodeProps,
  MiniMap,
  Panel,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

// utils

import { t } from '@core/utils/translate';

// storages

import { useUI } from '@core/storages/ui';
import { useLocations } from '@core/storages/controllers/locations';

// components

import { AlertsLegendMap } from '@core/ui/components/AlertsLegendMap';
import { ButtonGroup } from '@core/ui/components/ButtonGroup';
import { IconButton } from '@core/ui/components/IconButton';
import { ReactFlowEdge } from '@core/ui/components/ReactFlowEdge';
import { ReactFlowNode } from '@core/ui/components/ReactFlowNode';
import { ReactFlowParentNode } from '@core/ui/components/ReactFlowParentNode';

// icons

import Maximize02LineIcon from '@assets/icons/line/maximize-02.svg?component';
import MinusLineIcon from '@assets/icons/line/minus.svg?component';
import PlusLineIcon from '@assets/icons/line/plus.svg?component';

// types

const edgeTypes = {
  customNode: ReactFlowEdge,
};

const defaultEdgeOptions = {
  type: 'customNode',
};

interface ExtendedNode extends Node {
  data: {
    title?: string;
    childrenVisible?: boolean;
    iconState?: boolean;
  };
  parent?: string | null;
  name?: string;
}

interface Device {
  name: string;
}

interface Item {
  [key: string]: any[] | any;
  devices?: Device[];
  gateways?: Item[];
  index?: string;
  name?: string;
  zones?: Item[];
}

// NODE COMPONENT

const nodeTypes = {
  customNode: (nodeProps: NodeProps) => {
    const isFirstElement = nodeProps.id.endsWith('-0');
    return (
      <ReactFlowNode
        {...nodeProps}
        data={{
          ...nodeProps.data,
          firstElement: isFirstElement,
        }}
      />
    );
  },
  customNodeInput: (nodeProps: NodeProps) => {
    const isFirstElement = nodeProps.id.endsWith('-0');
    return (
      <ReactFlowNode {...nodeProps} data={{ ...nodeProps.data, firstElement: isFirstElement, variant: 'input' }} />
    );
  },
  customNodeOutput: (nodeProps: NodeProps) => {
    const isFirstElement = nodeProps.id.endsWith('-0');
    return (
      <ReactFlowNode {...nodeProps} data={{ ...nodeProps.data, firstElement: isFirstElement, variant: 'output' }} />
    );
  },
  customNodeBasic: (nodeProps: NodeProps) => {
    const isFirstElement = nodeProps.id.endsWith('-0');
    return (
      <ReactFlowNode {...nodeProps} data={{ ...nodeProps.data, firstElement: isFirstElement, variant: 'basic' }} />
    );
  },
  parentNode: ReactFlowParentNode,
};

// VARIABLES

const nodeLeftPadding = 4;
const nodeIconWidth = 24;
const nodeRightPadding = 8;
const labelLeftPadding = 8;
const pixelsPerCharacter = 7;
const childNodeHeight = 32;
const labelHeight = 52;
const gapOffset = childNodeHeight;
const padding = 40;
const xOffset = 220;
const yOffset = childNodeHeight + gapOffset + padding * 2;
const baseNodeWidth = 64;

// CHILD NODE WIDTH

const calculateItemWidth = (item: ExtendedNode) => {
  return (
    nodeLeftPadding +
    nodeIconWidth +
    labelLeftPadding +
    nodeRightPadding +
    (item.name?.length || 0) * pixelsPerCharacter
  );
};

// CHILD NODE MAX WIDTH

const calculateMaxWidth = (items: ExtendedNode[]) => {
  return items.reduce((maxWidth, item) => {
    const itemWidth = calculateItemWidth(item);
    return Math.max(maxWidth, itemWidth);
  }, 0);
};

// PARENT NODE WIDTH & HEIGHT

const calculateDimensions = (items: ExtendedNode[]) => {
  const maxWidth = calculateMaxWidth(items) + padding * 2;
  const totalHeight = items.length * childNodeHeight + (items.length - 1) * gapOffset + childNodeHeight * 2;
  return { width: maxWidth, height: totalHeight };
};

function calculateIndividualNodeWidth(item: ExtendedNode | Item) {
  const nameLength = item.name ? item.name.length : 0;
  return baseNodeWidth + nameLength * pixelsPerCharacter + padding / 2;
}

function calculateTotalHeight(items: (ExtendedNode | Item)[]) {
  return items.length * childNodeHeight + (items.length > 1 ? items.length - 1 : 1) * gapOffset + padding;
}

// function findParentNodes(nodeId, nodes) {
//   let parentNodeIds = [];
//   const pattern = new RegExp(`^${nodeId}-[a-zA-Z]+`);

//   nodes.forEach((node) => {
//     if (node.type === 'parentNode' && pattern.test(node.id)) {
//       parentNodeIds.push(node.id);
//     }
//   });

//   return parentNodeIds;
// }

// SUB-FLOWS

// function findArrayNamesWithNames(nodes: ExtendedNode[]): string[] {
//   let arrayNames: string[] = [];

//   function addArrayName(obj: { [key: string]: any }, path: string = '') {
//     Object.keys(obj).forEach((key) => {
//       if (Array.isArray(obj[key]) && obj[key].length > 0) {
//         const currentPath = path ? `${path}-${key}` : key;
//         arrayNames.push(currentPath);
//         obj[key].forEach((item: any, index: number) => {
//           if (typeof item === 'object' && item !== null) {
//             addArrayName(item, `${currentPath}-${index}`);
//           }
//         });
//       }
//     });
//   }

//   nodes.forEach((node) => {
//     if (node.name) {
//       addArrayName(node, node.name);
//     }
//   });

//   return arrayNames;
// }

// MAP

export const ReactFlowMap = React.memo(
  ({ initialNodes, initialEdges }: { initialNodes: Node[]; initialEdges: Edge[] }) => {
    const ui = useUI();
    const locations = useLocations();
    const activeFormation = locations.getElementById(ui.currentFormation);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const { setViewport, zoomIn, zoomOut } = useReactFlow();

    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);

    const floorNodeNames = initialNodes.map((node: ExtendedNode) => node.name);

    const isLastLevelNode = (item: Item) => {
      return Object.keys(item).every((key) => !Array.isArray(item[key]) || item[key].length === 0);
    };

    let lastZonesYPosition = 0;

    // SUB-FLOW NAMES

    // const arrayNames = useMemo(() => {
    //   if (initialNodes && Array.isArray(initialNodes)) {
    //     return findArrayNamesWithNames(initialNodes);
    //   }
    //   return [];
    // }, [initialNodes]);

    const calculateNodePosition = (index: number, depth: number, parentYPosition: number) => {
      let x = depth * xOffset;
      let y = index === 0 ? parentYPosition : parentYPosition + index * childNodeHeight * 2;
      return { x, y };
    };

    function formatName(name: string): string {
      return name.replace(/\s+/g, '');
    }

    function determineArrayType(item: Item): string {
      if (item.hasOwnProperty('zones')) {
        return 'initialNodes';
      } else if (item.hasOwnProperty('gateways')) {
        return 'zones';
      } else if (item.hasOwnProperty('devices')) {
        return 'gateways';
      } else if (item.hasOwnProperty('curcuits')) {
        return 'devices';
      } else {
        return 'curcuits';
      }
    }

    const createNodesAndEdges = (
      data: Item[],
      parentId: string | null = null,
      parentYPosition: number = 0,
      depth: number = 0,
      arrayName: string | null = null,
    ) => {
      let nodes: Node[] = [],
        edges: Edge[] = [];
      data.forEach((item, index) => {
        const baseId = formatName((item.name || item.index) ?? '');
        let nodeId: string;
        if (parentId) {
          nodeId = arrayName ? `${parentId}-${arrayName}-${baseId}-${index}` : `${parentId}-${baseId}-${index}`;
        } else {
          nodeId = baseId;
        }

        // POSITION

        const position = calculateNodePosition(index, depth, parentYPosition);
        let lastZonesYPosition = 0;
        const calculateMaxDepth = (item: Item, currentDepth = 0) => {
          let maxDepth = currentDepth;
          Object.values(item).forEach((value) => {
            if (Array.isArray(value)) {
              value.forEach((subItem) => {
                maxDepth = Math.max(maxDepth, calculateMaxDepth(subItem, currentDepth + 1));
              });
            }
          });
          return maxDepth;
        };

        if (arrayName === 'zones' && data.length > 0) {
          const lastZoneItem = data[data.length - 1];
          const lastZoneDepth = calculateMaxDepth(lastZoneItem);
          lastZonesYPosition =
            calculateNodePosition(data.length - 1, depth, parentYPosition).y + lastZoneDepth * childNodeHeight;
        }

        // VISIBILITY

        const isHidden = parentId !== null;
        let nodeType = 'customNode';

        if (floorNodeNames.includes(item.name) && isLastLevelNode(item)) {
          nodeType = 'customNodeBasic';
        } else if (floorNodeNames.includes(item.name)) {
          nodeType = 'customNodeOutput';
        } else if (isLastLevelNode(item)) {
          nodeType = 'customNodeInput';
        } else {
          nodeType = 'customNode';
        }

        // FLOORS

        if (Array.isArray(floorNodeNames)) {
          const { width: maxWidth, height: totalHeight } = calculateDimensions(floorNodeNames as any);
          const firstFloorNode = data.find((node) => node.name === floorNodeNames[0]);
          const firstFloorPosition = firstFloorNode ? calculateNodePosition(0, depth, parentYPosition) : { x: 0, y: 0 };

          nodes.push({
            id: 'Floors',
            type: 'parentNode',
            draggable: false,
            selectable: false,
            data: { label: 'Floors' },
            position: { x: firstFloorPosition.x - padding / 2, y: firstFloorPosition.y - padding },
            hidden: false,
            style: { width: maxWidth - padding / 2, height: totalHeight },
          });
        }

        // ZONES PARENT NODE
        if (Array.isArray(item.zones)) {
          const zonesNodeId = `${formatName(nodeId)}-zones`;
          const customNodes = item.zones.map((zone, index) => ({
            id: `zone-${index}`,
            position: { x: 0, y: 0 },
            data: { title: zone.name },
          }));
          const { width: zonesMaxWidth, height: zonesTotalHeight } = calculateDimensions(customNodes);
          nodes.push({
            id: zonesNodeId,
            type: 'parentNode',
            draggable: false,
            selectable: false,
            data: { label: 'Zones' },
            position: { x: position.x + xOffset - padding / 2, y: position.y - padding },
            hidden: true,
            style: { width: zonesMaxWidth, height: zonesTotalHeight },
          });

          const zonesResult = createNodesAndEdges(item.zones, zonesNodeId, position.y, depth + 1);
          zonesResult.nodes.forEach((node) => (node.hidden = true));
          nodes = nodes.concat(zonesResult.nodes);

          // ZONES GATEWAYS PARENT NODE

          item.zones.forEach((zone, zoneIndex) => {
            if (Array.isArray(zone.gateways) && zone.gateways.length > 0) {
              const zoneName = zone.name || `Zone${zoneIndex}`;
              const formattedZoneName = formatName(zoneName);
              const zoneGatewayNodeId = `${zonesNodeId}-${formattedZoneName}-${zoneIndex}-gateways`;
              let gatewaysMaxWidth = 0;
              zone.gateways.forEach((gateway) => {
                const nodeWidth = calculateIndividualNodeWidth(gateway);
                gatewaysMaxWidth = Math.max(gatewaysMaxWidth, nodeWidth);
              });
              const gatewaysTotalHeight = calculateTotalHeight(zone.gateways);
              const gatewaysPosition = calculateNodePosition(zoneIndex, depth + 1, lastZonesYPosition);
              nodes.push({
                id: zoneGatewayNodeId,
                type: 'parentNode',
                draggable: false,
                selectable: false,
                data: { label: 'Gateways' },
                position: gatewaysPosition,
                hidden: true,
                style: { width: gatewaysMaxWidth, height: gatewaysTotalHeight },
              });
              const gatewaysResult = createNodesAndEdges(
                zone.gateways,
                zoneGatewayNodeId,
                gatewaysPosition.y,
                depth + 2,
              );
              gatewaysResult.nodes.forEach((node) => (node.hidden = true));
              nodes = nodes.concat(gatewaysResult.nodes);
            }
          });
          if (zonesResult.nodes.length > 0) {
            const lastZoneNode = zonesResult.nodes[zonesResult.nodes.length - 1];
            lastZonesYPosition = lastZoneNode.position.y;
          }
        }

        // GATEWAYS PARENT NODE
        if (Array.isArray(item.gateways)) {
          const gatewaysNodeId = `${formatName(nodeId)}-gateways`;
          const customNodes = item.gateways.map((gateway, index) => ({
            id: `gateway-${index}`,
            position: { x: 0, y: 0 },
            data: { title: gateway.name },
          }));

          const floorGatewayRegexPattern = `^(${floorNodeNames.join('|')})-gateways$`;
          const floorGatewayRegex = new RegExp(floorGatewayRegexPattern);

          let maxWidth = 0;
          let totalHeight = 0;
          let gatewaysPosition;

          if (floorGatewayRegex.test(gatewaysNodeId)) {
            item.gateways.forEach((gateway) => {
              const nodeWidth = calculateIndividualNodeWidth(gateway);
              maxWidth = Math.max(maxWidth, nodeWidth);
            });
            totalHeight = calculateTotalHeight(item.gateways);
            gatewaysPosition = { x: position.x + xOffset - padding / 2, y: lastZonesYPosition + yOffset - padding };
          } else {
            const dimensions = calculateDimensions(customNodes);
            maxWidth = dimensions.width;
            totalHeight = dimensions.height;
            gatewaysPosition = calculateNodePosition(index, depth, parentYPosition);
          }

          nodes.push({
            id: gatewaysNodeId,
            type: 'parentNode',
            draggable: false,
            selectable: false,
            data: { label: 'Gateways' },
            position: gatewaysPosition,
            hidden: true,
            style: { width: maxWidth, height: totalHeight },
          });

          const gatewaysResult = createNodesAndEdges(
            item.gateways,
            gatewaysNodeId,
            gatewaysPosition.y + padding,
            depth + 1,
          );
          gatewaysResult.nodes.forEach((node) => (node.hidden = true));
          nodes = nodes.concat(gatewaysResult.nodes);
        }

        // DEVICES PARENT NODE

        if (Array.isArray(item.devices) && item.devices.length > 0) {
          const devicesNodeId = `${formatName(nodeId)}-devices`;
          const customNodes = item.devices.map((device, deviceIndex) => ({
            id: `device-${deviceIndex}`,
            position: { x: 0, y: 0 },
            data: { title: device.name },
          }));
          const { width: devicesMaxWidth, height: devicesTotalHeight } = calculateDimensions(customNodes);

          const devicesPosition = calculateNodePosition(index, depth, parentYPosition);

          nodes.push({
            id: devicesNodeId,
            type: 'parentNode',
            draggable: false,
            selectable: false,
            data: { label: 'Devices' },
            position: { x: devicesPosition.x + xOffset - padding / 2, y: -padding },
            hidden: true,
            style: { width: devicesMaxWidth + padding, height: devicesTotalHeight },
          });

          const devicesResult = createNodesAndEdges(item.devices, devicesNodeId, devicesPosition.y, depth + 1);
          devicesResult.nodes.forEach((node) => (node.hidden = true));
          nodes = nodes.concat(devicesResult.nodes);
        }

        // CURCUITS PARENT NODE

        if (Array.isArray(item.curcuits) && item.curcuits.length > 0) {
          const curcuitsNodeId = `${formatName(nodeId)}-curcuits`;
          const customNodes = item.curcuits.map((curcuit, curcuitIndex) => ({
            id: `curcuit-${curcuitIndex}`,
            position: { x: 0, y: 0 },
            data: { title: curcuit.description },
          }));
          const { width: curcuitsMaxWidth, height: curcuitsTotalHeight } = calculateDimensions(customNodes);

          const curcuitsPosition = calculateNodePosition(index, depth, parentYPosition);

          nodes.push({
            id: curcuitsNodeId,
            type: 'parentNode',
            draggable: false,
            selectable: false,
            data: { label: 'Curcuits' },
            position: { x: curcuitsPosition.x + xOffset - padding / 2, y: -padding },
            hidden: true,
            style: { width: curcuitsMaxWidth + padding, height: curcuitsTotalHeight },
          });

          const curcuitsResult = createNodesAndEdges(item.curcuits, curcuitsNodeId, curcuitsPosition.y, depth + 1);
          curcuitsResult.nodes.forEach((node) => (node.hidden = true));
          nodes = nodes.concat(curcuitsResult.nodes);
        }

        // CUSTOM NODE

        nodes.push({
          id: nodeId,
          type: nodeType,
          draggable: false,
          data: {
            title: item.name || item.description,
            arrayType: determineArrayType(item),
            riskLevel: item.riskLevel,
          },
          position,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          parent: parentId,
          hidden: isHidden,
        } as ExtendedNode);

        if (parentId) {
          edges.push({
            id: `edge-${parentId}-${nodeId}`,
            source: parentId,
            target: nodeId,
          });
        }

        Object.entries(item).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            const childResult = createNodesAndEdges(value, nodeId, parentYPosition, depth + 1, key);
            nodes = nodes.concat(childResult.nodes);
            edges = edges.concat(childResult.edges);
          }
        });
      });
      return { nodes, edges };
    };

    const { memoizedNodes, memoizedEdges } = useMemo(() => {
      const { nodes: initializedNodes, edges: initializedEdges } = createNodesAndEdges(initialNodes as ExtendedNode[]);
      return { memoizedNodes: initializedNodes, memoizedEdges: initializedEdges };
    }, [initialNodes, initialEdges]);

    useEffect(() => {
      setNodes(memoizedNodes);
      setEdges(memoizedEdges);
    }, [memoizedNodes, memoizedEdges, setNodes, setEdges]);

    // const findAllDescendantNodeIds = (nodeId, nodes) => {
    //   let descendantIds = new Set();
    //   const findIds = (currentNodeId) => {
    //     nodes.forEach((node) => {
    //       if (node.parent === currentNodeId) {
    //         descendantIds.add(node.id);
    //         findIds(node.id);
    //       }
    //     });
    //   };
    //   findIds(nodeId);
    //   return Array.from(descendantIds);
    // };

    function findContainerArrayAndSiblings(nodeId: string, nodes: ExtendedNode[]) {
      const currentNode = nodes.find((node) => node.id === nodeId);
      if (!currentNode) return [];
      const siblings = nodes.filter((node) => node.id !== nodeId && node.parent === currentNode.parent);
      const uniqueSiblingIds = new Set();
      const uniqueSiblings = siblings.filter((sibling) => {
        const isDuplicate = uniqueSiblingIds.has(sibling.id);
        uniqueSiblingIds.add(sibling.id);
        return !isDuplicate;
      });

      return uniqueSiblings;
    }
    const areDirectChildrenHidden = (nodeId: string, nodes: ExtendedNode[]) => {
      const directChildren = nodes.filter((node: ExtendedNode) => node.parent === nodeId);
      return directChildren.some((child: ExtendedNode) => !child.hidden);
    };

    // ON CLICK

    const handleNodeClick = (event: React.MouseEvent, node: ExtendedNode) => {
      if (node.type === 'customNodeInput' || node.type === 'customNodeBasic' || node.type === 'parentNode') {
        return;
      }

      // FLOORS NODES

      const isFloorNode = floorNodeNames.includes(node.id);

      // DEVICES PARENT NODE

      const isGatewayNode = node.id.includes('gateways') && !node.id.includes('devices');
      const deviceParentNodeId = isGatewayNode ? `${node.id}-devices` : null;

      // GATEWAYS PARENT NODE

      const isZoneNode = node.id.includes('zone') && !node.id.includes('gateways');
      const gatewayParentNodeId = isZoneNode ? `${node.id}-gateways` : null;

      // CURCUITS PARENT NODE

      const isDeviceNode = node.id.includes('devices') && !node.id.includes('curcuits');
      const curcuitParentNodeId = isDeviceNode ? `${node.id}-curcuits` : null;

      setNodes((prevNodes: ExtendedNode[]) => {
        const hideDeeperDescendants = (parentId: string, nodes: ExtendedNode[]) =>
          nodes.map((n) => (n.id.startsWith(parentId + '-') && n.parent !== parentId ? { ...n, hidden: true } : n));

        const toggleChildrenVisibility = (nodeId: string, nodes: ExtendedNode[], isVisible: boolean) =>
          nodes.map((n) =>
            n.parent === nodeId
              ? {
                  ...n,
                  hidden: !isVisible,
                  data: { ...n.data, iconState: !isVisible },
                }
              : n,
          );

        // SIBLINGS IN ARRAY

        const siblings = findContainerArrayAndSiblings(node.id, prevNodes);

        const hideChildrenOfSiblings = (
          siblings: ExtendedNode[],
          nodes: ExtendedNode[],
          areImmediateChildrenVisible: boolean = false,
        ) => {
          const findAllDescendantNodeIds = (nodeId: string, nodes: ExtendedNode[]): string[] => {
            let descendantIds: string[] = [];
            nodes.forEach((node: ExtendedNode) => {
              if (node.parent === nodeId) {
                descendantIds.push(node.id);
                descendantIds = descendantIds.concat(findAllDescendantNodeIds(node.id, nodes));
              }
            });
            return descendantIds;
          };

          let allDescendantIds = new Set<string>();
          siblings.forEach((sibling) => {
            const descendantIds = findAllDescendantNodeIds(sibling.id, nodes);
            descendantIds.forEach((id) => allDescendantIds.add(id));
          });

          return nodes.map((n: ExtendedNode) => {
            if (allDescendantIds.has(n.id)) {
              return { ...n, hidden: true, data: { ...n.data, iconState: false } };
            } else if (n.parent === siblings[0]?.parent) {
              return { ...n, data: { ...n.data, iconState: areImmediateChildrenVisible } };
            }
            return n;
          });
        };

        if (!node || typeof node.id !== 'string') {
          return prevNodes;
        }
        const childrenVisibility = !areDirectChildrenHidden(node.id, prevNodes);
        const zonesNodeId = `${node.id}-zones`;
        const gatewaysNodeId = `${node.id}-gateways`;

        const areImmediateChildrenVisible = prevNodes.some(
          (n) => (n.parent === zonesNodeId || n.parent === gatewaysNodeId) && !n.hidden,
        );

        const nodeIdParts = node.id.split('-');
        const floorId = nodeIdParts[0];
        const mainCategory = nodeIdParts[1];

        if (nodeIdParts.length === 3 || nodeIdParts.length === 4) {
          const categoryToHide = mainCategory === 'gateways' ? 'zones' : 'gateways';
          const nodeIdToHide = `${floorId}-${categoryToHide}`;
          prevNodes = prevNodes.map((n) => {
            if (n.id.startsWith(nodeIdToHide)) {
              return { ...n, hidden: true };
            }
            return n;
          });
        }

        if (isFloorNode) {
          return prevNodes.map((n) => {
            if (
              floorNodeNames.some((floorNodeId) => n.id.startsWith(`${floorNodeId}-`)) &&
              !n.id.startsWith(`${node.id}-`)
            ) {
              return { ...n, hidden: true, data: { ...n.data, iconState: true } };
            } else if (n.id === node.id) {
              return { ...n, data: { ...n.data, iconState: !areImmediateChildrenVisible } };
            } else if (floorNodeNames.includes(n.id) && n.id !== node.id) {
              const otherNodeChildrenVisibility = areDirectChildrenHidden(n.id, prevNodes);
              return { ...n, data: { ...n.data, iconState: otherNodeChildrenVisibility } };
            } else if (n.id.startsWith(`${node.id}-`)) {
              const isZoneOrGatewayNode =
                n.parent === zonesNodeId ||
                n.id === zonesNodeId ||
                n.parent === gatewaysNodeId ||
                n.id === gatewaysNodeId;
              if (isZoneOrGatewayNode) {
                return {
                  ...n,
                  hidden: areImmediateChildrenVisible,
                  data: { ...n.data, iconState: areImmediateChildrenVisible },
                };
              } else {
                return { ...n, hidden: true, data: { ...n.data, iconState: false } };
              }
            }

            return n;
          });
        }

        let updatedNodes = toggleChildrenVisibility(node.id, prevNodes, childrenVisibility);
        updatedNodes = hideChildrenOfSiblings(
          findContainerArrayAndSiblings(node.id, updatedNodes),
          updatedNodes,
          childrenVisibility,
        );

        // UPDATE DEVICES

        if (isFloorNode) {
          updatedNodes.forEach((n) => {
            if (n.type === 'parentNode' && n.id.includes('devices')) {
              n.hidden = true;
            }
          });
        } else if (deviceParentNodeId) {
          updatedNodes = updatedNodes.map((n) => {
            if (n.id === deviceParentNodeId) {
              const shouldShow = childrenVisibility && !areDirectChildrenHidden(deviceParentNodeId, updatedNodes);
              return { ...n, hidden: !shouldShow };
            }
            return n;
          });
        }

        // UPDATE GATEWAYS

        if (isFloorNode) {
          updatedNodes.forEach((n) => {
            if (n.type === 'parentNode' && n.id.includes('gateways')) {
              n.hidden = true;
            }
          });
        } else if (gatewayParentNodeId) {
          updatedNodes = updatedNodes.map((n) => {
            if (n.id === gatewayParentNodeId) {
              const shouldShow = childrenVisibility && !areDirectChildrenHidden(gatewayParentNodeId, updatedNodes);
              return { ...n, hidden: !shouldShow };
            }
            return n;
          });
        }

        // UPDATE CURCUITS

        if (!isFloorNode) {
          const isDeviceNode = node.id.includes('devices') && !node.id.includes('curcuits');
          const curcuitParentNodeId = isDeviceNode ? `${node.id}-curcuits` : null;
          const siblings = findContainerArrayAndSiblings(node.id, prevNodes);
          siblings.forEach((sibling) => {
            if (sibling.id.includes('devices') && !sibling.id.includes('curcuits')) {
              const siblingCurcuitNodeId = `${sibling.id}-curcuits`;
              const siblingCurcuitNodeIndex = updatedNodes.findIndex((n) => n.id === siblingCurcuitNodeId);
              if (siblingCurcuitNodeIndex !== -1) {
                updatedNodes[siblingCurcuitNodeIndex].hidden = true;
              }
            }
          });
          if (isDeviceNode && curcuitParentNodeId !== null) {
            const curcuitParentNodeIndex = updatedNodes.findIndex((n) => n.id === curcuitParentNodeId);
            if (curcuitParentNodeIndex !== -1) {
              const shouldShow = !areDirectChildrenHidden(curcuitParentNodeId, updatedNodes);
              updatedNodes[curcuitParentNodeIndex].hidden = !shouldShow;
            }
          }
        }

        updatedNodes = hideDeeperDescendants(node.id, updatedNodes);

        // EDGES

        setEdges((prevEdges) => {
          if (!node || typeof node.id !== 'string') {
            return prevEdges;
          }

          if (isFloorNode) {
            return prevEdges.map((edge) => {
              const sourceNodeVisible = prevNodes.some((n) => n.id === edge.source && !n.hidden);
              const targetNodeVisible = prevNodes.some((n) => n.id === edge.target && !n.hidden);
              return { ...edge, hidden: !sourceNodeVisible || !targetNodeVisible };
            });
          }

          return prevEdges;
        });

        return updatedNodes.map((n) => {
          if (n.id === node.id) {
            return { ...n, data: { ...n.data, childrenVisible: childrenVisibility, iconState: childrenVisibility } };
          }
          return n;
        });
      });
    };

    return (
      <ReactFlow
        nodes={nodes.filter((node) => !node.hidden)}
        edges={edges.filter((edge) => !edge.hidden)}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        fitView
        maxZoom={3}
        minZoom={0.2}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Background gap={28} size={2} variant={BackgroundVariant.Dots} />
        <MiniMap nodeBorderRadius={4} pannable zoomable position='bottom-left' />
        <Panel position='top-right'>
          <IconButton aria-label='Full screen' disabled size='lg' variant='control'>
            <Maximize02LineIcon />
          </IconButton>
        </Panel>
        <Panel position='bottom-center'>
          <AlertsLegendMap
            alerts={locations.getBuildings(activeFormation)}
            label={t('location.floors.label', 'Floors', 'Floors')}
          />
        </Panel>
        <Panel position='bottom-right'>
          <ButtonGroup aria-label='button group' orientation='vertical'>
            <IconButton onClick={() => zoomIn({ duration: 500 })} size='lg' variant='control'>
              <PlusLineIcon />
            </IconButton>
            <IconButton onClick={() => zoomOut({ duration: 500 })} size='lg' variant='control'>
              <MinusLineIcon />
            </IconButton>
          </ButtonGroup>
        </Panel>
      </ReactFlow>
    );
  },
);
