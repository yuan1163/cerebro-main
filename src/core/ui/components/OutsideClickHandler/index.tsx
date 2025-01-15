import React from 'react';

type Props = {
  children: React.ReactNode;
  onOutsideClick: () => void;
};

export const OutsideClickHandler: React.FC<Props> = ({ onOutsideClick, children }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick]);

  return (
    <div ref={ref} className='outside-click-container'>
      {children}
    </div>
  );
};
