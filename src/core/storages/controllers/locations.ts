import React from 'react';

import { apiGetLocations } from '@core/api/entities/locations';
import { Location, LocationType } from '@core/api/types';
import { t } from '@core/utils/translate';

// import companyLogo from "@assets/company-logo.svg";
// import companyIcon from "@assets/company-icon.svg";

import { queryClient } from '@app/DataAccessAdapter';
import { apiGetFile } from '@core/api/entities/files';
import { useQuery } from '@tanstack/react-query';
import { auth } from '../auth';
import { ui } from '../ui';

const CONTROLLER = 'locations';
export class LocationsController {
  roots?: Location[];
  logo?: string;
  icon?: string;

  static invalidate() {
    queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.roots;
  }

  getData(): Location[] | undefined {
    return this.roots;
  }

  getCompany(): Location {
    if (!this.roots || this.roots.length !== 1) {
      throw Error(
        t(
          'errors.locations.parse.root',
          'Locations must have the only one root element',
          'Error message if unable to parse locations.',
        ),
      );
    }
    if (this.roots[0].type !== LocationType.Company) {
      throw Error(
        t(
          'errors.locations.parse.company',
          'Locations` root must be the Company type',
          'Error message if unable to parse locations.',
        ),
      );
    }
    const company = this.roots[0];
    return company;
  }

  getCompanyLogos() {
    return {
      logo: this.logo,
      icon: this.icon,
    };
  }

  private select(parent: Location, type: LocationType): Location[] {
    const children = parent.children;
    if (!children) return [];
    return children
      .filter((location) => location.type === type)
      .concat(...children.map((location) => this.select(location, type)));
  }

  public getElementById(id?: number): Location | undefined {
    if (id === undefined) return undefined;
    const company = this.getCompany();
    if (company.locationId === id) return company;
    return this.getElementByIdRecursive(company, id);
  }

  private getElementByIdRecursive(parent: Location, id: number): Location | undefined {
    const children = parent.children;
    if (!children) return undefined;
    for (const child of children) {
      if (child.locationId === id) return child;
      const result = this.getElementByIdRecursive(child, id);
      if (result) return result;
    }
    return undefined;
  }

  public getRegions(): Location[] {
    return this.select(this.getCompany(), LocationType.Region);
  }

  public getFormations(region?: Location): Location[] {
    return this.select(region || this.getCompany(), LocationType.Formation);
  }

  public getAreas(formation?: Location): Location[] {
    return this.select(formation || this.getCompany(), LocationType.Area);
  }

  public getBuildings(formation?: Location): Location[] {
    return this.select(formation || this.getCompany(), LocationType.Building);
  }

  public getSpaces(building?: Location): Location[] {
    return this.select(building || this.getCompany(), LocationType.Space);
  }

  public getZones(space?: Location): Location[] {
    return this.select(space || this.getCompany(), LocationType.Zone);
  }

  public getInstallations(formation?: Location): Location[] {
    return this.select(formation || this.getCompany(), LocationType.Installation);
  }

  public getAccessRoot(): Location {
    // return first descedant with userAccess true
    const company = this.getCompany();
    if (company.userAccess) return company;
    return this.getAccessRootRecursive(company)!;
  }

  private getAccessRootRecursive(parent: Location): Location | undefined {
    const children = parent.children;
    if (!children) return undefined;
    for (const child of children) {
      if (child.userAccess) return child;
      const result = this.getAccessRootRecursive(child);
      if (result) return result;
    }
    return parent;
  }

  public getProductionLines(zone?: Location): Location[] {
    if (!this.hasData()) {
      return [];
    }
    return this.select(zone || this.getAccessRoot(), LocationType.ProductionLine);
  }

  public getProcesses(productionLine?: Location): Location[] {
    if (!this.hasData()) {
      return [];
    }
    return this.select(productionLine || this.getAccessRoot(), LocationType.Process);
  }

  constructor(locations?: Location[], logo?: string, icon?: string) {
    this.roots = locations;
    this.logo = logo;
    this.icon = icon;
    if (locations) {
      ui.restoreUiFromUrl(this);
    }
  }
}

const IMAGE_TYPE = 1;
const LOGO_FILE_NAME = 'logo';
const ICON_FILE_NAME = 'icon';

// const useCompanyLogo = (company?: Location) => {
//   const { data: logoFileRecord } = useQuery(
//     ['company:logo'],
//     () =>
//       apiGetFile({
//         type: IMAGE_TYPE,
//         objectId: company?.locationId.toString(),
//         name: LOGO_FILE_NAME,
//         getUrl: true,
//       }),
//     {
//       enabled: !!company,
//     },
//   );

//   const { data: iconFileRecord } = useQuery(
//     ['company:icon'],
//     () =>
//       apiGetFile({
//         type: IMAGE_TYPE,
//         objectId: company?.locationId.toString(),
//         name: ICON_FILE_NAME,
//         getUrl: true,
//       }),
//     {
//       enabled: !!company,
//     },
//   );

//   return { logo: logoFileRecord?.url, icon: iconFileRecord?.url };
// };

const useCompanyLogo = (company?: Location) => {
  const { data: LogoCompany } = useQuery(
    ['company:logo_icon'],
    () =>
      apiGetLocations({
        locationId: company?.locationId.toString(),
        fileName: `${LOGO_FILE_NAME}, ${ICON_FILE_NAME}`,
      }),
    {
      enabled: !!company,
    },
  );

  const files = LogoCompany && LogoCompany.length === 1 ? LogoCompany[0].files : undefined;
  const logoFileRecord = files?.filter((f) => f.name === LOGO_FILE_NAME)[0];
  const iconFileRecord = files?.filter((f) => f.name === ICON_FILE_NAME)[0];

  return { logo: logoFileRecord?.url, icon: iconFileRecord?.url };
};

export const useLocations = () => {
  const { data } = useQuery([CONTROLLER], () => apiGetLocations(), {
    enabled: auth.isAuthenticated(),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const { icon, logo } = useCompanyLogo(data && data.length === 1 ? data[0] : undefined);

  return new LocationsController(data, logo ? logo : undefined, icon ? icon : undefined);
};
