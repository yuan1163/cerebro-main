import React, { useRef, useState, useEffect } from 'react';

// styles
import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components

import { ButtonBase } from '@core/ui/components/ButtonBase';
import { Mousewheel, Navigation, Scrollbar } from 'swiper';
import { Swiper } from 'swiper/react';

// icons

import ChevronLeftLineIcon from '@assets/icons/line/chevron-left.svg?component';
import ChevronRightLineIcon from '@assets/icons/line/chevron-right.svg?component';

const useSwiperRef = <T extends HTMLElement>(): [T | null, React.Ref<T>] => {
  const [wrapper, setWrapper] = useState<T | null>(null);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      setWrapper(ref.current);
    }
  }, []);
  return [wrapper, ref];
};

type Props = {
  className?: string;
  direction?: 'horizontal' | 'vertical';
  navigation?: boolean;
  scrollbar?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const Slider: React.FC<Props> = ({
  children,
  className,
  direction = 'horizontal',
  navigation = false,
  scrollbar = false,
  ...props
}) => {
  const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
  const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();
  // scrollbar
  return (
    <>
      <div className={cn(styles['swiper-container'], direction === 'vertical' && styles['swiper-container-vertical'])}>
        <Swiper
          autoHeight={true}
          className={cn(scrollbar && styles['swiper-scrollbar-container'], className)}
          direction={direction}
          grabCursor={true}
          modules={[Mousewheel, Navigation, Scrollbar]}
          mousewheel={{ forceToAxis: true }}
          navigation={{ prevEl, nextEl }}
          scrollbar={scrollbar && { el: '.swiper-scrollbar', draggable: true, snapOnRelease: false }}
          slidesPerView='auto'
          spaceBetween={10}
          touchEventsTarget='container'
        >
          {children}
        </Swiper>
        {navigation && (
          <>
            <ButtonBase ref={prevElRef} className={styles['swiper-button-customized-prev']}>
              <ChevronLeftLineIcon />
            </ButtonBase>
            <ButtonBase ref={nextElRef} className={styles['swiper-button-customized-next']}>
              <ChevronRightLineIcon />
            </ButtonBase>
          </>
        )}
        <div className={cn(styles['swiper-scrollbar'], 'swiper-scrollbar')}></div>
      </div>
    </>
  );
};
