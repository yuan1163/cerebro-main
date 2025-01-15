import React from 'react';
import { usePopper } from 'react-popper';

// types

import { Spacing } from '@core/api/typesDesignSystem';

// styles

import { cn } from '@core/utils/classnames';
import tooltipStyles from './styles.module.scss';

type Props = {
  arrow?: boolean;
  className?: string;
  isVisible: boolean;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  targetRef: React.RefObject<HTMLElement>;
  title?: string;
  width?: Spacing | (number & {});
};

export const Tooltip: React.FC<Props> = ({
  arrow,
  className,
  isVisible,
  placement = 'bottom',
  targetRef,
  title,
  width,
}: Props) => {
  const popperRef = React.useRef(null);
  const [arrowRef, setArrowRed] = React.useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(targetRef.current, popperRef.current, {
    placement: placement,
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowRef,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 2],
        },
      },
    ],
  });

  if (!isVisible) return null;
  return (
    <div
      {...attributes.popper}
      className={cn(tooltipStyles['tooltip'], tooltipStyles[`width-60`], className)}
      ref={popperRef}
      role='tooltip'
      style={styles.popper}
    >
      <div ref={setArrowRed} style={styles['arrow']} className={tooltipStyles['arrow']} />
      <span className={tooltipStyles['title']}>{title || 'No Title'}</span>
    </div>
  );
};
