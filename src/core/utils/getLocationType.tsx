// utils

import { t } from '@core/utils/translate';

// types

import { LocationType } from '@core/api/types';

// icons

import AreaLineIcon from '@assets/icons/line/area.svg?component';
import Building01LineIcon from '@assets/icons/line/building-01.svg?component';
import Building07LineIcon from '@assets/icons/line/building-07.svg?component';
import FloorPlanLineIcon from '@assets/icons/line/floor-plan.svg?component';
import RouteLineIcon from '@assets/icons/line/route.svg?component';
import ZoneLineIcon from '@assets/icons/line/zone.svg?component';

export function getLocationType(type?: LocationType): {
  icon?: React.ReactNode;
  name?: string;
  pluralName?: string;
} {
  switch (type) {
    case LocationType.Area:
      return {
        name: t('location.area.label', 'Area', 'Area.'),
        pluralName: t('location.areas.label', 'Areas', 'Areas.'),
        icon: <AreaLineIcon />,
      };
    case LocationType.Formation:
      return {
        name: t('location.formation.label', 'Formation', 'Organization.'),
        pluralName: t('location.formations.label', 'Formations', 'Organizations.'),
        icon: <Building07LineIcon />,
      };
    case LocationType.Building:
      return {
        name: t('location.building.label', 'Building', 'Building.'),
        pluralName: t('location.buildings.label', 'Buildings', 'Buildings'),
        icon: <Building01LineIcon />,
      };
    case LocationType.Space:
      return {
        name: t('location.space.label', 'Space', 'Interior or enclosed areas within a building.'),
        pluralName: t('location.spaces.label', 'Spaces', 'Interiors within a building.'),
        icon: <FloorPlanLineIcon />,
      };
    case LocationType.Zone:
      return {
        name: t('location.zone.label', 'Zone', 'Specific area that is defined for a particular purpose.'),
        pluralName: t('location.zones.label', 'Zones', 'Specific areas that are defined for a particular purpose.'),
        icon: <ZoneLineIcon />,
      };
    case LocationType.ProductionLine:
      return {
        name: t('location.productionLine.label', 'Production Line', 'Production line.'),

        pluralName: t('location.productionLines.label', 'Production Lines', 'Production lines.'),
        icon: <RouteLineIcon />,
      };
    default:
      return {
        name: t('location.building.label', 'Building', 'Building.'),
        pluralName: t('location.buildings.label', 'Buildings', 'Buildings'),
        icon: <Building01LineIcon />,
      };
  }
}
