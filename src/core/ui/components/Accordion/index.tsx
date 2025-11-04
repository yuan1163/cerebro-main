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
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => {
        return (
          <AccordionContainer
            className={cn(className, open ? 'flex-1' : '')}
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
