import React from 'react';

// types

import { SurfacePalette } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { AccordionContainer } from '@core/ui/components/AccordionContainer';
import { AccordionDetails } from '@core/ui/components/AccordionDetails';
import { AccordionSummary } from '@core/ui/components/AccordionSummary';
import { Disclosure } from '@headlessui/react';

type Props = {
  activedTab?: string | null;
  tabs?: {
    label: string;
    enabled: boolean;
  }[];
  onTabChange?: (label: string) => void;
  className?: string;
  summaryClass?: string;
  detailsClass?: string;
  color?: SurfacePalette;
  customTitle?: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  disablePadding?: boolean;
  disableSummaryGutters?: boolean;
  divider?: boolean;
  shadow?: boolean;
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  variant?: 'solid';
  rounded?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const Accordion: React.FC<Props> = ({
  activedTab,
  tabs,
  onTabChange,
  children,
  className,
  summaryClass,
  detailsClass,
  color,
  customTitle,
  defaultOpen = false,
  disabled = false,
  disableGutters = false,
  disablePadding = false,
  disableSummaryGutters = false,
  divider = false,
  shadow = false,
  size = 'md',
  title,
  variant,
  rounded,
}) => {
  console.log('active tab', activedTab);
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => {
        return (
          <AccordionContainer
            className={cn(open ? `flex-1 ${className}` : 'min-h-0')}
            color={color}
            rounded={rounded}
            shadow={shadow}
            variant={variant}
          >
            <AccordionSummary
              className={summaryClass}
              color={color}
              component={Disclosure.Button}
              disabled={disabled}
              disableGutters={disableSummaryGutters}
              divider={divider}
              expanded={open}
              size={size}
            >
              {title}
              {customTitle}
              {tabs && onTabChange && (
                <div className='flex items-center h-[68px] rounded-[4px] overflow-hidden'>
                  {tabs
                    // .filter((tab) => tab.enabled)
                    .map((tab) => (
                      <div
                        key={tab.label}
                        className={cn(
                          tab.label === activedTab
                            ? 'bg-primary-50 text-primary-500 shadow-accordion-tab'
                            : 'hover:bg-hover',
                          'h-full flex items-center justify-center px-5 text-[18px] font-medium',
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          onTabChange(tab.label);
                        }}
                      >
                        {tab.label}
                      </div>
                    ))}
                </div>
              )}
            </AccordionSummary>
            <AccordionDetails
              className={cn(detailsClass, open ? 'flex-1' : 'none')}
              color={color}
              component={Disclosure.Panel}
              disableGutters={disableGutters}
              disablePadding={disablePadding}
              divider={divider}
            >
              {children}
            </AccordionDetails>
          </AccordionContainer>
        );
      }}
    </Disclosure>
  );
};
