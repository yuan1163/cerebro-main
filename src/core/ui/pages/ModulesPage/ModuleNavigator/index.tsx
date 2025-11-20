import { useLocations } from '@core/storages/controllers/locations';
import { useUI } from '@core/storages/ui';
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// context

import { DrawerContext } from '@core/context/DrawerContext';

//  data

import { commands as utilusCommands } from '@core/ui/pages/SmartPolesPage/commands';

// utils

import { t } from '@core/utils/translate';

// storages

import { useAuth } from '@core/storages/auth';

// hooks

import useDrawerTooltip from '@core/hooks/useDrawerTooltip';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { DrawerButtonCollapsed } from '@core/ui/components/DrawerButtonCollapsed';
import { DrawerButtonCollapsedAccordion } from '@core/ui/components/DrawerButtonCollapsedAccordion';
import { DrawerButtonExpanded } from '@core/ui/components/DrawerButtonExpanded';
import { DrawerButtonExpandedAccordion } from '@core/ui/components/DrawerButtonExpandedAccordion';
import { Icon } from '@core/ui/components/Icon';
import { IconButton } from '@core/ui/components/IconButton';
import { Image } from '@core/ui/components/Image';
import { getModulesSection, Modules, ModuleSections, Solutions } from '@core/ui/types';
import { Tooltip } from '@core/ui/components/Tooltip';
import ImageFallback from '@core/ui/components/ImageFallback';

// icons

import AlignLeft01LineIcon from '@assets/icons/line/align-left-01.svg?component';
import AlignRight01LineIcon from '@assets/icons/line/align-right-01.svg?component';
import Home02LineIcon from '@assets/icons/line/home-02.svg?component';
import LogOut01LineIcon from '@assets/icons/line/log-out-01.svg?component';
import Home02SolidIcon from '@assets/icons/solid/home-02.svg?component';
import Image05SolidIcon from '@assets/icons/solid/image-05.svg?component';
import AppIcon from '@assets/images/app-icon.svg?component';
import AppLogo from '@assets/images/app-logo.svg?component';
import ivedaLogo from '@assets/images/iveda-logo.svg';
import PoweredLogo from '@assets/images/powered-logo.svg?component';
import DomainLineIcon from '@assets/icons/LevelNOW/sidebar/domain-line.svg?component';
import DomainSolidIcon from '@assets/icons/LevelNOW/sidebar/domain-solid.svg?component';

// AUTHORIZATION

const auth = useAuth();

const brand = import.meta.env.VITE_BRAND === 'cerebro' ? { icon: <AppIcon />, logo: <AppLogo /> } : null;

type Props = {
  modules: Modules;
};

export const ModuleNavigator: React.FC<Props> = observer(({ modules }) => {
  const locations = useLocations();
  const { logo, icon } = locations.getCompanyLogos();

  // nav

  const ui = useUI();
  const common = React.useMemo(() => getModulesSection(modules, ModuleSections.Common), [modules]);
  const uniques = React.useMemo(() => getModulesSection(modules, ModuleSections.Unique), [modules]);
  const commands = ui.activeSolution === Solutions.utilus ? utilusCommands : [];

  const FallbackIcon = (
    <Icon className='opacity-60' color='icon-tertiary' variant='plain'>
      <Image05SolidIcon />
    </Icon>
  );

  // TOGGLE DRAWER STATE

  const { isDrawerExpanded, toggleDrawerState } = React.useContext(DrawerContext);

  const handleToggleDrawerState = () => {
    toggleDrawerState(!isDrawerExpanded);
  };

  // TOGGLE SIZE

  const handleResize = () => {
    if (window.innerWidth < 1124 && isDrawerExpanded) {
      toggleDrawerState(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDrawerExpanded]);

  // COLLAPSED BUTTON

  interface ItemProps {
    system?: 'iveda' | 'levelnow' | 'cerebro';
    component?: React.ReactNode;
    icon?: React.ReactNode;
    iconSolid?: React.ReactNode;
    title?: string;
    url?: string;
  }

  const CollapsedButton: React.FC<{ item: ItemProps; type?: string }> = observer(({ item, type }) => {
    const { ref: divRef } = useDrawerTooltip<HTMLDivElement>();
    const {
      drawerTooltip: tooltipVisible,
      showDrawerTooltip: showTooltip,
      hideDrawerTooltip: hideTooltip,
    } = useDrawerTooltip();

    let url;
    let disabled;

    // levelnow and iveda dont need to add formation to the url
    if (item.system === 'levelnow' || item.system === 'iveda') {
      url = item.url || '';
      disabled = !item.component;
    } else {
      switch (type) {
        case 'home':
          url = 'domain';
          break;
        case 'common':
          url = `${item.url}/${ui.currentFormation}`;
          disabled = !item.component;
          break;
        case 'uniques':
          url = `${item.url}/${ui.currentFormation}`;

          // FIXME: Sam: this is not working, maybe can fix it to "disabled = item.url === 'null' or disabled = !item.component"
          disabled = url === 'null';
          break;
        case 'commands':
          url = `${item.url}`;
          disabled = url === 'null';
          break;
        default:
          url = '#';
          break;
      }
    }

    // Translate title reactively (will re-run when translation.language changes)
    const title = t(item.title || '', item.title || '', '');

    return (
      <li className={styles['list-item']}>
        <DrawerButtonCollapsed
          disabled={disabled}
          icon={item.icon}
          iconHover={item.iconSolid}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          ref={divRef}
          title={item.title}
          url={url}
        />
        {createPortal(
          <Tooltip isVisible={tooltipVisible} placement='right' targetRef={divRef} title={title} />,
          document.body,
        )}
      </li>
    );
  });

  // TOGGLE BUTTON

  interface ToggleButtonProps {
    ariaLabel?: string;
    handleToggleDrawerState?: () => void;
    icon?: React.ReactNode;
    title?: string;
  }

  const ToggleButton: React.FC<ToggleButtonProps> = ({ ariaLabel, icon, title, handleToggleDrawerState }) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const { drawerTooltip, showDrawerTooltip, hideDrawerTooltip } = useDrawerTooltip();
    return (
      <>
        <IconButton
          ariaLabel={ariaLabel}
          className={styles['toggle-button']}
          color='icon-secondary'
          onClick={handleToggleDrawerState}
          onMouseEnter={showDrawerTooltip}
          onMouseLeave={hideDrawerTooltip}
          ref={buttonRef}
          variant='text'
        >
          {icon}
        </IconButton>
        {drawerTooltip &&
          createPortal(
            <Tooltip
              isVisible={drawerTooltip}
              placement='right'
              targetRef={buttonRef as React.RefObject<HTMLElement>}
              title={title}
            />,
            document.body,
          )}
      </>
    );
  };

  return (
    <div
      className={cn(
        styles['drawer-container'],
        isDrawerExpanded ? styles['drawer-expanded'] : styles['drawer-collapsed'],
      )}
    >
      {/* COLLAPSED 關閉選單的列表 */}
      {!isDrawerExpanded && (
        <nav className={cn(styles['nav'])}>
          {/* TOGGLE BUTTON */}

          <div className={styles['toggle-button-container-top']}>
            <ToggleButton
              ariaLabel={t(
                'general.expandDrawerTooltip.label',
                'Expand Drawer',
                'A label for a button used to expand a Drawer in a UI.',
              )}
              icon={<AlignRight01LineIcon />}
              handleToggleDrawerState={handleToggleDrawerState}
              title={t(
                'general.expandDrawerTooltip.label',
                'Show Sidebar',
                'A tooltip for a button used to expand a Drawer in a UI.',
              )}
            />
          </div>

          <div className={styles['list-container']}>
            {/* LOGOS */}

            <ul className={cn(styles['list'], styles['list-app'])}>
              <li className={cn(styles['list-item'], styles['list-item-app'])}>
                <a href='/solutions'>{brand?.icon}</a>
              </li>
              <li className={cn(styles['list-item'], styles['list-item-company'])}>
                {/* {icon} */}
                {icon ? (
                  <img
                    alt={t(
                      'company.companyIcon.label',
                      'Company icon',
                      'Small graphical symbol that represents a brand.',
                    )}
                    height='32'
                    src={ivedaLogo}
                    // src={`${logo}/${auth.accessToken}`}
                    width='32'
                  />
                ) : (
                  FallbackIcon
                )}
              </li>
            </ul>

            {/* COMMON */}

            <ul className={styles['list']}>
              {/* <CollapsedButton
                item={{
                  icon: <DomainLineIcon />,
                  iconSolid: <DomainSolidIcon />,
                  title: 'solutions.domain.label',
                }}
                type='home'
              /> */}
              {common.map((item) => {
                // Translate title reactively
                const title = t(item.title, item.title, '');

                return 'isGroup' in item ? (
                  <DrawerButtonCollapsedAccordion
                    key={title}
                    categories={item.items.map((subItem) => ({
                      ...subItem,
                      url:
                        item.system === 'levelnow' || item.system === 'iveda'
                          ? subItem.url || ''
                          : `${subItem.url}/${ui.currentFormation}`,
                    }))}
                    icon={item.icon}
                    iconSolid={item.iconSolid}
                    title={title}
                  />
                ) : (
                  <CollapsedButton key={item.title} item={item} type='common' />
                );
              })}
            </ul>

            {/* UNIQUES */}

            {uniques.length > 0 ? (
              <ul className={styles['list']}>
                {uniques.map((item) => {
                  // Translate title reactively
                  const title = t(item.title, item.title, '');

                  return 'isGroup' in item ? (
                    <DrawerButtonCollapsedAccordion
                      key={title}
                      categories={item.items.map((subItem) => ({
                        ...subItem,
                        url:
                          item.system === 'levelnow' || item.system === 'iveda'
                            ? subItem.url || ''
                            : `${subItem.url}/${ui.currentFormation}`,
                      }))}
                      icon={item.icon}
                      iconSolid={item.iconSolid}
                      title={title}
                    />
                  ) : (
                    <CollapsedButton key={title} item={item} type='uniques' />
                  );
                })}
              </ul>
            ) : null}

            {/* COMMANDS */}

            {commands.length > 0 ? (
              <ul className={styles['list']}>
                {commands.map((item) => (
                  <CollapsedButton key={item.title} item={item} type='commands' />
                ))}
              </ul>
            ) : null}

            {/* {commands.length > 0 ? (
              <ul className={styles['list']}>
                {
                  commands.map((item) => {
                    const title = item.title
                    return (
                      <CollapsedButton key={title} item={item} type='commands' />
                    )
                  })
                }
              </ul>
            ) : null} */}
          </div>
        </nav>
      )}

      {/* EXPANDED 開啟選單的列表 */}
      {isDrawerExpanded && (
        <nav className={cn(styles['nav'])}>
          {/* TOGGLE BUTTON */}

          <div className={styles['toggle-button-container-top']}>
            <ToggleButton
              ariaLabel={t(
                'general.collapseDrawerTooltip.label',
                'Collapse Drawer',
                'A label for a button used to collapse a Drawer in a UI.',
              )}
              icon={<AlignLeft01LineIcon />}
              handleToggleDrawerState={handleToggleDrawerState}
              title={t(
                'general.collapseDrawerTooltip.label',
                'Collapse Sidebar',
                'A tooltip for a button used to collapse a Drawer in a UI.',
              )}
            />
          </div>

          <div className={styles['list-container']}>
            {/* LOGOS */}

            <ul className={cn(styles['list'], styles['list-app'])}>
              <li className={cn(styles['list-item'], styles['list-item-app'])}>
                <a href='/cerebro'>{brand?.logo}</a>
              </li>
              <li className={cn(styles['list-item'], styles['list-item-company'])}>
                {logo && auth.accessToken ? (
                  <img
                    alt={t(
                      'company.companyLogo.label',
                      'Company logo',
                      'Unique symbol that represents an organization.',
                    )}
                    height='30'
                    src={ivedaLogo}
                    // src={logo}
                    width='78'
                  />
                ) : (
                  FallbackIcon
                )}
              </li>
            </ul>

            {/* COMMON EXPANDED */}
            <ul className={styles['list']}>
              {/* <li className={styles['list-item']}>
                <DrawerButtonExpanded
                  icon={<DomainLineIcon />}
                  iconHover={<DomainSolidIcon />}
                  url={`domain`}
                  title={t('solutions.domain.label', 'Domain', 'Domain page title.')}
                />
              </li> */}

              {/* 左側選單列表 */}
              {common.map((item) => {
                // Translate title reactively
                const title = t(item.title, item.title, '');

                if ('isGroup' in item) {
                  return (
                    <li key={item.title} className={styles['list-item']}>
                      <DrawerButtonExpandedAccordion
                        categories={item.items.map((subItem) => ({
                          ...subItem,
                          url:
                            item.system === 'levelnow' || item.system === 'iveda'
                              ? subItem.url || ''
                              : `${subItem.url}/${ui.currentFormation}`,
                        }))}
                        icon={item.icon}
                        iconSolid={item.iconSolid}
                        title={title}
                      />
                    </li>
                    // title={item.title}
                  );
                } else {
                  console.log('item.url', item.url);

                  const url =
                    item.system === 'levelnow' || item.system === 'iveda'
                      ? item.url || ''
                      : `${item.url}/${ui.currentFormation}`;
                  return (
                    <li key={item.url} className={styles['list-item']}>
                      <DrawerButtonExpanded
                        disabled={!item.component}
                        icon={item.icon}
                        iconHover={item.iconSolid}
                        title={title}
                        url={url}
                      />
                    </li>
                  );
                }
              })}
            </ul>

            {/* UNIQUES */}

            {uniques.length > 0 ? (
              <ul className={styles['list']}>
                {uniques.map((item) => {
                  // Translate title reactively
                  const title = t(item.title, item.title, '');

                  if ('isGroup' in item) {
                    return (
                      <li key={item.title} className={styles['list-item']}>
                        <DrawerButtonExpandedAccordion
                          categories={item.items.map((subItem) => ({
                            ...subItem,
                            url:
                              item.system === 'levelnow' || item.system === 'iveda'
                                ? subItem.url || ''
                                : `${subItem.url}/${ui.currentFormation}`,
                          }))}
                          icon={item.icon}
                          iconSolid={item.iconSolid}
                          title={title}
                        />
                      </li>
                    );
                  } else {
                    const url =
                      item.system === 'levelnow' || item.system === 'iveda'
                        ? item.url || ''
                        : `${item.url}/${ui.currentFormation}`;
                    return (
                      <li key={item.title} className={styles['list-item']}>
                        <DrawerButtonExpanded
                          disabled={!item.component}
                          icon={item.icon}
                          iconHover={item.iconSolid}
                          title={title}
                          url={url}
                        />
                      </li>
                    );
                  }
                })}
              </ul>
            ) : null}

            {/* COMMANDS */}

            {commands.length > 0 ? (
              <ul className={styles['list']}>
                {commands.map((item) => {
                  return (
                    <li key={item.title} className={styles['list-item']}>
                      <DrawerButtonExpanded
                        disabled={item.url === 'null'}
                        icon={item.icon}
                        iconHover={item.iconSolid}
                        title={item.title}
                        url={item.url}
                      />
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </nav>
      )}
    </div>

    //       <ListItem className={cn(styles['logo-container'], styles['logo-container-secondary'])}>
    //         <NavItemTransition
    //
    //           expandeIcon={
    //             logo ? (
    //               <img
    //                 alt={t(
    //                   'company.companyLogo.label',
    //                   'Company logo',
    //                   'Unique symbol that represents an organization.',
    //                 )}
    //                 height='30'
    //                 src={logo}
    //                 width='78'
    //               />
    //             ) : (
    //               FallbackIcon
    //             )
    //           }
    //           show={isShowing}
    //           title={t('company.company.label', 'Company', 'Organization.')}
    //           variant='contained'
    //         />
    //       </ListItem>
    //     </List>

    //   </Grid>
    // </div>
  );
});
